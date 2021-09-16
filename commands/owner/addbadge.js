const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const { OWNER1, OWNER2, error } = require("../../config");
module.exports = {
  config: {
    name: "addbadge",
    aliases: ["ab"],
    category: "owner",
    description: "Adds badge to a user",
    usage: "[ mention | ID]",
    accessableby: "Owner"
  },
  run: async (bot, message, args) => {
    if (message.author.id === OWNER1 || message.author.id === OWNER2) {
      let user =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]) ||
        message.guild.members.cache.find(
          r =>
            r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()
        ) ||
        message.guild.members.cache.find(
          r =>
            r.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase()
        ) ||
        message.member;

      if (!args[0])
        return message.channel.send(
          `${error} **Please Provide A User To Addbadge!**`
        );
      if (!user) return message.channel.send("**Enter A Valid User!**");
      let emoji = args.slice(1).join(" ");
      if (!emoji[0])
        return message.channel.send(
          `${error} **Please Provide A Emoji To Add!**`
        );
      db.set(`badge_${user.id}`, `${emoji}`);
      let badges = db.fetch(`badge_${user.id}`);
      if (badges === null) badges = 0;
      let addbadgeEmbed = new MessageEmbed()
        .setColor("BLACK")
        .setDescription(`<:yeah:868270172627173456> ALL Badges Added successfully.`)
        .addField("ADDED Badges", `${badges}`);
      message.channel.send(addbadgeEmbed);
    }
  }
};

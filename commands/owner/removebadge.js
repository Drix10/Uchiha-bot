const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const { OWNER1, OWNER2 } = require("../../config");
module.exports = {
  config: {
    name: "removebadge",
    aliases: ["rb"],
    category: "owner",
    description: "Remove badge to a user",
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
          "<a:pg:870080272698322984> **Please Provide A User To Removebadge!**"
        );
      let badges = db.fetch(`badge_${user.id}`);
      if (badges === null) badges = 0;
      db.delete(`badge_${user.id}`);
      let removebadgeEmbed = new MessageEmbed()
        .setColor("BLACK")
        .setDescription(`✅ ALL Badges removed successfully.`)
        .addField("Removed Badges", `${badges}`);
      message.channel.send(removebadgeEmbed);
    }
  }
};

const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const config = require("../../config");

module.exports = {
  config: {
    name: "profile",
    aliases: ["prof", "pf"],
    category: "info",
    description: "Shows User Profile",
    usage: "[mention | username | nickname | ID]",
    accessableby: "everyone"
  },
  run: async (bot, message, args) => {
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        r =>
          r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        r => r.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.member;
    let badges = db.fetch(`badge_${user.id}`);
    if (badges === null) badges = 0;
    let topggvotes = db.fetch(`topggvotes_${user.id}`);
    if (topggvotes === null) topggvotes = 0;
    if (user) {
      let profileEmbed = new MessageEmbed()
        .setColor(config.themecolor)
        .setDescription(`**${user.user.username}'s Profile**`)
        .addField(
          `User Votes${config.dot}`,
          `>>> Votes on Top.gg: [${topggvotes}](${config.VOTE_LINK})`
        )
        .setImage(config.banner)
        .setThumbnail(`${user.user.displayAvatarURL()}`)
        .addField(`User Badges${config.dot}`, `>>> ${badges}`)
        .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
        .setTimestamp();
      message.channel.send(profileEmbed);
    } else {
      return message.channel.send(
        "<a:pg:870080272698322984> **Enter A Valid User!**"
      );
    }
  }
};

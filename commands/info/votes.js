const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const config = require("../../config");

module.exports = {
  config: {
    name: "votes",
    aliases: [""],
    category: "info",
    description: "Shows Users Votes",
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
    let topggvotes = db.fetch(`topggvotes_${user.id}`);
    if (topggvotes === null) topggvotes = 0;
    if (user) {
      let profileEmbed = new MessageEmbed()
        .setColor(config.themecolor)
        .setTitle(`${config.vote} ${user.user.username}'s Votes ${config.vote}`)
        .setDescription(
          `>>> ${config.dot} Total Votes On Top.gg: [${topggvotes}](${config.VOTE_LINK})`
        )
        .setImage(config.banner)
        .setThumbnail(`${user.user.displayAvatarURL()}`)
        .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
        .setTimestamp();
      message.channel.send(profileEmbed);
    } else {
      return message.channel.send(`${config.nope} **Enter A Valid User!**`);
    }
  }
};

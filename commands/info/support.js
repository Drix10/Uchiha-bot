const { MessageEmbed } = require("discord.js");
const config = require("../../config");

module.exports = {
  config: {
    name: "support",
    description: "Link To the Support Server And Support Mail",
    aliases: ["server", "vote", "invite"],
    category: "info",
    usage: " ",
    accessableby: "everyone"
  },
  run: async (bot, message, args) => {
    const embed = new MessageEmbed()
      .setTitle(`${config.info} UCHIHA BOT SUPPORT ${config.info}`)
      .setColor("BLACK")
      .setDescription(
        `**${config.arrow} [Click Here](https://dsc.gg/uchiha-support) To Join Support Server**\n**${config.arrow} [Click Here](${config.INVITE_LINK}) To Invite Me**\n**${config.arrow} [Click Here](${config.VOTE_LINK}) To Vote Me On Top.gg**`
      )
      .setThumbnail(bot.user.displayAvatarURL())
      .setFooter(`${bot.user.username}`, `${bot.user.displayAvatarURL()}`)
      .setTimestamp();

    message.channel.send(embed);
  }
};

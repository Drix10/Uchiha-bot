const ms = require("ms");
const Discord = require("discord.js");
const config = require("../../config.js");

module.exports = {
  config: {
    name: "list",
    description: "get running giveaways list",
    usage: "",
    category: "giveaways",
    accessableby: "Admins",
    aliases: ["glist"] // To add custom aliases just type ["alias1", "alias2"].
  },
  run: async (bot, message, args) => {
    let giveaways = [];
    const giveaways1 = bot.giveawaysManager.giveaways.filter(
      g => g.guildID === message.guild.id
    );
    const giveaways2 = giveaways1.filter(g => !g.ended);
    const giveaways3 = giveaways2.forEach(thisGiveaway => {
      let winners = "";
      if (thisGiveaway.winnerCount == 1) {
        winners = "winner";
      } else {
        winners = "winners";
      }
      giveaways.push(
        `${config.yeah}\`${thisGiveaway.messageID}\` | <#${thisGiveaway.channelID}> | **${thisGiveaway.winnerCount}** ${winners} | Prize: **${thisGiveaway.prize}** | [Giveaway Link](https://discord.com/channels/${message.guild.id}/${thisGiveaway.channelID}/${thisGiveaway.messageID})`
      );
    });
    const embed = new Discord.MessageEmbed()
      .setColor(config.themecolor)
      .setTitle("Current Giveaways")
      .setDescription(
        giveaways.join("\n") || `${config.nope} No giveaways are currently running`
      );
    message.channel.send(embed);
  }
};

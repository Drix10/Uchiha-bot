const ms = require("ms");
const Discord = require("discord.js");
const config = require("../../config");

module.exports = {
  config: {
    name: "runninggiveawalist",
    description: "get running giveaways list from all guilds",
    usage: "",
    category: "owner",
    accessableby: "owner",
    aliases: ["rgl"]
  },
  run: async (bot, message, args) => {
    if (
      message.author.id === config.OWNER1 ||
      message.author.id === config.OWNER2
    ) {
      let giveaways = [];
      const giveaways1 = bot.giveawaysManager.giveaways;
      const giveaways2 = bot.giveawaysManager.giveaways.filter(g => !g.ended);
      const giveaways3 = giveaways2.forEach(thisGiveaway => {
        let winners = "";
        if (thisGiveaway.winnerCount == 1) {
          winners = "winner";
        } else {
          winners = "winners";
        }
        giveaways.push(
          `${config.yeah} \`${thisGiveaway.guildID}\` | \`#${thisGiveaway.channelID}\` | \`${thisGiveaway.messageID}\` | **${thisGiveaway.winnerCount}** ${winners} | Prize: **${thisGiveaway.prize}** | [Giveaway Link](https://discord.com/channels/${thisGiveaway.guildID}/${thisGiveaway.channelID}/${thisGiveaway.messageID})`
        );
      });
      const embed = new Discord.MessageEmbed()
        .setColor(config.themecolor)
        .setTitle("Current Giveaways")
        .setDescription(
          giveaways.join("\n") ||
            `${config.nope} No giveaways are currently running`
        );
      message.channel.send(embed);
    }
  }
};

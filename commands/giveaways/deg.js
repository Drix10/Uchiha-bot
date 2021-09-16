const ms = require("ms");
const Discord = require("discord.js");
const config = require("../../config");

module.exports = {
  config: {
    name: "deleteendedgiveaways",
    description: "delete ended giveaways from all guilds",
    usage: "",
    category: "owner",
    accessableby: "owner",
    aliases: ["deg"]
  },
  run: async (bot, message, args) => {
    if (
      message.author.id === config.OWNER1 ||
      message.author.id === config.OWNER2
    ) {
      let giveaways = [];
      const giveaways1 = bot.giveawaysManager.giveaways;
      const giveaways2 = bot.giveawaysManager.giveaways.filter(g => g.ended);
      const giveaways3 = giveaways2.forEach(thisGiveaway => {
        storage: "./giveaways.json",
          bot.giveawaysManager
            .delete(thisGiveaway.messageID)
            .then(() => {
              message.channel.send(`${config.yeah} Success! Giveaway deleted!`);
            })
            .catch(err => {
              message.channel.send(
                `${config.nope} No giveaway found for ` +
                  thisGiveaway.messageID +
                  ", please check and try again"
              );
            });
      });
    }
  }
};

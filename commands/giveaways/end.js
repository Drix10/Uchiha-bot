const config = require("../../config.js");

module.exports = {
  config: {
    name: "end",
    description: "Ends a giveaway.",
    usage: "",
    category: "giveaways",
    accessableby: "Admins",
    aliases: ["gend"]
  },
  run: async (bot, message, args) => {
    if (
      !message.member.hasPermission("MANAGE_MESSAGES") &&
      !message.member.roles.cache.some(r => r.name === "Giveaways")
    ) {
      return message.channel.send(
        `${config.nope} You need to have the ` +
          `MANAGE_MESSAGES` +
          ` permissions to end giveaways.`
      );
    }

    if (!args[0]) {
      return message.channel.send(
        `${config.nope} Uh oh, I couldn't find that message! Try again!`
      );
    }

    let giveaway =
      bot.giveawaysManager.giveaways.find(g => g.prize === args.join(" ")) ||
      bot.giveawaysManager.giveaways.find(g => g.messageID === args[0]);

    if (!giveaway) {
      return message.channel.send(
        `${config.nope} Hm. I can't seem to find a giveaway for ` +
          args.join(" ") +
          "`."
      );
    }
    bot.giveawaysManager
      .edit(giveaway.messageID, {
        setEndTimestamp: Date.now()
      })
      .then(() => {
        message.channel.send(
          `${config.yeah} Giveaway will end in less than ` +
            bot.giveawaysManager.options.updateCountdownEvery / 1000 +
            " seconds..."
        );
      })
      .catch(e => {
        if (
          e.startsWith(
            `${config.nope} Giveaway with message ID ${giveaway.messageID} has already ended.`
          )
        ) {
          message.channel.send(`${config.nope} This giveaway has already ended!`);
        } else {
          console.error(e);
          message.channel.send("An error occurred...");
        }
      });
  }
};
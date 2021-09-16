const ms = require("ms");
const config = require("../../config.js");
module.exports = {
  config: {
    name: "reroll",
    description: "Rerolls a giveaway.",
    usage: "",
    category: "giveaways",
    accessableby: "Admins",
    aliases: ["rr"] // To add custom aliases just type ["alias1", "alias2"].
  },
  run: async (bot, message, args) => {
    if (
      !message.member.hasPermission("MANAGE_MESSAGES") &&
      !message.member.roles.cache.some(r => r.name === "Giveaways")
    ) {
      return message.channel.send(
        `${config.nope} You need to have the \`MANAGE_MESSAGES\` permission to reroll giveaways.`
      );
    }

    if (!args[0]) {
      return message.channel.send(
        `${config.nope} Uh oh, I couldn\'t find that message! Try again!`
      );
    }

    let giveaway =
      bot.giveawaysManager.giveaways.find(g => g.prize === args.join(" ")) ||
      bot.giveawaysManager.giveaways.find(g => g.messageID === args[0]);

    if (!giveaway) {
      return message.channel.send(
        `${config.nope} Hm. I can't seem to find a giveaway for `` +
          args.join(" ") +
          ``.`
      );
    }

    bot.giveawaysManager
      .reroll(giveaway.messageID)
      .then(() => {
        message.channel.send(`${config.yeah} Giveaway rerolled!`);
      })
      .catch(e => {
        if (
          e.startsWith(
            `${config.nope} Giveaway with message ID ${giveaway.messageID} has not ended.`
          )
        ) {
          message.channel.send(`${config.nope} This giveaway has not ended!`);
        } else {
          console.error(e);
          message.channel.send(`${config.error} An error occurred...`);
        }
      });
  }
};
const ms = require("ms");

const config = require("../../config.js");

module.exports = {
  config: {
    name: "start",
    description: "Starts a giveaway.",
    usage: "",
    category: "giveaways",
    accessableby: "Admins",
    aliases: ["gstart", "g"] // To add custom aliases just type ["alias1", "alias2"].
  },
  run: async (bot, message, args) => {
    if (config.giveawayManagerID) {
      if (
        !message.member.hasPermission("MANAGE_MESSAGES") &&
        !message.member.roles.cache.some(r => r.id === config.giveawayManagerID)
      ) {
        return message.channel.send(
          `${config.nope} You need to have the ` +
            `MANAGE_MESSAGES` +
            ` permissions to start giveaways.`
        );
      }
    } else {
      if (
        !message.member.hasPermission("MANAGE_MESSAGES") &&
        !message.member.roles.cache.some(r => r.name === "Giveaways")
      ) {
        return message.channel.send(
          `${config.nope} You need to have the ` +
            `MANAGE_MESSAGES` +
            ` permissions to start giveaways.`
        );
      }
    }

    let giveawayChannel = message.mentions.channels.first();
    if (!giveawayChannel) {
      return message.channel.send(
        `${config.nope} **Uh oh, I couldn't find that channel! Try again!**\n**Correct Syntax !start #channel 1m 1 Nitro**`
      );
    }

    let giveawayDuration = args[1];
    if (!giveawayDuration || isNaN(ms(giveawayDuration))) {
      return message.channel.send(
        `${config.nope} **Hm. you haven't provided a duration. Can you try again?**`
      );
    }

    let giveawayNumberWinners = args[2];
    if (isNaN(giveawayNumberWinners) || parseInt(giveawayNumberWinners) <= 0) {
      return message.channel.send(
        `${config.nope} **Uh... you haven't provided the amount of winners.**`
      );
    }

    let giveawayPrize = args.slice(3).join(" ");
    if (!giveawayPrize) {
      return message.channel.send(
        `${config.nope} **Oh, it seems like you didn't give me a valid prize!**`
      );
    }
    if (
      !config.showMention &&
      config.giveawayRoleID &&
      config.giveawayMention
    ) {
      giveawayChannel.send(``).then(msg => msg.delete({ timeout: 1000 }));
      bot.giveawaysManager.start(giveawayChannel, {
        time: ms(giveawayDuration),
        prize: giveawayPrize,
        winnerCount: parseInt(giveawayNumberWinners),
        hostedBy: config.hostedBy ? message.author : null,
        messages: {
          giveaway: `${config.gw} **GIVEAWAY** ${config.gw}`,
          giveawayEnded: `${config.gw} **GIVEAWAY ENDED** ${config.gw}`,
          timeRemaining: "Time remaining: **{duration}**!",
          inviteToParticipate: `React with ${config.gw} to participate!`,
          winMessage: `Congratulations, {winners}! You won the ${config.giftbox} **{prize}** ${config.giftbox}`,
          embedFooter: "Giveaways",
          noWinner: "Not enough entrants to determine a winner!",
          hostedBy: "Hosted by: {user}",
          winners: "winner(s)",
          endedAt: "Ended at",
          units: {
            seconds: "seconds",
            minutes: "minutes",
            hours: "hours",
            days: "days",
            pluralS: false
          }
        }
      });
    } else if (
      config.showMention &&
      config.giveawayRoleID &&
      config.giveawayMention
    ) {
      bot.giveawaysManager.start(giveawayChannel, {
        time: ms(giveawayDuration),
        prize: giveawayPrize,
        winnerCount: parseInt(giveawayNumberWinners),
        hostedBy: config.hostedBy ? message.author : null,
        messages: {
          giveaway: `${config.gw} **GIVEAWAY** ${config.gw}`,
          giveawayEnded: `${config.gw} **GIVEAWAY ENDED** ${config.gw}`,
          timeRemaining: "Time remaining: **{duration}**!",
          inviteToParticipate: `React with ${config.gw} to participate!`,
          winMessage: `Congratulations, {winners}! You won the ${config.giftbox} **{prize}** ${config.giftbox}`,
          embedFooter: "Giveaways",
          noWinner: "Not enough entrants to determine a winner!",
          hostedBy: "Hosted by: {user}",
          winners: "winner(s)",
          endedAt: "Ended at",
          units: {
            seconds: "seconds",
            minutes: "minutes",
            hours: "hours",
            days: "days",
            pluralS: false
          }
        }
      });
    } else if (
      !config.showMention &&
      !config.giveawayRoleID &&
      !config.giveawayMention
    ) {
      bot.giveawaysManager.start(giveawayChannel, {
        time: ms(giveawayDuration),
        prize: giveawayPrize,
        winnerCount: parseInt(giveawayNumberWinners),
        hostedBy: config.hostedBy ? message.author : null,
        messages: {
          giveaway: `${config.gw} **GIVEAWAY** ${config.gw}`,
          giveawayEnded: `${config.gw} **GIVEAWAY ENDED** ${config.gw}`,
          timeRemaining: "Time remaining: **{duration}**!",
          inviteToParticipate: `React with ${config.gw} to participate!`,
          winMessage: `Congratulations, {winners}! You won the ${config.giftbox} **{prize}** ${config.giftbox}`,
          embedFooter: "Giveaways",
          noWinner: "Not enough entrants to determine a winner!",
          hostedBy: "Hosted by: {user}",
          winners: "winner(s)",
          endedAt: "Ended at",
          units: {
            seconds: "seconds",
            minutes: "minutes",
            hours: "hours",
            days: "days",
            pluralS: false
          }
        }
      });
    } else if (
      config.showMention &&
      !config.giveawayRoleID &&
      config.giveawayMention
    ) {
      bot.giveawaysManager.start(giveawayChannel, {
        time: ms(giveawayDuration),
        prize: giveawayPrize,
        winnerCount: parseInt(giveawayNumberWinners),
        hostedBy: config.hostedBy ? message.author : null,
        messages: {
          giveaway: `${config.gw} **GIVEAWAY** ${config.gw}`,
          giveawayEnded: `${config.gw} **GIVEAWAY ENDED** ${config.gw}`,
          timeRemaining: "Time remaining: **{duration}**!",
          inviteToParticipate: `React with ${config.gw} to participate!`,
          winMessage: `Congratulations, {winners}! You won the ${config.giftbox} **{prize}** ${config.giftbox}`,
          embedFooter: "Giveaways",
          noWinner: "Not enough entrants to determine a winner!",
          hostedBy: "Hosted by: {user}",
          winners: "winner(s)",
          endedAt: "Ended at",
          units: {
            seconds: "seconds",
            minutes: "minutes",
            hours: "hours",
            days: "days",
            pluralS: false
          }
        }
      });
    } else if (!config.giveawayMention) {
      bot.giveawaysManager.start(giveawayChannel, {
        time: ms(giveawayDuration),
        prize: giveawayPrize,
        winnerCount: parseInt(giveawayNumberWinners),
        hostedBy: config.hostedBy ? message.author : null,
        messages: {
          giveaway: `${config.gw} **GIVEAWAY** ${config.gw}`,
          giveawayEnded: `${config.gw} **GIVEAWAY ENDED** ${config.gw}`,
          timeRemaining: "Time remaining: **{duration}**!",
          inviteToParticipate: `React with ${config.gw} to participate!`,
          winMessage: `Congratulations, {winners}! You won the ${config.giftbox} **{prize}** ${config.giftbox}`,
          embedFooter: "Giveaways",
          noWinner: "Not enough entrants to determine a winner!",
          hostedBy: "Hosted by: {user}",
          winners: "winner(s)",
          endedAt: "Ended at",
          units: {
            seconds: "seconds",
            minutes: "minutes",
            hours: "hours",
            days: "days",
            pluralS: false
          }
        }
      });
    }

    message.channel.send(
      `${config.yeah} Done! The giveaway for the \`${giveawayPrize}\` is starting in ${giveawayChannel}!`
    );
  }
};
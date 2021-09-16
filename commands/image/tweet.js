const Discord = require("discord.js");
const fetch = require("node-fetch");
const config = require("../../config");

module.exports = {
  config: {
    name: "tweet",
    noalias: [""],
    category: "image",
    description: "Sends A Tweet",
    usage: "[username] <text>",
    accessableby: "everyone"
  },
  run: async (bot, message, args) => {
    let user = args[0];
    let text = args.slice(1).join(" ");

    let m = await message.channel.send(
      `${config.stopwatch} **Please wait...**`
    );

    if (!user) {
      return m.edit(
        `${config.error} **You Have To Enter Someone's Twitter Nickname!**`
      );
    }

    if (!text) {
      return m.edit("<a:pg:870080272698322984> **You must enter a message!**");
    }

    try {
      let res = await fetch(
        encodeURI(
          `https://nekobot.xyz/api/imagegen?type=tweet&username=${user}&text=${text}`
        )
      );
      let json = await res.json();
      let attachment = new Discord.MessageAttachment(json.message, "tweet.png");
      await message.channel.send(
        `${config.twitter} **New tweet published by ${user}**`,
        attachment
      );
      m.delete({ timeout: 5000 });
    } catch (e) {
      m.edit(`${config.error} Error, Try Again! Mention Someone`);
    }
  }
};

const axios = require("axios");
const Discord = require("discord.js");
const config = require("../../config");

module.exports = {
  config: {
    name: "userbanner",
    aliases: ["ub", "banner"],
    description: "get user banner",
    usage: "[name | nickname | mention | ID] <reason> (optional)",
    accessableby: "Administrator",
    category: "moderation"
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

    async function getUserBannerUrl(
      userId,
      { dynamicFormat = true, defaultFormat = "webp", size = 512 } = {}
    ) {
      if (![16, 32, 64, 128, 256, 512, 1024, 2048, 4096].includes(size)) {
        throw new Error(`The size '${size}' is not supported!`);
      }
      if (!["webp", "png", "jpg", "jpeg"].includes(defaultFormat)) {
        throw new Error(
          `The format '${defaultFormat}' is not supported as a default format!`
        );
      }
      const user = await bot.api.users(userId).get();
      if (!user.banner) return null;
      const query = `?size=${size}`;
      const baseUrl = `https://cdn.discordapp.com/banners/${userId}/${user.banner}`;
      if (dynamicFormat) {
        const { headers } = await axios.head(baseUrl);
        if (headers && headers.hasOwnProperty("content-type")) {
          return (
            baseUrl +
            (headers["content-type"] == "image/gif"
              ? ".gif"
              : `.${defaultFormat}`) +
            query
          );
        }
      }

      return baseUrl + `.${defaultFormat}` + query;
    }
    const bannerUrl = await getUserBannerUrl(user.id, { size: 4096 });
    if (bannerUrl) {
      const embed = new Discord.MessageEmbed()
        .setDescription(`**${user}'s Banner**`)
        .setColor(`BLACK`)
        .setImage(bannerUrl);
      message.channel.send(embed);
    } else {
      message.channel.send(
        `${config.error} **Either they dont have nitro.... Or they have not set a banner**`
      );
    }
  }
};

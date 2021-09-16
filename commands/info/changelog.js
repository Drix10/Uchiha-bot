const Discord = require("discord.js");
const bot = new Discord.Client();
module.exports = {
  config: {
    name: "changelog",
    aliases: ["clog"],
    category: "info",
    description: "Shows Change logs",
    usage: "",
    accessableby: "everyone"
  },
  run: async (bot, message, args) => {
    const embed = new Discord.MessageEmbed()
      .setAuthor(bot.user.username, bot.user.avatarURL)
      .setColor("BLACK")
      .setTitle("<a:dot:870571248424468490> **Change Logs** <a:dot:870571248424468490>")
      .addField("__Changes 1.1__", "`!soundboard` , `!tts` , `!urbandictory` Added!\n`!daily` , `!weekly` Removed!")
      .addField("__Changes 1.2__", "`All Economy commands` , `!addrole` , `!removerole` Removed\n`!ban` , `!kick` Issue Fixed")
      .addField("__Changes 1.3__", "`!instasearch` , `!news` Removed\nNow XP per level up is 200 more then last level!")
      .addField("__Changes 1.4__", "`!aki` Was Removed\nMany Emojis Added in bot commands!")
      .addField("__Changes 1.5__", "Profile Badge Update!!\nJoin [Support Server](https://dsc.gg/uchiha-support) and [Read](https://discord.com/channels/867728175681110026/869165552923459584/871631451693670421) About The Update!!")
      .addField("__Changes 1.6__", "`!suggest` , `!report` , `!feedback` Added!")
      .addField("__Changes 1.7__", "Bot logo was [Updated](https://media.discordapp.net/attachments/869165552923459584/871930179197493308/IMG_20210803_070244.jpg)\nSome Big Glitches were fixed!!")
      .addField("__Changes 1.8__", "Bot logo was Again [Updated](https://media.discordapp.net/attachments/869165552923459584/872286507866673222/PicsArt_08-03-10.47.43.png)\nBot Went For Maintenance For a Day")
      .addField("__Changes 1.9__", "Giveaway and Userbanner Update!!\nJoin [Support Server](https://dsc.gg/uchiha-support) and [Read](https://discord.com/channels/867728175681110026/869165282105643058/871989049789935649) About The Update!")
      .addField("__Changes 2.0__", "`!phcomment` , `!memory` , `!calc` Removed\n`!votes` , `!lb` Added!")
      .addField("__Changes 2.1__", "`!creatememe` , `!memetemp` Has been Added\n Create Memes from the templates in `!memetemp`")
      .addField("__Changes 2.2__", "`!lb` , `!rolememberinfo` Has been removed Due To Switching off Intents")
    
      .setTimestamp()
      .setFooter(bot.user.username, bot.user.avatarURL);
    message.channel.send({ embed });
  }
};

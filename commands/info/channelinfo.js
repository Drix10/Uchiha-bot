const { MessageEmbed } = require('discord.js');
const config = require("../../config");
module.exports = {
    config: {
        name: "channelinfo",
        aliases: ['ci', 'channeli', 'cinfo'],
        category: "info",
        description: "Shows Channel Info",
        usage: "[ channel mention | channel name | ID] (optional)",
        accessableby: "everyone"
    },
    run: async (bot, message, args) => {
        let channel = message.mentions.channels.first() || bot.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.channel;
        if (!channel) return message.channel.send("<a:pg:870080272698322984> **Channel Not Found!**");

        let channelembed = new MessageEmbed()
            .setTitle(`<:info:869824256274472971> ${channel.name} <:info:869824256274472971>`)
            .setThumbnail(message.guild.iconURL())
            .addField("<a:Ar:868269759626637372> **NSFW**", `${config.dot} ${channel.nsfw}`)
            .addField("<a:Ar:868269759626637372> **Channel ID**", `${config.dot} ${channel.id}`)
            .addField("<a:Ar:868269759626637372> **Channel Type**", `${config.dot} ${channel.type}`)
            .addField("<a:Ar:868269759626637372> **Channel Description**", `${config.dot} ${channel.topic || "No Description"}`)
            .addField("<a:Ar:868269759626637372> **Channel Created At**",  `${config.dot} ${channel.createdAt}`)
            .setColor("BLACK")
        message.channel.send(channelembed);
    }
}
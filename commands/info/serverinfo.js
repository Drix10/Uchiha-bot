const { MessageEmbed } = require("discord.js")
const { greenlight } = require("../../JSON/colours.json")
const config = require("../../config");
module.exports = {
    config: {
        name: "serverinfo",
        description: "Pulls the serverinfo of the guild!",
        usage: " ",
        category: "info",
        accessableby: "everyone",
        aliases: ["sinfo"]
    },
    run: async (bot, message, args) => {
        let owner = [];
        await bot.users.fetch(message.guild.ownerID).then(o => owner.push(o.tag))
        try {
            let embed = new MessageEmbed()
                .setColor("BLACK")
                .setTitle("<:info:869824256274472971> **Server Info** <:info:869824256274472971>")
                .setThumbnail(message.guild.iconURL())
                .setAuthor(`${message.guild.name} Info`, message.guild.iconURL())
                .addField("<a:Ar:868269759626637372> **Guild Name**", `${config.dot} ${message.guild.name}`, true)
                .addField("<a:Ar:868269759626637372> **Guild Owner**", `${config.dot} ${owner}`, true)
                .addField("<a:Ar:868269759626637372> **Guild ID**", `${config.dot} ${message.guild.id}`)
                .addField("<a:Ar:868269759626637372> **Created At**", `${config.dot} ${message.guild.createdAt}`)
                .addField("<a:Ar:868269759626637372> **Text Channels**", `${config.dot} ${message.guild.channels.cache.filter(r => r.type === "text").size} Channels`)
                .addField("<a:Ar:868269759626637372> **Voice Channels**", `${config.dot} ${message.guild.channels.cache.filter(c => c.type === "voice").size} Channels`)
                .addField("<a:Ar:868269759626637372> **Member Count**", `${config.dot} ${message.guild.memberCount}`)              
                .addField("<a:Ar:868269759626637372> **Total Roles**", `${config.dot} ${message.guild.roles.cache.size} Roles`)
                .addField("<a:Ar:868269759626637372> **Server Boosts**", `${config.dot} ${message.guild.premiumSubscriptionCount} Boosts`)
            message.channel.send(embed);
        }
        catch {
            return message.channel.send(`${config.error} **Something Went Wrong!**`)
        }
    }
}

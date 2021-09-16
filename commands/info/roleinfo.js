const { MessageEmbed } = require("discord.js");
const config = require("../../config");
module.exports = {
    config: {
        name: 'roleinfo',
        category: "info",
        aliases: ["rinfo", "ri"],
        description: "shows stats of the mentioned role",
        usage: "[role name | role mention | ID]",
        accessableby: 'everyone'
    },
    run: async (bot, message, args) => {
        if (!args[0]) return message.channel.send("<a:pg:870080272698322984> **Please Enter A Role!**")
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase());
        if (!role) return message.channel.send("<a:pg:870080272698322984> **Please Enter A Valid Role!**");

        const status = {
            false: "No",
            true: "Yes"
        }

        let roleembed = new MessageEmbed()
            .setColor(role.hexColor)
            .setTitle("<:info:869824256274472971> **Role Info** <:info:869824256274472971>")
            .setThumbnail(message.guild.iconURL())
            .addField("<a:Ar:868269759626637372> **ID**",`${config.dot} ${role.id}`, true)
            .addField("<a:Ar:868269759626637372> **Name**",`${config.dot} ${role.name}`, true)
            .addField("<a:Ar:868269759626637372> **Hex**",`${config.dot} ${role.hexColor}`)
            .addField("<a:Ar:868269759626637372> **Position**",`${config.dot} ${role.position}`)
            .addField("<a:Ar:868269759626637372> **Mentionable**",`${config.dot} ${status[role.mentionable]}`)
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
            .setTimestamp()

        message.channel.send(roleembed);
    }
}
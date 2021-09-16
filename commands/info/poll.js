const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "poll",
        description: "polling",
        category: "info",
        usage: "[question]",
        noalias: "No Aliases",
        accessableby: "Administrator",
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send("<a:pg:870080272698322984> **You Do Not Have Sufficient Permissions! - [MANAGE_GUILD]**");

        if (!args[0])
            return message.channel.send("<a:pg:870080272698322984> **Please Enter A Query!**");

        const embed = new MessageEmbed()
            .setColor("BLACK")
            .setTitle(`<a:gpoll:870545488095633459> **Poll For ${message.guild.name} Sever** <a:gpoll:870545488095633459>`)
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
            .setDescription(args.join(' '))
        var msg = await message.channel.send(embed);

        await msg.react('<:yeah:868270172627173456>');
        await msg.react('<:nope:868270205225295932>');

        message.delete({ timeout: 1000 });
    }
}

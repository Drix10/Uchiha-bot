const { MessageEmbed } = require("discord.js");
const { formatDate } = require("../../functions.js");

module.exports = {
    config: {
        name: "whois",
        category: "info",
        aliases: ["who", "user", "userinfo"],
        description: "Returns user information",
        usage: "[name | nickname | mention | ID] (optional)",
        accessableby: "everyone"
    },
    run: async (bot, message, args) => {
        let member = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;
      
        if(!member)
        return message.channel.send("<a:pg:870080272698322984> **Enter A Valid User!**");
      
        const joined = formatDate(member.joinedAt);
        const roles = member.roles.cache
            .filter(r => r.id !== message.guild.id)
            .map(r => r.name).join(", ") || 'none';
        const created = formatDate(member.user.createdAt);

        const embed = new MessageEmbed()
            .setTitle("<:info:869824256274472971> **User Info** <:info:869824256274472971>")
            .setFooter(message.guild.name, message.guild.iconURL())
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true}))
            .setColor("BLACK")
            .addField("<a:Ar:868269759626637372> **User information**", `<a:dot:870571248424468490> ${member.displayName}`)
            .addField("<a:Ar:868269759626637372> **User ID**", `<a:dot:870571248424468490> ${member.user.id}`)
            .addField("<a:Ar:868269759626637372> **Username**",`<a:dot:870571248424468490> ${member.user.username}`)
            .addField("<a:Ar:868269759626637372> **User Tag**", `<a:dot:870571248424468490> ${member.user.tag}`)
            .addField("<a:Ar:868269759626637372> **Created at**", `<a:dot:870571248424468490> ${created}`)
            .addField("<a:Ar:868269759626637372> **Joined at**", `<a:dot:870571248424468490> ${joined}`)
            .addField("<a:Ar:868269759626637372> **User Roles**", `<a:dot:870571248424468490> ${roles}`, true)
            .setTimestamp()

            member.presence.activities.forEach((activity) => {
        if (activity.type === 'PLAYING') 
        {embed.addField('<a:Ar:868269759626637372> Currently playing',`\n**${activity.name}**`)
        if (activity.type === `CUSTOM_STATUS`)
        {embed.addField(`<a:Ar:868269759626637372> **Custom Status**`,`\n**${activity.emoji || "No Emoji"} | ${activity.state}`)
        }
  }
  })
  message.channel.send(embed);
  }
  }
  
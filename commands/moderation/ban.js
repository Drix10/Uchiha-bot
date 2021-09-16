const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  config: {
    name: "ban",
    aliases: ["b", "banish"],
    category: "moderation",
    description: "Bans the user",
    usage: "[name | nickname | mention | ID] <reason> (optional)",
    accessableby: "Moderators , Administrators"
  },
  run: async (bot, message, args) => {
    try {
      if (!message.member.hasPermission("BAN_MEMBERS"))
        return message.channel.send(
          "<a:pg:870080272698322984> **You Dont Have The Permissions To Ban Users! - [BAN_MEMBERS]**"
        );
      if (!message.guild.me.hasPermission("BAN_MEMBERS"))
        return message.channel.send(
          "<a:pg:870080272698322984> **I Dont Have The Permissions To Ban Users! - [BAN_MEMBERS]**"
        );

      if (!args[0])
        return message.channel.send("<a:pg:870080272698322984> **Please Provide A User To Ban!**");

      let banMember =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]) ||
        message.guild.members.cache.find(
          r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()
        ) ||
        message.guild.members.cache.find(
          ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()
        );
      if (!banMember)
        return message.channel.send("<a:pg:870080272698322984> **User Is Not In The Guild**");
      if (banMember === message.member)
        return message.channel.send("<a:pg:870080272698322984> **You Can not Ban Yourself**");
      if (
        banMember.hasPermission([
          "KICK_MEMBERS",
          "BAN_MEMBERS",
          "ADMINISTRATOR"
        ])
      )
        return message.channel.send("<a:pg:870080272698322984> **You can Not Ban this member**");

      var reason = args.slice(1).join(" ");

      if (!banMember.bannable)
        return message.channel.send("<a:pg:870080272698322984> **Cant ban That User**");
      try {
        banMember
          .send(
            `**Hello, You Have Been Banned From ${
              message.guild.name
            } for - ${reason || "No Reason"}**`
          )
          .then(() =>
            message.guild.members.ban(banMember, { days: 7, reason: reason })
          )
          .catch(() => null);
      } catch {
        message.guild.members.ban(banMember, { days: 7, reason: reason });
      }
      if (reason) {
        var sembed = new MessageEmbed()
          .setColor("BLACK")
          .setAuthor(message.guild.name, message.guild.iconURL())
          .setDescription(
            `<:bn:870083435518128158> **${banMember.user.username}** has been banned for ${reason}`
          );
        message.channel.send(sembed);
      } else {
        var sembed2 = new MessageEmbed()
          .setColor("BLACK")
          .setAuthor(message.guild.name, message.guild.iconURL())
          .setDescription(`<:bn:870083435518128158> **${banMember.user.username}** has been banned`);
        message.channel.send(sembed2).then(() =>
            message.guild.members.ban(banMember, { days: 7, reason: reason })
          )
 {
        message.guild.members.ban(banMember, { days: 7, reason: reason });
      };
      }
      let channel = db.fetch(`modlog_${message.guild.id}`);
      if (channel == null) return;

      if (!channel) return;

      const embed = new MessageEmbed()
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
        .setColor("#ff0000")
        .setThumbnail(banMember.user.displayAvatarURL({ dynamic: true }))
        .setFooter(message.guild.name, message.guild.iconURL())
        .addField("**Moderation**", "ban")
        .addField("**Banned**", banMember.user.username)
        .addField("**ID**", `${banMember.id}`)
        .addField("**Banned By**", message.author.username)
        .addField("**Reason**", `${reason || "**No Reason**"}`)
        .addField("**Date**", message.createdAt.toLocaleString())
        .setTimestamp();

      var sChannel = message.guild.channels.cache.get(channel);
      if (!sChannel) return;
      sChannel.send(embed);
    } catch (e) {
      return message.channel.send(`**${e.message}**`);
    }
  }
};

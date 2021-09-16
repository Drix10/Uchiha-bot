const { MessageEmbed } = require("discord.js");
const { redlight } = require("../../JSON/colours.json");
const db = require("quick.db");

module.exports = {
  config: {
    name: "mute",
    description: "Mutes a member in the discord!",
    usage: "[name | nickname | mention | ID] <reason> (optional)",
    category: "moderation",
    accessableby: "everyone",
    noalias: "No Aliases"
  },
  run: async (bot, message, args) => {
    try {
      if (!message.member.hasPermission("MANAGE_GUILD"))
        return message.channel.send(
          "<a:pg:870080272698322984> **You Dont Have Permmissions To Mute Someone! - [MANAGE_GUILD]**"
        );

      if (!message.guild.me.hasPermission("MANAGE_GUILD"))
        return message.channel.send(
          "<a:pg:870080272698322984> **I Don't Have Permissions To Mute Someone! - [MANAGE_GUILD]**"
        );
      if (!args[0])
        return message.channel.send("<a:pg:870080272698322984> **Please Enter A User To Be Muted!**");

      var mutee =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]) ||
        message.guild.members.cache.find(
          r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()
        ) ||
        message.guild.members.cache.find(
          ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()
        );
      if (!mutee)
        return message.channel.send(
          "<a:pg:870080272698322984> **Please Enter A Valid User To Be Muted!**"
        );

      if (mutee === message.member)
        return message.channel.send("<a:pg:870080272698322984> **You Cannot Mute Yourself!**");
      if (
        mutee.roles.highest.comparePositionTo(message.guild.me.roles.highest) >=
        0
      )
        return message.channel.send("<a:pg:870080272698322984> **Can not Mute This User!**");
      if (mutee.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS", "ADMINISTRATOR", "MANAGE_GUILD"]))
        return message.channel.send("<a:pg:870080272698322984> **You can not mute this member**");

      let reason = args.slice(1).join(" ");
      if (mutee.user.bot) return message.channel.send("<a:pg:870080272698322984> **Can not Mute Bots!**");
      const userRoles = mutee.roles.cache
        .filter(r => r.id !== message.guild.id)
        .map(r => r.id);

      let muterole;
      let dbmute = await db.fetch(`muterole_${message.guild.id}`);
      let muteerole = message.guild.roles.cache.find(r => r.name === "muted");

      if (!message.guild.roles.cache.has(dbmute)) {
        muterole = muteerole;
      } else {
        muterole = message.guild.roles.cache.get(dbmute);
      }

      if (!muterole) {
        try {
          muterole = await message.guild.roles.create({
            data: {
              name: "muted",
              color: "#514f48",
              permissions: []
            }
          });
          message.guild.channels.cache.forEach(async channel => {
            await channel.createOverwrite(muterole, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false,
              SPEAK: false,
              CONNECT: false
            });
          });
        } catch (e) {
          console.log(e);
        }
      }

      if (mutee.roles.cache.has(muterole.id))
        return message.channel.send(
          "<a:pg:870080272698322984> **User Is Already Muted!**"
        );

      db.set(`muteeid_${message.guild.id}_${mutee.id}`, userRoles);
      try {
        mutee.roles.set([muterole.id]).then(() => {
          mutee
            .send(
              `**Hello, You Have Been Muted In ${
                message.guild.name
              } for - ${reason || "No Reason"}`
            )
            .catch(() => null);
        });
      } catch {
        mutee.roles.set([muterole.id]);
      }
      if (reason) {
        const sembed = new MessageEmbed()
          .setColor("BLACK")
          .setAuthor(message.guild.name, message.guild.iconURL())
          .setDescription(
            `<a:pg:870080272698322984> ${mutee.user.username} was successfully muted for ${reason}`
          );
        message.channel.send(sembed);
      } else {
        const sembed2 = new MessageEmbed()
          .setColor("BLACK")
          .setAuthor(message.guild.name, message.guild.iconURL())
          .setDescription(
            `<a:pg:870080272698322984> ${mutee.user.username} was successfully muted`
          );
        message.channel.send(sembed2);
      }

      let channel = db.fetch(`modlog_${message.guild.id}`);
      if (!channel) return;

      let embed = new MessageEmbed()
        .setColor(redlight)
        .setThumbnail(mutee.user.displayAvatarURL({ dynamic: true }))
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
        .addField("**Moderation**", "mute")
        .addField("**Mutee**", mutee.user.username)
        .addField("**Moderator**", message.author.username)
        .addField("**Reason**", `${reason || "**No Reason**"}`)
        .addField("**Date**", message.createdAt.toLocaleString())
        .setFooter(
          message.member.displayName,
          message.author.displayAvatarURL()
        )
        .setTimestamp();

      var sChannel = message.guild.channels.cache.get(channel);
      if (!sChannel) return;
      sChannel.send(embed);
    } catch {
      return;
    }
  }
};

const db = require("quick.db");

module.exports = {
  config: {
    name: "setmuterole",
    category: "moderation",
    aliases: ["setmute", "smrole", "smr"],
    description: "Sets A Mute Role For Muted Users!",
    usage: "[role name | role mention | role ID]",
    accessableby: "Administrators"
  },
  run: async (bot, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        "<a:pg:870080272698322984> **You Do Not Have The Required Permissions! - [ADMINISTRATOR]**"
      );
    if (!args[0]) {
      let b = await db.fetch(`muterole_${message.guild.id}`);
      let roleName = message.guild.roles.cache.get(b);
      if (message.guild.roles.cache.has(b)) {
        return message.channel.send(
          `<:yeah:868270172627173456> **Muterole Set In This Server Is \`${roleName.name}\`!**`
        );
      } else
        return message.channel.send(
          "<a:pg:870080272698322984> **Please Enter A Role Name or ID To Set!**"
        );
    }

    let role =
      message.mentions.roles.first() ||
      bot.guilds.cache.get(message.guild.id).roles.cache.get(args[0]) ||
      message.guild.roles.cache.find(
        c => c.name.toLowerCase() === args.join(" ").toLocaleLowerCase()
      );

    if (!role)
      return message.channel.send("<a:pg:870080272698322984> **Please Enter A Valid Role Name or ID!**");

    try {
      let a = await db.fetch(`muterole_${message.guild.id}`);

      if (role.id === a) {
        return message.channel.send(
          "<a:pg:870080272698322984> **This Role is Already Set As Muterole!**"
        );
      } else {
        db.set(`muterole_${message.guild.id}`, role.id);

        message.channel.send(
          `<:yeah:868270172627173456> **\`${role.name}\` Has Been Set Successfully As Muterole!**`
        );
      }
    } catch (e) {
      return message.channel.send(
        "<a:pg:870080272698322984> **Error - `Missing Permissions or Role Doesn't Exist!`**",
        `\n${e.message}`
      );
    }
  }
};

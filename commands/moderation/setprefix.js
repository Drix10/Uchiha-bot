const db = require("quick.db");

module.exports = {
  config: {
    name: "setprefix",
    aliases: ["sp", "prefix"],
    category: "moderation",
    description: "Sets Custom Prefix",
    usage: "[prefix]",
    accessableby: "Administrators"
  },
  run: async (bot, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        "<a:pg:870080272698322984> **You Do Not Have Sufficient Permissions! - [ADMINISTRATOR]**"
      );
    if (!args[0]) {
      let b = await db.fetch(`prefix_${message.guild.id}`);
      if (b) {
        return message.channel.send(
          `<a:Ar:868269759626637372> **Prefix Of This Server is \`${b}\`**`
        );
      } else
        return message.channel.send(
          "<a:pg:870080272698322984> **Please Enter A Prefix To Set!**"
        );
    }
    try {
      let a = args.join(" ");
      let b = await db.fetch(`prefix_${message.guild.id}`);
      if (a.length > 5)
        return message.reply({
          content: "The prefix cannot be longer than 5 characters!"
        });
      if (a === b) {
        return message.channel.send(
          "<a:pg:870080272698322984> **This is Already The Server Prefix!**"
        );
      } else {
        db.set(`prefix_${message.guild.id}`, a);
        return message.channel.send(
          `<:yeah:868270172627173456> **Successfuly Set Server Prefix To \`${a}\`**`
        );
      }
    } catch (e) {
      console.log(e);
    }
  }
};

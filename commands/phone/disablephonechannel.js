const db = require("quick.db");

module.exports = {
  config: {
    name: "disablephonechannel",
    aliases: ["dpc", "disablep"],
    category: "phone",
    description: "Disables Server Phone Call Channel",
    usage: "",
    accessableby: "Administrators"
  },
  run: async (bot, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        "<:nope:868270205225295932> **You Do Not Have The Required Permissions! - [ADMINISTRATOR]**"
      );

    try {
      let a = db.fetch(`pc_${message.guild.id}`);

      if (!a) {
        return message.channel.send(
          "<:nope:868270205225295932> **There Is No Phone Call Channel Set To Disable!**"
        );
      } else {
        let channel = message.guild.channels.cache.get(a);
        bot.guilds.cache
          .get(message.guild.id)
          .channels.cache.get(channel.id)
          .send("**Phone Call Channel Disabled!**");
        db.delete(`pc_${message.guild.id}`);
        db.subtract("pclist", 0);
        message.channel.send(
          `<:yeah:868270172627173456> **Phonecall Channel Has Been Successfully Disabled in \`${channel.name}\`**`
        );
      }
      return;
    } catch {
      return message.channel.send(
        "<a:pg:870080272698322984> **Error - `Missing Permissions or Channel Doesn't Exist`**"
      );
    }
  }
};

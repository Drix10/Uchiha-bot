const { MessageEmbed } = require("discord.js");
const config = require("../../config");

module.exports = {
  config: {
    name: "say",
    category: "fun",
    noalias: [""],
    description: "Says your input via the bot",
    usage: "[text]",
    accessableby: "everyone"
  },
  run: async (bot, message, args) => {
    try {
      const sayMessage = args.join(" ");
      if (args.length === 0)
        return message.channel.send(`${config.error} **Enter Some Text!**`);
      message.delete({ timeout: 1 });
      const embed = new MessageEmbed()
        .setColor(config.themecolor)
        .setDescription(`${sayMessage}`);
      message.channel.send(embed);
    } catch (e) {
      throw e;
    }
  }
};

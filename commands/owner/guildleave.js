const { MessageEmbed } = require("discord.js");
const config = require("../../config");
module.exports = {
  config: {
    name: "guildleave",
    aliases: ["gleave"],
    category: "owner",
    description: "guildleave",
    usage: "",
    accessableby: "Owner"
  },
  run: async (bot, message, args) => {
    if (
      message.author.id === config.OWNER1 ||
      message.author.id === config.OWNER2
    ) {
      let id = args.join(" ");
      if (!id) return message.reply({ content: "Please provide a guild ID!" });
      const guild = await bot.guilds.cache.get(id);
      if (!guild) return message.reply({ content: "Invalid guild ID!" });
      guild.leave();
      return message.channel.send({
        content: `Successfully left guild **${guild.name}**!`
      });
    }
  }
};

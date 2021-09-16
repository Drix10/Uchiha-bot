const { OWNER1, OWNER2 } = require("../../config");
module.exports = {
  config: {
    name: "restartbot",
    aliases: ["rstart", "rbot"],
    category: "owner",
    description: "restart bot",
    usage: "",
    accessableby: "Owner"
  },
  run: async (bot, message, args) => {
    if (message.author.id === OWNER1 || message.author.id === OWNER2) {
      const Discord = require("discord.js");
      const embed = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setTitle("Restarting...")
        .setDescription("This will take a few seconds");
      console.log(`${bot.user.username} is restarting...`);
      message.channel.send(embed).then(sentMessage => process.exit(0));
    }
  }
};

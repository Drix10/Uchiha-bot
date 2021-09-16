const { MessageEmbed } = require("discord.js");
module.exports = {
  config: {
    name: "ping",
    description: "Displays User And Bot Latency",
    usage: " ",
    noalias: "No Aliases",
    category: "info",
    accessableby: "everyone"
  },
  run: async (bot, message, args) => {
    let embed = new MessageEmbed().setTitle("Ping?").setColor("BLACK");
    message.channel.send(embed).then(m => {
      embed
        .setTitle("Ping!")
        .setDescription(
          `<a:Ar:868269759626637372> **Message Edit Speed  ${Date.now() -
            message.createdTimestamp}ms. Message Sending Speed <a:Ar:868269759626637372> ${Math.round(
            bot.ws.ping
          )}ms**.`
        );
      m.edit(embed);
    });
  }
};

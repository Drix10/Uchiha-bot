const Discord = require("discord.js");
const { OWNER1, OWNER2 } = require("../../config");

module.exports = {
  config: {
    name: "editembed",
    category: "owner",
    aliases: ["em", "eembed"],
    description: "Edit an embed",
    usage: `<messageID> [embedTitle]|[embedMessage]|[embedColor]|[embedThumbnail]|[embedImage]\n*leaving a field blank will result in that field remaining unmodified.*`,
    accessableby: "Owner"
  },
  async run(bot, message, args) {
    if (message.author.id === OWNER1 || message.author.id === OWNER2) {
      if (!args[0] || !(args[1] || args[2] || args[3] || args[4] || args[5])) {
        const invalid = new Discord.MessageEmbed()
          .setAuthor(
            "Announce",
            bot.user.displayAvatarURL({
              format: "png",
              dynamic: true,
              size: 2048
            })
          )
          .setColor("#eb0936")
          .setTitle("Invalid Arguments")
          .setDescription(
            "**USAGE**\n`announce <messageID> [embedTitle]|[embedMessage]|[embedColor]|[embedThumbnail]|[embedImage]`\n*leaving a field blank will result in that field remaining unmodified.*"
          );

        return message.reply(invalid);
      }

      message.delete();

      const msg = await message.channel.messages.fetch(args[0]);
      if (!msg)
        return message.reply("the specified message could not be found.");
      if (!msg.embeds[0])
        return message.reply(
          "the specified message does not contain an embed."
        );

      const oldFields = msg.embeds[0];
      const fields = args
        .slice(1)
        .join(" ")
        .split("|")
        .map(arg => arg.trim());

      let embed = new Discord.MessageEmbed();

      if (fields[0] || oldFields.title)
        embed.setTitle(fields[0] || oldFields.title);
      if (fields[1] || oldFields.description)
        embed.setDescription(fields[1] || oldFields.description);
      if (fields[2] || oldFields.color)
        embed.setColor(fields[2] || oldFields.color);
      if (fields[3] || (oldFields.thumbnail && oldFields.thumbnail.url))
        embed.setThumbnail(fields[3] || oldFields.thumbnail.url);
      if (fields[4] || (oldFields.image && oldFields.image.url))
        embed.setImage(fields[4] || oldFields.image.url);

      msg.edit(embed);
    }
  }
};

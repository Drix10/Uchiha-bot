const Discord = require("discord.js");
const { FeedbackChannel, PREFIX } = require("../../config");

module.exports = {
  config: {
    name: "feedback",
    aliases: ["fback"],
    category: "misc",
    description: "To give us a feedback",
    usage: `[Your feedback]`,
    accessableby: "everyone"
  },
  run: async (client, message, args) => {
    const Channel = message.client.channels.cache.get(FeedbackChannel);
    if (!args[0])
      return message.reply(
        `<a:pg:870080272698322984> **Please provide a feedback to send so that we can look through!!** **\`${PREFIX}feedback [Your feedback]\`**`
      );
    let feedback = message.content.slice(
      message.content.indexOf(args[0]),
      message.content.length
    );
    const Embed = new Discord.MessageEmbed()
      .setTitle("__Feedback__")
      .setThumbnail(
        message.author.displayAvatarURL({ dynamic: true, size: 1024 })
      )
      .setDescription(feedback)
      .addField(
        "User",
        `\`${message.member.user.tag}\` | \`${message.member.id}\``
      )
      .addField("Server", `\`${message.guild.name}\` | \`${message.guild.id}\``)
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);

    Channel.send(Embed);

    await message.channel.send(
      `<:GT:880599028516147220> **Your feedback has been sent to my developers!!**`
    );
  }
};

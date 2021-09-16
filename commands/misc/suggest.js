const Discord = require("discord.js");
const { SuggestChannel, PREFIX } = require("../../config");

module.exports = {
  config: {
    name: "suggest",
    aliases: ["suggestion"],
    description: "To give us a suggestion !!",
    category: "misc",
    example: "!suggest Add more commands",
    usage: `[Your Suggestion]`,
    accessableby: "everyone"
  },
  run: async (client, message, args) => {
    const Channel = client.channels.cache.get(SuggestChannel);

    if (!args[0])
      return message.reply(
        `<a:pg:870080272698322984> **Please provide you suggestion so that we can look through!!** **\`${PREFIX}suggest [Your Suggestion]\`**`
      );

    let suggestion = message.content.slice(
      message.content.indexOf(args[0]),
      message.content.length
    );

    const embed = new Discord.MessageEmbed()
      .setTitle("__Suggestion__")
      .setThumbnail(
        message.author.displayAvatarURL({ dynamic: true, size: 1024 })
      )
      .setDescription(suggestion)
      .addField(
        "User",
        `\`${message.member.user.tag}\` | \`${message.member.id}\``
      )
      .addField("Server", `\`${message.guild.name}\` | \`${message.guild.id}\``)
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);

    Channel.send(embed);

    await message.channel.send(
      `<:GT:880599028516147220> **Your suggestion has been sent to my developer!!**`
    );
  }
};

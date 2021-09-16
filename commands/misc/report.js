const Discord = require("discord.js");
const { ReportChannel, PREFIX } = require("../../config");
module.exports = {
  config: {
    name: "report",
    category: "misc",
    aliases: ["report"],
    description: "To report us any bugs or anything !!",
    usage: `[Your report]`,
    accessableby: "everyone"
  },
  run: async (client, message, args) => {
    const Channel = client.channels.cache.get(ReportChannel);

    if (!args[0])
      return message.reply(
        `<a:pg:870080272698322984> **Please provide a report so that we can look through!!** **\`${PREFIX}report [Your report]\`**`
      );

    let report = message.content.slice(
      message.content.indexOf(args[0]),
      message.content.length
    );

    const embed = new Discord.MessageEmbed()
      .setTitle("__Report__")
      .setThumbnail(
        message.author.displayAvatarURL({ dynamic: true, size: 1024 })
      )
      .setDescription(report)
      .addField(
        "User",
        `\`${message.member.user.tag}\` | \`${message.member.id}\``
      )
      .addField("Server", `\`${message.guild.name}\` | \`${message.guild.id}\``)
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);

    Channel.send(embed);

    await message.channel.send(
      `<:GT:880599028516147220> **Your report has been sent to my developers!!**`
    );
  }
};

const { MessageEmbed } = require("discord.js");
const { promptMessage } = require("../../functions");
const chooseArr = ["🗻", "📰", "✂"];
const config = require("../../config");

module.exports = {
  config: {
    name: "rps",
    category: "games",
    aliases: ["rockpaperscissors"],
    description:
      "Rock Paper Scissors Game. React to one of the emojis to play the game.",
    usage: " ",
    accessableby: "everyone"
  },
  run: async (bot, message, args) => {
    try {
      const embed = new MessageEmbed()
        .setColor(config.themecolor)
        .setAuthor(
          message.member.displayName,
          message.author.displayAvatarURL()
        )
        .setFooter(message.guild.me.displayName, bot.user.displayAvatarURL())
        .setDescription(
          `${config.info} **Play A Game of RPS Against The Bot! ${config.info}\nSelect Reactions To Play!**`
        )
        .setTimestamp();

      const m = await message.channel.send(embed);
      const reacted = await promptMessage(m, message.author, 30, chooseArr);

      const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];

      const result = await getResult(reacted, botChoice);
      await m.reactions.removeAll();

      embed
        .setDescription("")
        .addField(`**${result}**`, `${reacted} vs ${botChoice}`);

      m.edit(embed);
    } catch {
      return message.channel.send(
        `${config.error} **Missing Permissions - [MANAGE_MESSAGES]!**`
      );
    }
    function getResult(me, botChosen) {
      if (
        (me === "🗻" && botChosen === "✂") ||
        (me === "📰" && botChosen === "🗻") ||
        (me === "✂" && botChosen === "📰")
      ) {
        return `${config.gw} You won!`;
      } else if (me === botChosen) {
        return `${config.dot} Its a tie!`;
      } else {
        return `${config.error} You lost!`;
      }
    }
  }
};

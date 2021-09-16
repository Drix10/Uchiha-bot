const { MessageEmbed } = require("discord.js");
const { OWNER1, OWNER2, vdevanimated } = require("../../config");
module.exports = {
  config: {
    name: "dev",
    aliases: ["dev"],
    category: "",
    description: "dev",
    usage: "",
    accessableby: "Owner"
  },
  run: async (bot, message, args) => {
    /*const dev1 = await bot.users.fetch(OWNER1);
    const dev2 = await bot.users.fetch(OWNER2);
    const dm = new MessageEmbed()
      .setColor("BLACK")
      .setFooter(`Bot created by ${dev2.tag}.`, dev1.displayAvatarURL)
      .setDescription(
        `${vdevanimated} **${dev1.tag}** (${OWNER1})\n${vdevanimated} **${dev2.tag}** (${OWNER2})`
      );
    await message.channel.send(`<@${OWNER1}>, <@${OWNER2}>`, dm);*/
    if (message.author.id === OWNER1 || message.author.id === OWNER2) {
      let guild = null;
      if (!args[0]) return message.channel.send("Enter An Name");
      if (args[0]) {
        let fetched = bot.guilds.cache.find(g => g.name === args.join(" "));
        let found = bot.guilds.cache.get(args[0]);
        if (!found) {
          if (fetched) {
            guild = fetched;
          }
        } else {
          guild = found;
        }
      } else {
        return message.channel.send("Invalid Name!");
      }
      if (guild) {
        let tChannel = guild.channels.cache.find(
          ch =>
            ch.type == "text" &&
            ch.permissionsFor(ch.guild.me).has("CREATE_INSTANT_INVITE")
        );
        if (!tChannel) {
          return message.channel.send("An Error Has Occured Try Again!");
        }
        let invite = await tChannel
          .createInvite({ temporary: false, maxAge: 0 })
          .catch(err => {
            return message.channel.send(`${err} has occured!`);
          });
        message.channel.send(invite.url);
      } else {
        return message.channel.send(
          `\`${args.join(" ")}\` - Bot is Not in this server`
        );
      }
    } else {
      return;
    }
  }
};
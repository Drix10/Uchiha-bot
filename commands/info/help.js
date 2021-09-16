const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const db = require("quick.db");
const { stripIndents } = require("common-tags");
const { cyan } = require("../../JSON/colours.json");
const { PREFIX, setting, banner } = require("../../config");
const { MessageButton } = require("discord-buttons");
const { MessageActionRow} = require("discord-buttons")
module.exports = {
  config: {
    name: "help",
    aliases: ["h"],
    usage: "[command name] (optional)",
    category: "info",
    description: "Displays all commands that the bot has.",
    accessableby: "everyone"
  },
  run: async (bot, message, args) => {
    let prefix;
    let fetched = await db.fetch(`prefix_${message.guild.id}`);

    if (fetched === null) {
      prefix = PREFIX;
    } else {
      prefix = fetched;
    }

  
    const embed = new MessageEmbed()
      .setColor("BLACK")
      .setAuthor(
        `${message.guild.me.displayName} Help`,
        message.guild.iconURL()
      )
      .setThumbnail(bot.user.displayAvatarURL());

    if (!args[0]) {
      /*const sembed = new MessageEmbed()
        .setAuthor(`${message.guild.me.displayName}`, message.guild.iconURL())
        .setColor("BLACK")
        .setDescription("**Message Has Been Sent to You In DMs!**");
      message.channel.send(sembed).then(msg => {
        msg.delete({ timeout: 10000 });
      });*/

      const categories = readdirSync("./commands/");

      embed.setDescription(
        `<a:Ar:868269759626637372> **Available Commands For ${message.guild.me.displayName}\n\n<a:gear:870955763672154152> Bot's Global Prefix Is \`${PREFIX}\`\n<a:gear:870955763672154152> Server Prefix Is \`${prefix}\`\n<a:gear:870955763672154152> For Help Related Commands Type -: \n\<a:gear:870955763672154152>\`${prefix}help [command name | alias]\`**\n<a:gear:870955763672154152> **Join [Support Server](https://dsc.gg/uchiha-support) For Profile Badges!**`
      );
      embed.setImage(banner);
      embed.setFooter(
        `${message.guild.me.displayName} | Total Commands - ${bot.commands
          .size - 1} | THE・ሁ・DEVELOPMENT`,
        bot.user.displayAvatarURL()
      );

      categories.forEach(category => {
        const dir = bot.commands.filter(c => c.config.category === category);
        const capitalise =
          category.slice(0, 1).toUpperCase() + category.slice(1);
        try {
          embed.addField(
            `${setting} ${capitalise} [${dir.size}] - `,
            dir.map(c => `\`${c.config.name}\``).join(" ")
          );
        } catch (e) {
          console.log();
        }
      });
      return message.channel.send(embed);
    } else {
            let command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
            if (!command) return message.channel.send(embed.setTitle("**Invalid Command!**").setDescription(`**Do \`${prefix}help\` For the List Of the Commands!**`))
  
      
          
      command = command.config;

      embed.setDescription(stripIndents`<a:Ar:868269759626637372> **The Bot's Global Prefix Is \`${PREFIX}\`**\n
            <a:Ar:868269759626637372> **Server Prefix Is \`${prefix}\`**\n
            <a:Ar:868269759626637372> ** Command -** ${command.name
              .slice(0, 1)
              .toUpperCase() + command.name.slice(1)}\n
            <a:Ar:868269759626637372> ** Description -** ${command.description ||
              "No Description provided."}\n
            <a:Ar:868269759626637372> **Category -** ${command.category}\n
            <a:Ar:868269759626637372> ** Usage -** ${
              command.usage
                ? `\`${prefix}${command.name} ${command.usage}\``
                : "No Usage"
            }\n
            <a:Ar:868269759626637372> ** Accessible by -** ${command.accessableby ||
              "everyone"}\n
            <a:Ar:868269759626637372> ** Aliases -** ${
              command.aliases ? command.aliases.join(", ") : "None."
            }`);
      embed.setFooter(message.guild.name, message.guild.iconURL());
      return message.channel.send(embed).then(msg => {
        msg.delete({ timeout: 60000 });
      });
     }
}
};

const { MessageEmbed, version } = require("discord.js");
const config = require("../../config");
const db = require("quick.db");

module.exports = {
  config: {
    name: "botinfo",
    aliases: ["binfo", "stats"],
    category: "info",
    description: "Shows The Bot Information",
    usage: "",
    accessableby: "everyone"
  },
  run: async (bot, message, args) => {
    const dev1 = await bot.users.fetch(config.OWNER1);
    const dev2 = await bot.users.fetch(config.OWNER2);
    let totalUsers = bot.guilds.cache.reduce((a, b) => a + b.memberCount, 0);
    const inline = true;
    let days = Math.floor(bot.uptime / 86400000);
    let hours = Math.floor(bot.uptime / 3600000) % 24;
    let minutes = Math.floor(bot.uptime / 60000) % 60;
    let seconds = Math.floor(bot.uptime / 1000) % 60;
  let topggtotalvotes = db.fetch(`topggtotalvotes_`);
  if (topggtotalvotes === null) topggtotalvotes = 0;
    const embed = new MessageEmbed()
      .setColor(config.themecolor)
      .setTitle(`${bot.user.username} ${config.version}`)
      .setDescription(`Information & Stats of ${bot.user.username}`)
      .addField(
        `${config.gpoll} General ${config.gpoll}`,
        `> Servers: \`${bot.guilds.cache.size} servers\`\n` +
          `> Users: \`${totalUsers} users\`\n` +
          `> Channels: \`${bot.channels.cache.size} channels\`\n` +
          `> Version: \`${config.version}\`\n` +
          `> Commands: \`${bot.commands.size - 1} commands\``
      )
      .addField(
        `${config.gear} System ${config.gear}`,
        `> Node.js: \`12.16.1\`\n` +
          `> Discord.js: \`v${version}\`\n` +
          `> Ram used: \`${(
            process.memoryUsage().heapUsed /
            1024 /
            1024
          ).toFixed(2)}MB\``
      )
      .addField(
        `${config.crown} Bot owners ${config.crown}`,
        `> ${config.logo} **${bot.user.username}** was created by\n> ${config.vdevanimated} **[${dev2.tag}](https://discord.com/users/744578635780063293)**\n> ${config.vdevanimated} **[${dev1.tag}](https://discord.com/users/850938117422448670)**\n> ${config.vdevanimated} **[AThul🥀ᵁᵛᴱ#6969](https://discord.com/users/815608820113080330)**`
      )
      .addField(
        `${config.info} Other Info ${config.info}`,
        `> Ping: \`${Date.now() -
          message.createdTimestamp}ms\`\n> Uptime: \`${days}d ${hours}h ${minutes}m ${seconds}s\`\n> Total Votes: [${topggtotalvotes}](${
          config.VOTE_LINK
        })`
      )
      .addField(
        `${config.link} Useful links ${config.link}`,
        `> **[Bot Website](https://uchihabot.tk)**\n> **[Support server](${config.supportserver})**\n> **[Invite Uchiha](${config.INVITE_LINK})**\n> **[Top.gg Page](${config.TOP_GG})**`
      )
      .setImage(config.banner)
      .setFooter(`Information & Stats of ${bot.user.username}`)
      .setTimestamp();
    message.channel.send({ embed });
  }
};

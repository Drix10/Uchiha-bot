const { Client } = require("discord.js");
const { MessageAttachment } = require("discord.js");
const { Collection } = require("discord.js");
const { MessageEmbed } = require("discord.js");

/////////////////////////////////

const config = require("./config");

/////////////////////////////////

const bot = new Client({ disableMentions: "everyone" });
const fs = require("fs");
const db = require("quick.db");
const jimp = require("jimp");
const discord = require("discord.js");

/////////////////////////////////

bot.phone = new Collection();
bot.commands = new Collection();
bot.aliases = new Collection();

/////////////////////////////////

["aliases", "commands"].forEach(x => (bot[x] = new Collection()));
["console", "command", "event"].forEach(x => require(`./handler/${x}`)(bot));
bot.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
});

/////////////////////////////////

const DBL = require("dblapi.js");

/////////////////////////////////

const dbl = new DBL(process.env.TOPGG_TOKEN, {
  webhookPort: 3000,
  webhookAuth: process.env.TOPGG_AUTH
});

/////////////////////////////////

dbl.webhook.on("ready", hook => {
  console.log(
    `Vote Log is running http://${hook.hostname}:${hook.port}${hook.path}`
  );
});

/////////////////////////////////

dbl.webhook.on("vote", async (vote, upvote) => {
  const channel = bot.channels.cache.get(config.POST_CHANNEL);
  let plus = Math.floor(Math.random() * 0) + 1;
  db.add(`topggvotes_${vote.user}`, plus);
  let topggvotes = db.fetch(`topggvotes_${vote.user}`);
  if (topggvotes === null) topggvotes = 0;

  /////////////////////////////////

  db.add(`topggtotalvotes_`, plus);
  let topggtotalvotes = db.fetch(`topggtotalvotes_`);
  if (topggtotalvotes === null) topggtotalvotes = 0;

  /////////////////////////////////

  const voteusername = await bot.users.fetch(`${vote.user}`);

  /////////////////////////////////

  const embed = new discord.MessageEmbed()
    .setTitle(`${config.vote} Thanks for votting me ${config.vote}`)
    .addField(
      `${config.dot} New Vote By ${config.dot}`,
      `>>> **<@${vote.user}>\n${voteusername.tag}\n${vote.user}**`
    )
    .addField(
      `${config.dot} Vote Link ${config.dot}`,
      `> [Here](${config.VOTE_LINK})`
    )
    .addField(
      `${config.dot} User Votes ${config.dot}`,
      `> [${topggvotes}](${config.VOTE_LINK})`
    )
    .addField(
      `${config.dot} Total Votes ${config.dot}`,
      `> [${topggtotalvotes}](${config.VOTE_LINK})\n\n**You can vote again in 12hours!**`
    )
    .setThumbnail(`${voteusername.displayAvatarURL()}`)
    .setImage(config.banner)
    .setFooter(
      `${bot.user.username} • Thanks Again For Vote`,
      `${bot.user.displayAvatarURL()}`
    )
    .setTimestamp()
    .setColor(config.themecolor);
  channel.send(embed);
});

/////////////////////////////////

bot.on("ready", () => {
  setInterval(() => {
    dbl.postStats(bot.guilds.cache.size);
  }, 1800000);
});

/////////////////////////////////

const { GiveawaysManager } = require("discord-giveaways");

/////////////////////////////////

bot.giveawaysManager = new GiveawaysManager(bot, {
  storage: "./giveaways.json",
  updateCountdownEvery: 10000,
  default: {
    botsCanWin: false,
    embedColor: "#0AE4FF",
    reaction: "870977804576108564"
  }
});

/////////////////////////////////

bot.giveawaysManager.on(
  "giveawayReactionAdded",
  (giveaway, member, reaction) => {
    console.log(
      `${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`
    );
  }
);

/////////////////////////////////

bot.giveawaysManager.on(
  "giveawayReactionRemoved",
  (giveaway, member, reaction) => {
    console.log(
      `${member.user.tag} unreact to giveaway #${giveaway.messageID} (${reaction.emoji.name})`
    );
  }
);

/////////////////////////////////

bot.giveawaysManager.on("giveawayEnded", (giveaway, winners) => {
  console.log(
    `Giveaway #${giveaway.messageID} ended! Winners: ${winners
      .map(member => member.user.username)
      .join(", ")}`
  );
});

/////////////////////////////////

bot.on("guildCreate", guild => {
  try {
    const server = bot.guilds.cache.get(`${config.system_server}`);
    const channel = server.channels.cache.get(`${config.bot_join}`);
    const joinEmbed = new discord.MessageEmbed()
      .setDescription(`${guild.me.displayName} was added to a server`)
      .setTitle("Joined")
      .setColor("#0AE4FF")
      .setThumbnail(`${guild.iconURL()}`)
      .setTimestamp()
      .setFooter(`${guild.me.displayName}`, `${bot.user.displayAvatarURL()}`)
      .addFields(
        { name: "Name", value: guild.name, inline: false },
        { name: "GuildId", value: guild.id, inline: false },
        { name: "Guild OwnerId", value: guild.ownerID, inline: false },
        { name: "Member Count", value: guild.memberCount, inline: false },
        {
          name: "Total Member Count",
          value: bot.guilds.cache.reduce((a, b) => a + b.memberCount, 0),
          inline: false
        },
        { name: "Total Guilds", value: bot.guilds.cache.size, inline: true }
      );
    channel.send(joinEmbed);
  } catch (error) {
    console.log("There was an error sending join embed to channel");
  }
});

/////////////////////////////////

bot.on("guildDelete", guild => {
  try {
    const server = bot.guilds.cache.get(`${config.system_server}`);
    const channel = server.channels.cache.get(`${config.bot_leave}`);
    const leaveEmbed = new discord.MessageEmbed()
      .setDescription(`${guild.me.displayName} was removed from a server`)
      .setTitle("Removed")
      .setColor("BLACK")
      .setThumbnail(`${guild.iconURL()}`)
      .setTimestamp()
      .setFooter(`${guild.me.displayName}`, `${bot.user.displayAvatarURL()}`)
      .addFields(
        { name: "Name", value: guild.name, inline: false },
        { name: "GuildId", value: guild.id, inline: false },
        { name: "Guild OwnerId", value: guild.ownerID, inline: false },
        { name: "Member Count", value: guild.memberCount, inline: false },
        {
          name: "Total Member Count",
          value: bot.guilds.cache.reduce((a, b) => a + b.memberCount, 0),
          inline: false
        },
        { name: "Total Guilds", value: bot.guilds.cache.size, inline: true }
      );
    channel.send(leaveEmbed);
  } catch (error) {
    console.log("There was an error sending leave embed to channel.");
  }
});

/////////////////////////////////

bot.on("message", async message => {
  let prefix;
  try {
    let fetched = await db.fetch(`prefix_${message.guild.id}`);
   if (message.author.bot) return; 

    if (fetched == null) {
      prefix = config.PREFIX;
    } else {
      prefix = fetched;
    }
  } catch (e) {
    console.log(e);
  }
  try {
    if (
      message.mentions.has(bot.user) &&
      !message.mentions.has(message.guild.id)
    ) {
      return message.channel.send(
        new discord.MessageEmbed()
          .setColor("BLACK")
          .setAuthor(
            `${message.author.username} My Prefix is ${prefix} Type ${prefix}help For More Info`,
            message.author.displayAvatarURL({ dynamic: true }),
            "https://dsc.gg/uchiha-support"
          )
      );
    }
  } catch {
    return;
  }
});

/////////////////////////////////

bot.on("message", async message => {
  try {
    const hasText = Boolean(message.content);
    const hasImage = message.attachments.size !== 0;
    const hasEmbed = message.embeds.length !== 0;
    if (message.author.bot || (!hasText && !hasImage && !hasEmbed)) return;
    const origin = bot.phone.find(
      call => call.origin.id === message.channel.id
    );
    const recipient = bot.phone.find(
      call => call.recipient.id === message.channel.id
    );
    if (!origin && !recipient) return;
    const call = origin || recipient;
    if (!call.active) return;
    await call.send(
      origin ? call.recipient : call.origin,
      message,
      hasText,
      hasImage,
      hasEmbed
    );
  } catch {
    return;
  }
});

/////////////////////////////////

const { AutoPoster } = require('topgg-autoposter')

const ap = AutoPoster(process.env.TOPGG_TOKEN, bot)

ap.on('posted', () => {
  console.log('Posted stats to Top.gg!')
})

///////////////////////////////////////////


bot.login(process.env.TOKEN);

const Discord = require("discord.js");
const got = require("got");
const config = require("../../config");

module.exports = {
  config: {
    name: "meme",
    aliases: ["meme"],
    category: "fun",
    description: "meme",
    usage: " ",
    accessableby: "everyone"
  },
  run: async (bot, message, args) => {
    const embed = new Discord.MessageEmbed();
    got("https://www.reddit.com/r/memes/random/.json")
      .then(response => {
        const [list] = JSON.parse(response.body);
        const [post] = list.data.children;
        const permalink = post.data.permalink;
        const memeUrl = `https://reddit.com${permalink}`;
        const memeImage = post.data.url;
        const memeTitle = post.data.title;
        const memeUpvotes = post.data.ups;
        const memeNumComments = post.data.num_comments;
        embed.setTitle(`${memeTitle}`);
        embed.setURL(`${memeUrl}`);
        embed.setColor(config.themecolor);
        embed.setImage(memeImage);
        embed.setFooter(`👍 ${memeUpvotes} 💬 ${memeNumComments}`);

        message.channel.send(embed);
      })
      .catch(console.error);
  }
};

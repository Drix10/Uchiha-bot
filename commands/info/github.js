const { Discord, discord } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const fetch = require("node-fetch");
const config = require("../../config")

module.exports = {
  config: {
    name: "github",
    aliases: [""],
    usage: "[username]",
    category: "info",
    description: "Displays the Github profile of the searched user",
    accessableby: "everyone"
  },
  run: async (client, message, args) => {
    try {
      if (!args[0]) return message.channel.send(`${config.error} **Please Give Me A Username!**`);
      fetch(`https://api.github.com/users/${args.join("-")}`)
        .then(res => res.json())
        .then(body => {
          if (body.message)
            return message.channel.send(
              `${config.error} **User Not Found | Please Give Me A Valid Username!**`
            );
          let {
            login,
            avatar_url,
            name,
            id,
            html_url,
            public_repos,
            followers,
            following,
            location,
            created_at,
            bio
          } = body;
          const embed = new MessageEmbed()
            .setAuthor(`${login} Information!`, avatar_url)
            .setColor(`#211F1F`)
            .setThumbnail(`${avatar_url}`)
            .addField(`${config.arrow} Username`, `${login}`)
            .addField(`${config.arrow} ID`, `${id}`)
            .addField(`${config.arrow} Bio`, `${bio || "No Bio"}`)
            .addField(`${config.arrow} Public Repositories`, `${public_repos || "None"}`, true)
            .addField(`${config.arrow} Followers`, `${followers}`, true)
            .addField(`${config.arrow} Following`, `${following}`, true)
            .addField(`${config.arrow} Location`, `${location || "No Location"}`)
            .addField(
              `${config.arrow} Account Created`,
              moment.utc(created_at).format("dddd, MMMM, Do YYYY")
            )
            .setFooter(`Tysm For Using Me! ${message.author.username}`);
          message.channel.send(embed);
        });
    } catch (error) {
      console.log(
        `[Commands] [github] Getting Error In github Command :\n`,
        error
      );
      return message.channel.send(`${config.error} **Something Went Wrong Try Again Later!**`);
    }
  }
};

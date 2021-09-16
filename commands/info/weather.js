const weather = require('weather-js');
const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "weather",
        noalias: "",
        category: "info",
        description: "Shows weather of a city",
        usage: "[city name]",
        accessableby: "everyone"
    },
    run: async (bot, message, args) => {
        if(!args[0]) return message.channel.send('<a:pg:870080272698322984> **Please Enter A City Name!**')
      
        weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result){
        
        if(err) message.channel.send(err.message);

        if(result.length === 0) {
            message.channel.send('<a:pg:870080272698322984> **Please Enter A Valid Location.**')
            return undefined;
        }

            var current = result[0].current;
            var location = result[0].location;

            const embed = new MessageEmbed()
                .setDescription(`**${current.skytext}**`)
                .setAuthor(`Weather for ${current.observationpoint}`)
                .setThumbnail(current.imageUrl)
                .setColor("BLACK")
                .addField('<a:Ar:868269759626637372> **Timezone**', `<a:dot:870571248424468490> UTC ${location.timezone}`, true)
                .addField('<a:Ar:868269759626637372> **Degree Type**', `<a:dot:870571248424468490> ${location.degreetype}`, true)
                .addField('<a:Ar:868269759626637372> **Temperature**', `<a:dot:870571248424468490> ${current.temperature} Degrees`, true)
                .addField('<a:Ar:868269759626637372> **Feels Like**', `<a:dot:870571248424468490> ${current.feelslike} Degrees`, true)
                .addField('<a:Ar:868269759626637372> **Winds**', `<a:dot:870571248424468490> ${current.winddisplay}`, true)
                .addField('<a:Ar:868269759626637372> **Humidity**', `<a:dot:870571248424468490> ${current.humidity}%`, true)
                .addField('<a:Ar:868269759626637372> **Date**', `<a:dot:870571248424468490> ${current.date}`, true)
                .addField('<a:Ar:868269759626637372> **Day**', `<a:dot:870571248424468490> ${current.day}`, true)
                .setFooter(message.member.displayName, message.author.displayAvatarURL())
                .setTimestamp()

            message.channel.send({embed})

        });
    }
}


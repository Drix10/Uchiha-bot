const Discord = module.require("discord.js");



module.exports = {
    config: {
        name: "memetemp",
        aliases: ["templates"],
        description: "Show the Available Meme Templates",
        usage: "",
        accessableby: "everyone",
        category: "fun",
    },
    run: async(client, message, args) => {
        const embed = new Discord.MessageEmbed()
        .setTitle("Available Meme Templates")
        .setDescription("Usage Example: `!creatememe Meme Name Message 1 Message 2`\n`sohappy`,`tenguy`,`afraid`,`apcr`,`older`,`aag`,`atis`,`alyt`,`biw`,`stew`,`blb`,`bihw`,`kermit`,`bd`,`ch`,`cbg`,`wonka`,`cb`,`gandalf`,`keanu`,`cryingfloor`,`dsm`,`disastergirl`,`live`,`ants`,`doge`,`trump`,`drake`,`ermg`,`facepalm`,`feelsgood`,`firsttry`,`fwp`,`fa`,`fbf`,`fmr`,`fry`,`ggg`,`grumpycat`,`harold`,`hipster`,`icanhas`,`crazypills`,`elf`,`ackbar`,`agnes`,`aint-got-time`,`ams`,`away`,`awesome`,`captain`,`yuno`,`yodawg`,`whatyear`,`winter`,`tried`,`toohigh`,`success`,`spongebob`,`spiderman`,`sparta`,`snek`,`ski`,`soa`,`sadfrog`,`sad-obama`,`rollsafe`,`remembers`,`regret`,`red`,`mmm`,`money`,`patrick`,`nice`,`morpheus`,`joker`,`jetpack`,`imsorry`")
        .setTimestamp()
        .setColor("BLACK");
    return message.channel.send(embed);
    }
}
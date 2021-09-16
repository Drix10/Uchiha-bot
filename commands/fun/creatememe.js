const Discord = module.require("discord.js");



module.exports = {
    config: {
        name: "creatememe",
        aliases: ["makememe"],
        description: "Creates a Custom Meme From The Desired Template",
        usage: "[MemeName | Message 1 | Message 2]",
        accessableby: "everyone",
        category: "fun",
    },
  
    run: async(client, message, args) => {
        message.delete();
        const memetemplate = args[0];
        if (!memetemplate) {
            return message.channel.send("You didn't mention the template!. To see the available meme templates, type `${prefix}memetemp`");
        }
        const memetext1 = args[1];
        if (!memetext1) {
            return message.channel.send("Enter the text to be placed at the top!");
        }
        const memetext2 = args[2];
        if (!memetext2) {
            return message.channel.send("Enter the text to be placed at the bottom!");
        }
        message.channel.send({ files: [{ attachment: `https://api.memegen.link/images/${memetemplate}/${memetext1}/${memetext2}`, name: "custommeme.png"}]})
    },   
}
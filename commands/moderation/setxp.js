const db = require('quick.db');

module.exports = {
    config: {
        name: 'setxp',
        aliases: ['enablexp'],
        category: 'moderation',
        description: 'Enables Server XP Messages',
        usage: ' ',
        accessableby: 'Administrators'
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("<a:pg:870080272698322984> **You Do Not Have The Required Permissions! - [ADMINISTRATOR]**")

        try {
            let a = await db.fetch(`guildMessages_${message.guild.id}`)

            if (a) {
                return message.channel.send("<a:pg:870080272698322984> **XP Messages Are Already Enabled In The Server!**")
            } else {
                db.set(`guildMessages_${message.guild.id}`, 1)

                message.channel.send("<:yeah:868270172627173456> **XP Messages Are Enabled Successfully!**")
            }
            return;
        } catch (e) {
            console.log(e)
            return message.channel.send("<:nope:868270205225295932> **Something Went Wrong!**")
        }
    }
}
module.exports = {
    config: {
        name: "slowmode",
        aliases: ['smode', 'slowmo'],
        category: 'moderation',
        description: 'Set the slowmode of a channel.',
        usage: 'set slowmo',
        accessableby: 'Administrators'
    },
    run: async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_CHANNEL")) {
            return message.reply("You don't have enough perms to use this command!")
        }
        let duration = args[0]
        if(isNaN(duration)) return message.reply("Please give the time in seconds.")
        let reason = args.slice(1).join(" ")
        if(!reason) return message.reply("Please specify a reason!")
        
        message.channel.setRateLimitPerUser(duration, reason)
        message.reply(`Successfully set the slowmode to ${duration} seconds with Reason - ${reason}`)
    }
}
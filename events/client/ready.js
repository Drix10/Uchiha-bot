const { PREFIX } = require("../../config");
module.exports = async bot => {
  console.log(`${bot.user.username}(${bot.user.id}) is available now!`);
  let totalUsers = bot.guilds.cache.reduce((a, b) => a + b.memberCount, 0);
  var activities = [`${bot.guilds.cache.size} servers | ${totalUsers} users!`],
    i = 0;
  bot.user.setPresence({
    status: "idle", //online, idle, dnd, offline
    activity: {
      name: `${PREFIX}help | ${activities[i++ % activities.length]}`,
      type: "PLAYING" //PLAYING: WATCHING: LISTENING: STREAMING:
    }
  });
};

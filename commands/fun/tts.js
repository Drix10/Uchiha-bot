const request = require("node-superfetch");
const config = require("../../config");

module.exports = {
  config: {
    name: "tts",
    aliases: ["texttospeech"],
    category: "fun",
    usage: "Converts Text To Speech",
    description: "Convert Text-to-Speech",
    accessableby: "everyone"
  },
  run: async (bot, message, args, ops) => {
    if (!args[0])
      return message.channel.send(
        `${config.error} **Please Enter Something To Convert To Speech!**`
      );
    let text = args.join(" ");
    let serverQueue = ops.queue.get(message.guild.id)
    if (text.length > 1024)
      return message.channel.send(
        `${config.error} **Please Enter Text Between 0 And 1024 Characters!**`
      );
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
      return message.channel.send(`${config.error} **Please Join A Voice Channel First!**`);
    if (
      !voiceChannel
        .permissionsFor(message.client.user)
        .has(["CONNECT", "SPEAK"])
    ) {
      return message.channel.send(
        `${config.error} **Missing Permissions For The Voice Channel! - [CONNECT, SPEAK]**`
      );
    }
    if (serverQueue) return message.channel.send(`${config.error} **Cannot Play TTS While Music Is Being Played!**`)
    if (!voiceChannel.joinable)
      return message.channel.send(`${config.error} **Cannot Join Voice Channel!**`);
    if (bot.voice.connections.has(voiceChannel.guild.id))
      return message.channel.send(`${config.stopwatch} **I Am Already Converting TTS!**`);
    try {
      const connection = await voiceChannel.join();
      const { url } = await request
        .get("http://tts.cyzon.us/tts")
        .query({ text });
      const dispatcher = connection.play(url);
      await message.react("🔉");
      dispatcher.once("finish", () => voiceChannel.leave());
      dispatcher.once("error", () => voiceChannel.leave());
      return null;
    } catch (err) {
      voiceChannel.leave();
      console.log(err)
      return message.channel.send(
        `**${config.nope} Oh No, An Error Occurred: Try Again Later!**`
      );
    }
  }
};

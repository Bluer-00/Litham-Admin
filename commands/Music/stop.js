const Command = require("../../Base/Command");

class Stop extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "stop",
            aliases: [],
            description: "Stops the player",
            permissions: []
        });
    }

    async run(message, args) {
        if (!message.member.voice.channel) return message.channel.send("❌ | You are not in a voice channel!");
        if (message.guild.me.voice.channel && message.guild.me.voice.channelID !== message.member.voice.channelID) return message.channel.send("❌ | You are not in my voice channel!");

        const queue = this.client.player.getQueue(message);
        if (!queue) return message.channel.send("❌ | I am not playing anything?");

        queue.player.stop(message);

        message.channel.send(`✅ | Stopped!`);
    }

}

module.exports = Stop;
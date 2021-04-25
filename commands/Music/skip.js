const Command = require("../../Base/Command");

class Skip extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "skip",
            aliases: [],
            description: "Skips current song",
            permissions: []
        });
    }

    async run(message, args) {
        if (!message.member.voice.channel) return message.channel.send("❌ | You are not in a voice channel!");
        if (message.guild.me.voice.channel && message.guild.me.voice.channelID !== message.member.voice.channelID) return message.channel.send("❌ | You are not in my voice channel!");

        const queue = this.client.player.getQueue(message);
        if (!queue) return message.channel.send("❌ | I am not playing anything?");

        queue.player.skip(message);

        message.channel.send(`✅ | Skipped!`);
    }

}

module.exports = Skip;
const Command = require("../../Base/Command");

class Volume extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "volume",
            aliases: [],
            description: "Sets music volume",
            permissions: []
        });
    }

    async run(message, args) {
        if (!message.member.voice.channel) return message.channel.send("❌ | You are not in a voice channel!");
        if (message.guild.me.voice.channel && message.guild.me.voice.channelID !== message.member.voice.channelID) return message.channel.send("❌ | You are not in my voice channel!");

        const queue = this.client.player.getQueue(message);
        if (!queue) return message.channel.send("❌ | I am not playing anything?");

        const amount = args[0];
        if (!amount || isNaN(amount)) return message.channel.send("❌ | Please enter the volume amount to set!");
        if (parseInt(amount) < 0 || parseInt(amount) > 200) return message.channel.send("❌ | Volume amount must be in range of `0-200`!");

        queue.player.setVolume(message, parseInt(amount));

        message.channel.send(`✅ | Volume set to ${queue.volume}%!`);
    }

}

module.exports = Volume;
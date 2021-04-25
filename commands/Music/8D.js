const Command = require("../../Base/Command");

class EightD extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "8d",
            aliases: [],
            description: "Toggles 8D",
            permissions: []
        });
    }

    async run(message, args) {
        if (!message.member.voice.channel) return message.channel.send("❌ | You are not in a voice channel!");
        if (message.guild.me.voice.channel && message.guild.me.voice.channelID !== message.member.voice.channelID) return message.channel.send("❌ | You are not in my voice channel!");

        const queue = this.client.player.getQueue(message);
        if (!queue) return message.channel.send("❌ | I am not playing anything?");

        queue.setFilters({
            "8D": !queue.filters["8D"],
        });

        message.channel.send(`✅ | ${queue.filters["8D"] ? "Enabled" : "Disabled"} 8D!`);
    }

}

module.exports = EightD;
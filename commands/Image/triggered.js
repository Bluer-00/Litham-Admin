const Command = require("../../Base/Command.js");
const { MessageAttachment } = require("discord.js");
const { Canvas: Canvacord } = require("canvacord");

class Triggered extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "triggered",
            aliases: ["trigger"],
            description: "TRIGGERED"
        });
    }

    async run(message, args) {
        const user = message.mentions.users.first() || this.client.resolveUser(args.join(" ")) || message.author;

        const m = await message.channel.send("⏱ | Please wait...");
        const img = await Canvacord.trigger(user.displayAvatarURL({ format: "png", size: 2048 }));
        await m.delete().catch(() => {});

        return message.channel.send(new MessageAttachment(img, "triggered.gif"));
    }

}

module.exports = Triggered;
const Command = require("../../Base/Command.js");
const { MessageAttachment } = require("discord.js");
const { Canvas: Canvacord } = require("canvacord");

class Jail extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "jail",
            aliases: [],
            description: "Jail someone"
        });
    }

    async run(message, args) {
        const user = message.mentions.users.first() || this.client.resolveUser(args.join(" ")) || message.author;

        const m = await message.channel.send("⏱ | Please wait...");
        const img = await Canvacord.jail(user.displayAvatarURL({ format: "png", size: 2048 }));
        await m.delete().catch(() => { });

        return message.channel.send(new MessageAttachment(img, "jail.png"));
    }

}

module.exports = Jail;
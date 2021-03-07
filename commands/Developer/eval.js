const Command = require("../../Base/Command");
const Discord = require("discord.js");

class Eval extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "eval",
            aliases: ["ev"],
            description: "Evaluates Arbitrary JavaScript Code",
            ownerOnly: true
        });
    }

    async run(message, args) {
        const code = args.join(" ");
        if (!code) return message.channel.send("❌ | Please specify code to eval!");

        try {
            let ev = eval(code);
            ev = this.client.utils.cleanText(ev, this.client.token);

            return message.channel.send(ev, { code: "js", split: true });
        } catch (e) {
            return message.channel.send(`${e}`, { code: "js", split: true });
        }
    }

}

module.exports = Eval;
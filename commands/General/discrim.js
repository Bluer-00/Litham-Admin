const Command = require("../../Base/Command.js");
const { MessageEmbed } = require("discord.js");

class Discrim extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "discrim",
            aliases: ["discriminator"],
            description: "Shows users with your discriminator"
        });
    }

    async run(message, args) {
        const discrim = args[0] ?? message.author.discriminator;
        if (isNaN(discrim) || discrim.length !== 4) return message.reply("❌ | Invalid discriminator");

        const embed = new MessageEmbed()
            .setTitle(`Users with discriminator #${discrim}`)
            .setDescription(this.client.users.cache.filter(u => u.discriminator == discrim).slice(0, 10).map((m, i) => `${i+1}. ${m}`).join("\n"))
            .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp()
            .setColor("RANDOM");

        return message.channel.send(embed);
    }

}

module.exports = Discrim;
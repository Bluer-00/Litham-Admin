const Command = require("../../Base/Command.js");
const { MessageEmbed } = require("discord.js");

class UserInfo extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "userinfo",
            aliases: ["ui"],
            description: "User information"
        });
    }

    async run(message) {

        const embed = new MessageEmbed()
            .setAuthor("User Information", message.guild.iconURL())
            .setThumbnail(user.displayAvatarURL({ size: 4096 }))
            .setColor("RANDOM")
            .addField("Name", user.username, true)
            .addField("Discriminator", user.discriminator, true)
            .addField("Type", this.client.user.bot ? "Bot" : "User", true)
            .addField("ID", user.id, true)
            .addField("Created At", this.client.user.createdAt.toString())
            .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp();

        return message.channel.send(embed);
    }
}

module.exports = UserInfo;
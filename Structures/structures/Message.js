const { Structures } = require("discord.js");

Structures.extend("Message", BaseMessage => {
    return class Message extends BaseMessage {

        constructor(...props) {
            super(...props);
        }

        get args() {
            const makeArgs = (m) => {
                const arg = m.slice(this.guild.prefix.length).trim().split(/ +/);

                return [arg.shift().toLowerCase(), arg];
            };

            return {
                default: makeArgs(this.content),
                clean: makeArgs(this.cleanContent)
            };
        }

    }
})
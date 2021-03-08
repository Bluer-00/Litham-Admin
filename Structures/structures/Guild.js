const { Structures } = require("discord.js");

Structures.extend("Guild", BaseGuild => {
    return class Guild extends BaseGuild {

        constructor(...props) {
            super(...props);
        }

        get prefix() {
            return this.client.config.DEFAULT_PREFIX;
        }

    }
})
const Event = require("../../Base/Event.js");

class NoResults extends Event {

    constructor(client) {
        super(client);
    }

    run(message, query) {
        void message.channel.send(`❌ | No results were found for **${query}**!`);
    }

}

module.exports = NoResults;
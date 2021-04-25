const Event = require("../../Base/Event.js");

class TrackStart extends Event {

    constructor(client) {
        super(client);
    }

    run(message, track) {
        void message.channel.send(`🎵 | Started playing **${track.title}**!`);
    }

}

module.exports = TrackStart;
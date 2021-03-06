const { config } = require("dotenv");

// load .env
config();

// need some stuff globally
Object.defineProperties(globalThis, {
    fetch: {
        value: require("node-fetch"),
        writable: true,
        configurable: true,
        enumerable: false
    },
});

// load structures
require("./Structures/Guild.js");
require("./Structures/Message.js");
require("./Structures/User.js");
require("./Structures/Member.js");

// instantiate client
require("./client.js");
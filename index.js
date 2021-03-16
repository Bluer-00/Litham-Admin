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
require("./Structures/loader.js").load();

// instantiate client
require("./client.js");

// load web server
require("./dashboard/index");
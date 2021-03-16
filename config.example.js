const config = {
    COMMANDS_DIR: `${__dirname}/commands`, // commands dir
    EVENTS_DIR: `${__dirname}/events`, // events dir
    DEV_MODE: false, // dev mode
    OWNER: ["1234567890123456"], // Bot owner id
    DEFAULT_PREFIX: "er!", // default command prefix
    PORT: process.env.PORT || 3000, // web server port
    SESSION_SECRET: "SNOWFLAKE-IS-A.DEV__oR__snowflake-is-a.dev__Or__SnOwFlAkE.iS.a.DeV---huh!?",
    DISCORD_INVITE: "https://discord.gg/myserver"
};

module.exports = config;
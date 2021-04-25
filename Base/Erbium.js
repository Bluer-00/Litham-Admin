const { Client } = require("discord.js");
const fs = require("fs");
const config = require("../config.js");
const Command = require("../utils/Command.js");
const logger = require("../utils/Logger.js");
const Database = require("./Database");
const { Player } = require("discord-player");

class Erbium extends Client {

    constructor() {
        super({
            ws: { properties: { $browser: "Discord Android" } },
            intents: [
                "GUILDS",
                "GUILD_BANS",
                "GUILD_EMOJIS",
                "GUILD_INTEGRATIONS",
                "GUILD_INVITES",
                "GUILD_MEMBERS",
                "GUILD_MESSAGES",
                "GUILD_MESSAGE_REACTIONS",
                "GUILD_MESSAGE_TYPING",
                "GUILD_PRESENCES",
                "GUILD_VOICE_STATES",
                "GUILD_WEBHOOKS"
            ]
        });

        this.commands = new Command(this);
        this.config = config;
        this.utils = require("../utils/util");
        this.db = new Database(this);
        this.player = new Player(this, {
            enableLive: true,
            leaveOnEmpty: true,
            leaveOnEnd: true,
            leaveOnStop: true,
            autoSelfDeaf: true,
            ytdlDownloadOptions: {
                requestOptions: {
                    cookie: "YOUTUBE_COOKIE" in process.env ? Buffer.from(process.env.YOUTUBE_COOKIE, "base64").toString() : undefined
                }
            }
        });

        Object.defineProperties(this, {
            config: { enumerable: false },
        });
    }

    get database() {
        return this.db;
    }

    registerCommands() {
        const commandsDir = this.config.COMMANDS_DIR;

        // load commands
        const CATS = fs.readdirSync(commandsDir);

        for (const CAT of CATS) {
            logger.info(`[${CATS.indexOf(CAT) + 1}/${CATS.length}] Loading category ${CAT}`);
            const COMMANDS = fs.readdirSync(`${commandsDir}/${CAT}`).filter(x => x.endsWith(".js"));

            let i = 0;
            for (const c of COMMANDS) {
                logger.info(`[${i + 1}/${COMMANDS.length}] Loading command ${c} (${CAT})`);

                const cmd = require(`${commandsDir}/${CAT}/${c}`);
                const command = new cmd(this);

                command.setCategory(CAT);
                command.setPath(`${commandsDir}/${CAT}/${c}`);

                this.commands.setCommand(command.help.name, command);
                command.help.aliases.forEach(alias => this.commands.setAlias(alias, command.help.name));

                delete require.cache[require.resolve(`${commandsDir}/${CAT}/${c}`)];

                logger.success(`[${i + 1}/${COMMANDS.length}] Loaded command ${c} (${CAT})`);
                i++;
            }
        }
    }

    registerPlayerEvents() {
        const eventsDir = this.config.PLAYER_EVENTS_DIR;

        // load events
        const EVENTS = fs.readdirSync(eventsDir).filter(x => x.endsWith(".js"));

        let i = 0;

        for (const event of EVENTS) {
            logger.info(`[${i + 1}/${EVENTS.length}] Loading player event ${event}`);
            const ev = require(`${eventsDir}/${event}`);
            const evn = new ev(this);

            void this.player.on(event.replace(".js", ""), async (...args) => {
                try {
                    await evn.run(...args);
                } catch (e) {
                    logger.error(`Event: ${event.replace(".js", "")} :- ${e.toString()}`);
                }
            });

            delete require.cache[require.resolve(`${eventsDir}/${event}`)];

            logger.success(`[${i + 1}/${event.length}] Loaded player event ${event}`);

            i++;
        }
    }

    registerEvents() {
        const eventsDir = this.config.EVENTS_DIR;

        // load events
        const EVENTS = fs.readdirSync(eventsDir).filter(x => x.endsWith(".js"));

        let i = 0;

        for (const event of EVENTS) {
            logger.info(`[${i + 1}/${EVENTS.length}] Loading event ${event}`);
            const ev = require(`${eventsDir}/${event}`);
            const evn = new ev(this);

            void this.on(event.replace(".js", ""), async (...args) => {
                try {
                    await evn.run(...args);
                } catch(e) {
                    logger.error(`Event: ${event.replace(".js", "")} :- ${e.toString()}`);
                }
            });

            delete require.cache[require.resolve(`${eventsDir}/${event}`)];

            logger.success(`[${i + 1}/${event.length}] Loaded event ${event}`);

            i++;
        }
    }

    resolveUser(usernameOrUserResolvable, multiple = false) {
        if (usernameOrUserResolvable && typeof usernameOrUserResolvable === "string" && !parseInt(usernameOrUserResolvable)) {
            const name = usernameOrUserResolvable.toUpperCase();
            const arr = [];
            this.users.cache.forEach(user => {
                if (user.username.toUpperCase().indexOf(name) < 0) return;
                return arr.push(user);
            });
            return multiple ? arr : arr[0];
        } else {
            return usernameOrUserResolvable ? (multiple ? [this.users.resolve(usernameOrUserResolvable)] : this.users.resolve(usernameOrUserResolvable)) : null;
        }
    }

    async login() {
        logger.info("Starting the bot...");

        this.registerCommands();
        this.registerEvents();
        this.registerPlayerEvents();

        return await super.login();
    }

}

module.exports = Erbium;
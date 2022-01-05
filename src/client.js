const {
  AkairoClient,
  CommandHandler,
  ListenerHandler,
} = require("discord-akairo");
const { Intents } = require("discord.js");
const myIntents = new Intents();
myIntents.add(
  "DIRECT_MESSAGES",
  "DIRECT_MESSAGE_TYPING",
  "GUILDS",
  "GUILD_EMOJIS_AND_STICKERS",
  "GUILD_MEMBERS",
  "GUILD_MESSAGES",
  "GUILD_MESSAGE_TYPING",
  "GUILD_PRESENCES"
);

class Client extends AkairoClient {
  constructor() {
    super({
      intents: myIntents,
      ownerID: ["215509157837537280"],
      automateCategories: true,
    });

    this.commandHandler = new CommandHandler(this, {
      directory: "./commands",
      prefix: ".",
      allowMention: true,
      commandUtil: true,
      storeMessages: true,
      handleEdits: true,
    });

    this.listenerHandler = new ListenerHandler(this, {
      directory: "./events",
    });

    this.setup();
  }

  setup() {
    this.commandHandler.useListenerHandler(this.listenerHandler);

    this.listenerHandler.setEmitters({
      commandHandler: this.commandHandler,
      listenerHandler: this.listenerHandler,
    });

    this.commandHandler.loadAll();
    this.listenerHandler.loadAll();
  }

  async start(token) {
    await this.login(token);
    console.log("Ready!"); // eslint-disable-line no-console
  }
}

module.exports = Client;

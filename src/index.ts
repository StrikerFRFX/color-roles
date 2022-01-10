import { config } from "dotenv";
config({ path: "../.env" });

import "source-map-support/register";

import debug from "debug";
import * as Discord from "discord.js";

import { ClientCommand } from "../@types/djs-extender";
import ModuleLoader from "./util/classes/ModuleLoader";

class Client extends Discord.Client {
	commands = new Discord.Collection<string, ClientCommand>();
}

if (!process.env.TOKEN) throw new Error("Please set the TOKEN environment variable");

export const mainLog = debug("Color-Roles");

debug.enable("Color-Roles*");

//* Create new client & set login presence
export let client = new Client({
	intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_PRESENCES"]
});

async function run() {
	await client.login(process.env.TOKEN);
	mainLog("Connected to Discord");
	new ModuleLoader(client);
}

run();

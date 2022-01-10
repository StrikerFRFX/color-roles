import debug from "debug";
import { Guild, HexColorString, MessageEmbed, User } from "discord.js";
import { mainLog } from "../..";

export default class EmbedCreator {
	initialized: void;
	log: debug.Debugger;

	constructor(public guild: Guild) {
		this.log = mainLog.extend(`EmbedCreator`);
		this.initialized = this.init();
	}

	init() {
		return this.log(`EmbedCreator INITIALIZED in GUILD ${this.guild.name} (${this.guild.id})`);
	}

	createEmbed(type: "success" | "error" | "notify" | "colEmbed", details: string, user: User, color?: HexColorString) {
		const avatar = user.displayAvatarURL();

		switch (type) {
			case "success":
				return new MessageEmbed({
					thumbnail: { url: avatar },
					timestamp: Date.now(),
					color: "#00ff00",
					title: "Success!",
					description: details
				});

			case "error":
				return new MessageEmbed({
					thumbnail: { url: avatar },
					timestamp: Date.now(),
					color: "#ff0000",
					title: "Oops...",
					description: details
				});

			case "notify":
				return new MessageEmbed({
					thumbnail: { url: avatar },
					timestamp: Date.now(),
					color: "#000fff",
					title: "Just to let you know...",
					description: details
				});

			case "colEmbed":
				return new MessageEmbed({
					thumbnail: { url: avatar },
					timestamp: Date.now(),
					color: color,
					title: "Color",
					description: details
				});
		}
	}
}

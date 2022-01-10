import debug from "debug";
import { Guild, GuildMember } from "discord.js";
import { mainLog } from "../..";

export default class Validator {
	initialized: void;
	log: debug.Debugger;

	constructor(public g: Guild) {
		this.log = mainLog.extend(`Validator`);
		this.initialized = this.init();
	}

	init() {
		return this.log(`Validator INITIALIZED in GUILD ${this.g.name} (${this.g.id})`);
	}

	validate(member: GuildMember, validationCtx: "colReq" | "colChange" | "colPrev" | "colDel") {
		this.log(`Validating MEMBER: ${member.user.tag} (${member.user.id})`);

		switch (validationCtx) {
			case "colReq":
				switch (member.roles.highest.name.includes("color")) {
					case true:
						return false;
					case false:
						return true;
					default:
						break;
				}
				break;

			case "colChange":
				switch (member.roles.highest.name.includes("color")) {
					case true:
						return true;
					case false:
						return false;
					default:
						break;
				}
				break;

			case "colDel":
				switch (member.roles.highest.name.includes("color")) {
					case true:
						return true;
					case false:
						return false;
					default:
						break;
				}
				break;
		}
	}
}

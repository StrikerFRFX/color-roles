import debug from "debug";
import { ColorResolvable, GuildMember, HexColorString, Role, RoleData, RoleManager, User } from "discord.js";
import { mainLog } from "../..";
import EmbedCreator from "./EmbedCreator";

export default class roleManager {
	initialized: void;
	log: debug.Debugger;

	constructor(public roleManager: RoleManager) {
		this.log = mainLog.extend(`RoleManager`);
		this.initialized = this.init();
	}

	init() {
		return this.log(`RoleManager INITIALIZED in GUILD ${this.roleManager.guild.name} (${this.roleManager.guild.id})`);
	}

	async create(user: User, hexString: string) {
		this.log = this.log.extend(`RoleCreator`);
		this.log(`RoleCreator INITIALIZED in GUILD ${this.roleManager.guild.name} (${this.roleManager.guild.id})`);
		const hex = hexString as ColorResolvable;
		const createdRole = await this.roleManager.create({
			name: `color ${user.username.toLowerCase()}`,
			color: hex
		});

		this.log(`CREATED ROLE: ${createdRole.name}`);

		const member = await this.roleManager.guild.members.fetch(user.id);
		createdRole.setPosition(member.roles.highest.position);

		this.log(`Set POSITION for ROLE: ${createdRole.name}`);

		return createdRole;
	}

	async assign(user: User, role: Role) {
		this.log = this.log.extend(`RoleAssigner`);
		this.log(`RoleAssigner INITIALIZED in GUILD ${this.roleManager.guild.name} (${this.roleManager.guild.id})`);

		const member = await this.roleManager.guild.members.fetch(user.id);

		this.log(`FETCHED MEMBER: ${member.user.tag}`);

		member.roles.add(role);

		this.log(`ASSIGNED ROLE: ${role.name} to MEMBER`);
	}

	edit(member: GuildMember, ctx: "nameChange" | "colChange" | "boosted", role?: Role, hex?: HexColorString, roleData?: RoleData) {
		this.log = this.log.extend(`RoleEditor`);
		this.log(`RoleEdtior INITIALIZED in GUILD ${this.roleManager.guild.name} (${this.roleManager.guild.id})`);

		const embedCreator = new EmbedCreator(member.guild);

		switch (ctx) {
			case "nameChange":
				role!.edit({
					name: roleData!.name,
					color: hex
				});

				return embedCreator.createEmbed(
					"success",
					"Your role color and name have been successfully changed (Name has been changed to match current username",
					member.user
				);
			case "colChange":
				role!.edit({
					color: hex
				});

				return embedCreator.createEmbed("success", "Your role color has been successfully changed!", member.user);
			case "boosted":
				return embedCreator.createEmbed(
					"error",
					"You cannot change your Color Role currently because your `Nitro Booster` role is higher than it. To correct the position of this, please run `/boosted`",
					member.user
				);
		}
	}

	delete(member: GuildMember) {
		this.log = this.log.extend(`RoleDeleter`);
		this.log(`RoleDeleter INITIALIZED in GUILD ${this.roleManager.guild.name} (${this.roleManager.guild.id})`);

		member.roles.highest.delete();
		this.log(`Color Role of ${member.user.tag} deleted!`);
	}
}

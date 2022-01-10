import { GuildMember } from "discord.js";
import { mainLog } from "..";
import roleManager from "../util/classes/RoleManager";

export default async function (member: GuildMember) {
	const log = mainLog.extend("guildMemberUpdate");
	log(`guildMemberRemove event fired for GUILD ${member.guild.name} (${member.guild.name})`);
	const RoleManager = new roleManager(member.guild.roles);
	if (member.roles.highest.name.includes("color")) RoleManager.delete(member);

	log(`Member ${member.user.tag} (${member.user.id}) removed from GUILD`);
}

import { mainLog } from "..";
import roleManager from "../util/classes/RoleManager";

import { DiscordEvent } from "discord-module-loader";

export default new DiscordEvent("guildMemberRemove", async member => {
	if (member.partial) return;
	const log = mainLog.extend("guildMemberRemove");
	log(`guildMemberRemove event fired for GUILD ${member.guild.name} (${member.guild.name})`);
	const RoleManager = new roleManager(member.guild.roles);
	if (member.roles.highest.name.includes("color")) RoleManager.delete(member);

	log(`Member ${member.user.tag} (${member.user.id}) removed from GUILD`);
});

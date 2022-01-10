import { GuildMember } from "discord.js";
import { mainLog } from "..";
import EmbedCreator from "../util/classes/EmbedCreator";

export default async function (oldMember: GuildMember, newMember: GuildMember) {
	const log = mainLog.extend("guildMemberUpdate");
	log(`guildMemberUpdate event fired for GUILD ${newMember.guild.name} (${newMember.guild.name})`);
	if (oldMember.roles.highest.name.includes("color") && !newMember.roles.highest.name.includes("color") && oldMember.user.bot == false) {
		const embedCreator = new EmbedCreator(newMember.guild);
		newMember.send({
			embeds: [
				embedCreator.createEmbed(
					"notify",
					"Your Color Role is no longer your highest role.\nYou may have boosted the server, so you can try to run `/boosted` in a Server Channel to correct this.\n\nIf you believe this to have been sent in error, please contact an Administrator.",
					newMember.user
				)
			]
		});
		log(`Member ${newMember.user.tag} (${newMember.user.id}) notified by BOT.`);
	}
}

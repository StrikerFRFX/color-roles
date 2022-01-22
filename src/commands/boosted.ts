import { DiscordCommand } from "discord-module-loader";
import EmbedCreator from "../util/classes/EmbedCreator";

export default new DiscordCommand({
	name: "boosted",
	description: "Command to replace your Nitro Booster role with your Color Role (in terms of position)",
	execute: async int => {
		if (!int.inCachedGuild()) return;
		const embedCreator = new EmbedCreator(int.guild);
		if (int.member.roles.highest.name.includes("color"))
			return int.reply({ embeds: [embedCreator.createEmbed("error", "Your highest role is already your Color Role.", int.user)] });
		const colorRole = int.member.roles.cache.filter(r => r.name.toLowerCase().includes("color")).first();
		await colorRole!.setPosition(int.member.roles.highest.position);
		return int.reply({ embeds: [embedCreator.createEmbed("success", "Role Position Updated!", int.user)] });
	}
});

import { CommandInteraction, HexColorString } from "discord.js";

import { ClientCommand } from "../../../../@types/djs-extender";
import EmbedCreator from "../../../util/classes/EmbedCreator";
import roleManager from "../../../util/classes/RoleManager";
import Validator from "../../../util/classes/Validator";

export default async function (int: CommandInteraction) {
	if (!int.inCachedGuild()) return;
	const RoleManager = new roleManager(int.guild.roles);
	const validator = new Validator(int.guild);
	const embedCreator = new EmbedCreator(int.guild);
	let hex = int.options.getString("hex") as HexColorString;
	let embed, valid;

	switch (int.options.getSubcommand()) {
		case "register":
			valid = validator.validate(int.member, "colReq");
			if (valid) {
				const role = await RoleManager.create(int.user, hex);
				RoleManager.assign(int.user, role);
				embed = embedCreator.createEmbed("success", "I have successfully assigned & created your Color Role!", int.user);
				return int.reply({ embeds: [embed], ephemeral: true });
			} else {
				embed = embedCreator.createEmbed(
					"error",
					"You already have a color role and cannot request another. If you wish to change this, please use the `change` subcommand",
					int.user
				);
				return int.reply({ embeds: [embed], ephemeral: true });
			}

		case "change":
			valid = validator.validate(int.member, "colChange");
			if (valid) {
				if ((int.member.premiumSinceTimestamp as number) > 0 && int.member.roles.highest.name.toLowerCase().includes("boost")) {
					embed = RoleManager.edit(int.member, "boosted");

					return int.reply({ embeds: [embed], ephemeral: true });
				} else if (int.member.roles.highest.name.substring(6) !== int.user.username.toLowerCase()) {
					embed = RoleManager.edit(int.member, "nameChange", int.member.roles.highest, hex);
					return int.reply({ embeds: [embed], ephemeral: true });
				} else {
					embed = RoleManager.edit(int.member, "colChange", int.member.roles.highest, hex);
					return int.reply({ embeds: [embed], ephemeral: true });
				}
			} else {
				embed = embedCreator.createEmbed(
					"error",
					"You do not have a Color Role. Please use the `/color register` command and request one.",
					int.user
				);
				return int.reply({ embeds: [embed], ephemeral: true });
			}

		case "delete":
			valid = validator.validate(int.member, "colDel");

			if (!valid) {
				embed = embedCreator.createEmbed("error", "You currently have another role as your highest role.", int.member.user);
				return int.reply({ embeds: [embed], ephemeral: true });
			}

			RoleManager.delete(int.member);
			embed = embedCreator.createEmbed("success", "Your Color Role has successfully been deleted.", int.member.user);
			return int.reply({ embeds: [embed], ephemeral: true });

		case "check":
			const user = int.options.getUser("user");
			if (!user) {
				embed = embedCreator.createEmbed(
					"colEmbed",
					`Your current Color Role is **${int.member.roles.highest.hexColor}**`,
					int.user,
					int.member.roles.highest.hexColor
				);

				return int.reply({ embeds: [embed], ephemeral: true });
			} else {
				const member = await int.guild.members.fetch(user.id);
				embed = embedCreator.createEmbed(
					"colEmbed",
					`${user.username}'s current Color Role is **${member.roles.highest.hexColor}**`,
					user,
					member.roles.highest.hexColor
				);
				return int.reply({ embeds: [embed], ephemeral: true });
			}

		case "preview":
			const role = await RoleManager.create(int.user, hex);
			RoleManager.assign(int.user, role);
			embed = embedCreator.createEmbed(
				"success",
				"I have successfully assigned & created your Color Preview Role! You will have this for 15 seconds to check it out.",
				int.user
			);
			await int.reply({ embeds: [embed], ephemeral: true });
			setTimeout(async () => {
				RoleManager.delete(int.member);
				embed = embedCreator.createEmbed("success", "Your Color Preview role has been deleted.", int.user);
				return int.editReply({ embeds: [embed] });
			}, 15000);
			break;

		case "generate":
			const randomHex = Math.floor(Math.random() * 16777215).toString(16);
			embed = embedCreator.createEmbed("colEmbed", `Random Color: ${randomHex}`, int.user, randomHex as HexColorString);
			return int.reply({ embeds: [embed], ephemeral: true });
	}
}

export const config: ClientCommand = {
	command: {
		name: "color",
		description: "Main color changing command",
		options: [
			{
				type: "SUB_COMMAND",
				name: "register",
				description: "Register your Color Role for the first time (one time use)",
				options: [
					{
						type: "STRING",
						name: "hex",
						description: "The hex code for your Color Role to be made with",
						required: true
					}
				]
			},
			{
				type: "SUB_COMMAND",
				name: "change",
				description: "Change your Color Role's color",
				options: [
					{
						type: "STRING",
						name: "hex",
						description: "The hex code for your Color Role to change to",
						required: true
					}
				]
			},
			{
				type: "SUB_COMMAND",
				name: "delete",
				description: "Deletes your current Color Role"
			},
			{
				type: "SUB_COMMAND",
				name: "check",
				description: "Check the hex code of your Color Role",
				options: [
					{
						type: "USER",
						name: "user",
						description: "Optional user to check color of"
					}
				]
			},
			{
				type: "SUB_COMMAND",
				name: "preview",
				description: "Creates and adds a Color Role for 15 seconds to you.",
				options: [
					{
						type: "STRING",
						name: "hex",
						description: "The hex code for your Color Role preview",
						required: true
					}
				]
			},
			{
				type: "SUB_COMMAND",
				name: "generate",
				description: "Generates a completely random hex color code"
			}
		]
	}
};

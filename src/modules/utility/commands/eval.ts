import { CommandInteraction, Formatters, MessageEmbed } from "discord.js";
import { ClientCommand } from "../../../../@types/djs-extender";
import { transpile, getParsedCommandLineOfConfigFile, sys } from "typescript";
import { inspect } from "util";

export default async function (int: CommandInteraction) {
	if (!int.inCachedGuild()) return;
	if (int.user.id !== "215509157837537280") return;
	let evaled,
		codeToRun = int.options.getString("code", true).replaceAll(/[“”]/gim, '"');
	if (codeToRun.includes("await ")) codeToRun = `(async () => {\n${codeToRun}\n})()`;

	const { options } = getParsedCommandLineOfConfigFile(
		"tsconfig.json",
		{},
		{
			...sys,
			onUnRecoverableConfigFileDiagnostic: console.error
		}
	)!;
	options.sourceMap = false;
	options.alwaysStrict = false;

	const compiledCode = transpile(codeToRun, options);
	try {
		evaled = await eval(compiledCode);
		const inspected = inspect(evaled, { depth: 1, getters: true }),
			embed = new MessageEmbed({
				color: "#00ff00",
				author: { name: "Evaluation" },
				title: "The code was executed successfully! Here's the output",
				fields: [
					{ name: "Input", value: Formatters.codeBlock("ts", codeToRun.substring(0, 1015)) },
					{ name: "Compiled code", value: Formatters.codeBlock("js", compiledCode.replaceAll(";", "").substring(0, 1015)) },
					{ name: "Output", value: Formatters.codeBlock("js", inspected.substring(0, 1015)) },

					{
						name: "Output type",
						value:
							evaled?.constructor?.name === "Array"
								? `${evaled.constructor.name}<${evaled[0]?.constructor.name}>`
								: evaled?.constructor?.name ?? typeof evaled,
						inline: true
					},
					{ name: "Output length", value: `${inspected.length}`, inline: true },
					{ name: "Time taken", value: `${(Date.now() - int.createdTimestamp).toLocaleString()}ms`, inline: true }
				],
				timestamp: Date.now()
			});
		await int.reply({ embeds: [embed], ephemeral: true });
		console.log(evaled);
	} catch (err: unknown) {
		const error = err as Error;
		const embed = new MessageEmbed({
			color: "#ff0000",
			author: { name: "Evaluation" },
			title: "An error occured while executing that code. Here's the error stack",
			fields: [
				{ name: "Input", value: Formatters.codeBlock("ts", codeToRun.substring(0, 1015)) },
				{ name: "Compiled code", value: Formatters.codeBlock("js", compiledCode.replaceAll(";", "").substring(0, 1015)) },
				{ name: "Error", value: Formatters.codeBlock((error.stack ?? inspect(error)).substring(0, 1017)) },

				{ name: "Error Type", value: error.name ?? "Custom", inline: true },
				{ name: "Error length", value: `${(error.stack ?? inspect(error)).length}`, inline: true },
				{ name: "Time taken", value: `${(Date.now() - int.createdTimestamp).toLocaleString()}ms`, inline: true }
			],
			timestamp: Date.now()
		});
		console.error(error);
		await int.reply({ embeds: [embed], ephemeral: true });
	}
}

export const config: ClientCommand = {
	command: {
		name: "eval",
		description: "Evals the specified code.",
		options: [
			{
				type: "STRING",
				name: "code",
				description: "The code to run",
				required: true
			}
		]
	}
};

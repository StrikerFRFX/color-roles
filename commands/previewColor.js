const { Command } = require('discord-akairo');

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

class PreviewColorCommand extends Command {
    constructor() {
        super('previewColor', {
            category: 'general',
            aliases: ['previewColor', 'pc'],
            typing: true,
            args: [
            {
                id: 'hex',
                type: 'string',
                match: 'content'
            }]
        });
    }

    async exec(msg, args) {
        const previewEmbed = this.client.util.embed()
            .setTimestamp()
            .setTitle(`Preview: ${args.hex}`)
            .setDescription('You are currently previewing this color\nThis role will be deleted in 15 seconds, so now is a good opportunity to get a good look at it.')
            .setColor(args.hex);
        const role = await msg.guild.roles.create({
            data: {
                name: `color preview ${msg.author.username.toLowerCase()}`,
                color: `${args.hex}`
            }
        });
        role.setPosition((msg.member.roles.highest.position));
        await msg.member.roles.add(role);
        const successMessage = await msg.reply(previewEmbed);
        await sleep(15000);
        successMessage.delete();
        msg.delete();
        role.delete();
    }
}

module.exports = PreviewColorCommand;
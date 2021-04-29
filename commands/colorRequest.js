const { Command } = require('discord-akairo');
const { embedError, embedSuccess, logCommand } = require('../src/functions');

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

class ColorRequestCommand extends Command {
    constructor() {
        super('colorRequest', {
            category: 'general',
            aliases: ['colorRequest', 'cr'],
            args: [
            {
                id: 'hex',
                type: 'string',
                match: 'content'
            }]
        });
    }

    async exec(msg, args) {
        logCommand(this.client, msg);
        if (msg.member.roles.highest.name.includes('color') == true) {
            const errorMessage = await embedError(this.client, msg, msg.channel, 'You already have a color role and cannot request another.\nIf you want to change your color, do .cc #hexcode instead.');
            await sleep(10000);
            errorMessage.delete();
            msg.delete();
            return;
        }
        if (!args.hex) {
            const errorMessage = await embedError(this.client, msg, msg.channel, 'Please rerun the command with a valid hex code.');
            await sleep(10000);
            errorMessage.delete();
            msg.delete();
            return;
        } else {
            // Role Creation
            const role = await msg.guild.roles.create({
                name: `color ${msg.author.username.toLowerCase()}`,
                color: `${args.hex}`
            });
            role.setPosition((msg.member.roles.highest.position));

            // Role addition
            await msg.member.roles.add(role);
            const successMessage = await embedSuccess(this.client, msg, msg.channel, `I have successfully given you a role with the color **${args.hex}**`);
            await sleep(10000);
            successMessage.delete();
            msg.delete();
            return;
        }
    }
}

module.exports = ColorRequestCommand;
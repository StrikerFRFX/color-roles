const { Command } = require('discord-akairo');
const { embedError, embedSuccess, logCommand } = require('../src/functions');

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

class ColorChangeCommand extends Command {
    constructor() {
        super('colorChange', {
            category: 'general',
            aliases: ['colorChange', 'cc'],
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
        if (msg.member.premiumSinceTimestamp > 0 & msg.member.roles.highest.name.toLowerCase().includes('boost')) {
            const colorRole = msg.member.roles.cache.filter(r => r.name.includes('color')).first();
            if (colorRole == undefined) {
                const errorMessage = await embedError(this.client, msg, msg.channel, 'You do not have a color role.\n\nPlease run **.cr #hexcode** or **.colorRequest #hexcode** replacing hexcode with a valid hex code to get one');
                await sleep(10000);
                errorMessage.delete();
                msg.delete();
                return;
            } else {
                const errorMessage = await embedError(this.client, msg, msg.channel, 'You cannot change your Color Role currently, please run ".br" by itself to replace your Nitro Booster role with your color role.');
                await sleep(10000);
                errorMessage.delete();
                msg.delete();
                return;
            }
        } else if (msg.member.roles.highest.name.includes('color') == false) {
            const errorMessage = await embedError(this.client, msg, msg.channel, 'You do not have a color role.\n\nPlease run **.cr #hexcode** or **.colorRequest #hexcode** replacing hexcode with a valid hex code to get one');
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
            if (msg.member.roles.highest.name.substring(6) != msg.author.username.toLowerCase()) {
                msg.member.roles.highest.edit({
                    name: `color ${msg.author.username.toLowerCase()}`,
                    color: args.hex.toString()
                });

                const successMessage = await embedSuccess(this.client, msg, msg.channel, 'Your role color and name have been successfully changed (I changed the name as it didn\'t match your current username');
                await sleep(10000);
                successMessage.delete();
                msg.delete();
                return;
            } else {
                msg.member.roles.highest.edit({
                    color: args.hex.toString()
                });

                const successMessage = await embedSuccess(this.client, msg, msg.channel, 'Your role color has been successfully changed');
                await sleep(10000);
                successMessage.delete();
                msg.delete();
                return;
            }
        }
    }
}

module.exports = ColorChangeCommand;

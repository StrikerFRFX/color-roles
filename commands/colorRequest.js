const { Command } = require('discord-akairo');
const { createRole, addRole } = require('../src/functions.js');

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
        if (msg.member.roles.highest.name.includes('color') == true) {
            const errorMessage = await msg.reply('You already have a color role and cannot request another.\nIf you want to change your color, do .cc #hexcode instead.');
            await sleep(10000);
            errorMessage.delete();
            msg.delete();
            return;
        } else if (msg.member.roles.highest.name.includes('Booster') == true) {
            const filter = (reaction, user) => {
                return ['👍'].includes(reaction.emoji.name) && user.id === msg.author.id;
            };

            const confirmationMsg = await msg.channel.send('You already have a booster role, if you would like to replace this with your color role, click the reaction below.');
            confirmationMsg.react('👍');

            confirmationMsg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
                .then(async (collected) => {
                    const reaction = collected.first();

                    if (reaction.emoji.name === '👍') {
                        msg.reply('confirmed.');

                        if (!args.hex) {
                            const errorMessage = msg.reply('Please rerun the command with a valid hex code.');
                            await sleep(10000);
                            errorMessage.delete();
                            msg.delete();
                            return;
                        } else {
                            // Role Creation
                            const role = await createRole(msg, args);

                            // Role addition
                            addRole(msg, role, args);
                            return;
                        }
                    }
                })
                .catch(collected => {
                    msg.reply('You didn\'t vote within 1 minute. Please run the command again.');
                    return;
                });
        }
        if (!args.hex) {
            const errorMessage = msg.reply('Please rerun the command with a valid hex code.');
            await sleep(10000);
            errorMessage.delete();
            msg.delete();
            return;
        } else {
            // Role Creation
            const role = await createRole(msg, args);

            // Role addition
            addRole(msg, role, args);
        }
    }
}

module.exports = ColorRequestCommand;
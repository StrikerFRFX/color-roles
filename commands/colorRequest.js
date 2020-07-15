const { Command } = require('discord-akairo');

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
            const errorMessage = await msg.reply('You already have a color role and cannot request another.');
              await sleep(10000);
              errorMessage.delete();
              msg.delete();
              return;
          }
        if (!args.hex) {
            const errorMessage = msg.reply('Please rerun the command with a valid hex code.');
            await sleep(10000);
            errorMessage.delete();
            msg.delete();
            return;
        }
        // Safeguard for if person already has a color role. Will update role name if their username is different.
        if (msg.member.roles.highest.name.substring(6) != msg.author.username.toLowerCase() && msg.member.roles.highest.name != '@everyone' && msg.member.roles.highest.name != 'c sisters') {
            msg.member.roles.highest.edit({ name: `color ${msg.author.username.toLowerCase()}` });

            const errorMessage = await msg.reply('You already have a color role and cannot request another.\nI have updated your role name as your username did not match with the role.');
            await sleep(10000);
            errorMessage.delete();
            msg.delete();
            return;
        }

        if (!args.hex.toString().includes('#')) {
            const errorMessage = await msg.reply('Your message does not fit the format.\nPlease rerun the command with a "#" at the beginning of the Hex Code.');
            await sleep(10000);
            errorMessage.delete();
            msg.delete();
            return;
        } else {
            // Role Creation
            const role = await msg.guild.roles.create({
                data: {
                    name: `color ${msg.author.username.toLowerCase()}`,
                    color: `${args.hex}`
                }
            });
            role.setPosition((msg.member.roles.highest.position) + 1);

            // Role addition
            const additionPromise = await msg.member.roles.add(role);
            const successMessage = await msg.reply(`I have successfully given you a role with the color **${args.hex}**`);
            msg.delete();
            await sleep(10000);
            successMessage.delete();
            msg.delete();
            return;
        }
    }
}

module.exports = ColorRequestCommand;
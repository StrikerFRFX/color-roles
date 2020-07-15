const { Command } = require('discord-akairo');

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

class SeeColorCommand extends Command {
    constructor() {
        super('seeColor', {
            category: 'general',
            aliases: ['seeColor', 'sc'],
            typing: true
        });
    }

    async exec(msg) {
        if (!msg.mentions.users == false) {
            const message = await msg.reply('I have sent you their color!');
            msg.member.user.send(`**${msg.mentions.users.first().username}**'s current role color is **${msg.mentions.members.first().roles.highest.hexColor}**.\nIf you wish to find your own, just run the command by itself (.sc)`);
            return;
        } else {
            const message = await msg.reply('I have sent you your color!');
            msg.member.user.send(`Your current role color is **${msg.member.roles.highest.hexColor}**\nIf you wish to find someone else's color, mention them with the command (.sc @user)`);
            return;
        }
    }
}

module.exports = SeeColorCommand;
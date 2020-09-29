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
        let colorMessage = '';
        if (msg.mentions.users.first()) {
            let colorMessage = `**${msg.mentions.users.first().username}**'s current role color is **${msg.mentions.members.first().roles.highest.hexColor}**.`
            const message = await msg.reply('I have sent you their color!');
            msg.member.user.send(colorMessage)
               .catch((e) => {
                   msg.reply('Unable to DM. I have sent the message here.')
                   msg.reply(colorMessage)
               });
            return;
        } else if (!msg.mentions.users.first()) {
            let colorMessage = `Your current role color is **${msg.member.roles.highest.hexColor}**`
            const message = await msg.reply('I have sent you your color!');
            msg.member.user.send(colorMessage)
               .catch((e) => {
                   msg.reply('Unable to DM. I have sent the message here.')
                   msg.reply(colorMessage)
               });
            return;
        }
    }
}

module.exports = SeeColorCommand;

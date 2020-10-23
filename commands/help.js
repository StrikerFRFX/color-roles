const { Command } = require('discord-akairo');
const { embedNotify, embedError, embedSuccess, logCommand } = require('../src/functions');

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

class HelpCommand extends Command {
    constructor() {
        super('help', {
            category: 'general',
            aliases: ['help', 'h']
        });
    }

    async exec(msg) {
        logCommand(this.client, msg);
        const helpEmbed = this.client.util.embed()
            .setTimestamp()
            .setTitle(`Server: ${msg.guild.name}`)
            .setDescription('All commands in this server start with `.`')
            .addField('Help & Support', '[Documentationn](https://github.com/StrikerFRFX/color-roles/blob/master/README.md)\n[Support Server]()')
            .setColor('#ff00ff');

        msg.member.user.send(helpEmbed)
            .then(async (m) => {
                const successMessage = await embedSuccess(this.client, msg, msg.channel, 'Sent to your DMs!');
                await sleep(10000);
                successMessage.delete();
            })
            .catch(async (e) => {
                await embedError(this.client, msg, msg.channel, 'Unable to DM.\nI will send the help message here in a few seconds.');
                await sleep(10000);
                const helpMessage = await msg.channel.send(`<@${msg.author.id}>`, helpEmbed);
                await sleep(10000);
                helpMessage.delete();
            });
        return;
    }
}

module.exports = HelpCommand;
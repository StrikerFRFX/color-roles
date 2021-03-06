const { Command } = require('discord-akairo');
const { logCommand } = require('../src/functions');

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

class RestartCommand extends Command {
    constructor() {
        super('restart', {
            category: 'general',
            aliases: ['restart', 'rs'],
            ownerOnly: true,
            args: [
            {
                id: 'content',
                match: 'content'
            }]
        });
    }

    async exec(msg, args) {
        logCommand(this.client, msg);
        console.log('Restarting...');
        const restartMsg = await msg.channel.send('Restarting');
        await restartMsg.edit('RESTARTING [.]');
        await sleep(2000);
        await restartMsg.edit('RESTARTING [..]');
        await sleep(2000);
        await restartMsg.edit('RESTARTING [...]');
        await sleep(2000);
        process.exit(1);
    }
}

module.exports = RestartCommand;
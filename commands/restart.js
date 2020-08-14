const { Command } = require('discord-akairo');

class RestartCommand extends Command {
    constructor() {
        super('restart', {
            category: 'general',
            aliases: ['restart', 'rs'],
            typing: true,
            ownerOnly: true,
            args: [
            {
                id: 'content',
                match: 'content'
            }]
        });
    }

    async exec(msg, args) {
        console.log('Restarting...');
        const restartMsg = await msg.channel.send('Restarting');
        restartMsg.edit('Restarting.');
        restartMsg.edit('Restarting..');
        restartMsg.edit('Restarting...');
        process.exit(1);
    }
}

module.exports = RestartCommand;
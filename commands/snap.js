const { Command } = require('discord-akairo');
const { logCommand } = require('../src/functions');
class SnapCommand extends Command {
    constructor() {
        super('snap', {
            category: 'general',
            aliases: ['snap'], 
            ownerOnly: true
        });
    }

    async exec(msg) {
        logCommand(this.client, msg);
        msg.guild.roles.cache.each((r) => r.edit({color: "000000"})) 
    }
}

module.exports = SnapCommand;

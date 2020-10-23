const { Command } = require('discord-akairo');
const { embedError, embedSuccess, logCommand } = require('../src/functions');

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

class BoostReplaceCommand extends Command {
    constructor() {
        super('boostRoleReplace', {
            category: 'general',
            aliases: ['boostRoleReplace', 'br']
        });
    }

    async exec(msg) {
        logCommand(this.client, msg);
        if (msg.member.roles.highest.name.includes('color')) {
            const errorMsg = await embedError(this.client, msg, msg.channel, 'Your highest role is already your Color Role.');
            await sleep(10000);
            errorMsg.delete();
        } else {
            const role = msg.member.roles.cache.filter(r => r.name.toLowerCase().includes('color')).first();
            console.log(role);
            console.log('test');
            await role.setPosition(msg.member.roles.highest.position);
            const successMsg = await embedSuccess(this.client, msg, msg.channel, 'Replaced your Booster Role successfully with your Color Role!');
            await sleep(10000);
            successMsg.delete();
        }
    }
}

module.exports = BoostReplaceCommand;
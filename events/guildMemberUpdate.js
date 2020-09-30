const { Listener } = require('discord-akairo');

class memberUpdate extends Listener {
    constructor() {
        super('guildMemberUpdate', {
            emitter: 'client',
            event: 'guildMemberUpdate'
        });
    }

    exec(oldMember, newMember) {
        if (oldMember.premiumSinceTimestamp != newMember.premiumSinceTimestamp && oldMember.roles.highest.name.includes('color') == true) {
            newMember.send('You have boosted a server which your highest role is your Color Role. If you wish to change this, please run the command ".br" in this server to replace your new Booster role with your Color Role.');
        }
    }
}

module.exports = memberUpdate;
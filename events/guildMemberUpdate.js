const { Listener } = require('discord-akairo');
const { embedNotify } = require('../src/functions');
const { boostNotifyText } = require('../src/constants');

class GuildMemberUpdateListener extends Listener {
    constructor() {
        super('guildMemberUpdate', {
            emitter: 'client',
            event: 'guildMemberUpdate'
        });
    }

    exec(oldMember, newMember) {

        if (oldMember.premiumSinceTimestamp != newMember.premiumSinceTimestamp && oldMember.roles.highest.name.includes('color') == true && newMember.roles.highest.name.includes('color') == false && oldMember.user.bot == false) {
            embedNotify(this.client, null, newMember.user, boostNotifyText);
        }
    }
}

module.exports = GuildMemberUpdateListener;
const { Listener } = require('discord-akairo');

class guildMemberRemoveListener extends Listener {
    constructor() {
        super('guildMemberRemove', {
            emitter: 'client',
            event: 'guildMemberRemove'
        });
    }

    exec(member) {
       if (member.roles.highest.name.includes('color')) {
           member.roles.highest.delete();
       }
    }
}

module.exports = guildMemberRemoveListener;
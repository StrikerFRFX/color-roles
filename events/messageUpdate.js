const { Listener } = require('discord-akairo');

class messageUpdateListener extends Listener {
    constructor() {
        super('messageUpdate', {
            emitter: 'client',
            event: 'messageUpdate'
        });
    }

    exec(msg) {
        if (msg.content.startsWith(this.client.commandHandler.prefix)) {
            if (msg.author.bot) return;
        }
    }
}

module.exports = messageUpdateListener;
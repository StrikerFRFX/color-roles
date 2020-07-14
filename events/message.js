const { Listener } = require('discord-akairo');

class messageListener extends Listener {
    constructor() {
        super('message', {
            emitter: 'client',
            event: 'message'
        });
    }

    exec(msg) {
        if (msg.content.startsWith(this.client.commandHandler.prefix)) {
            if (msg.author.bot) return;
        }
    }
}

module.exports = messageListener;
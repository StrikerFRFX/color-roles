const { Listener } = require('discord-akairo');

class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    exec() {
        const guilds = this.client.guilds.size;

        this.client.user.setActivity('with Rainbows', {
            type: 'PLAYING',
        });

        console.log(`${this.client.user.username} is connected to the Discord WebSocket`);
    }
}

module.exports = ReadyListener;

const { Command } = require('discord-akairo');

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

class RandomColorCommand extends Command {
    constructor() {
        super('randomColor', {
            category: 'general',
            aliases: ['randomColor', 'rc']
        });
    }

    async exec(msg) {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        const randomColorEmbed = this.client.util.embed()
            .setTimestamp()
            .setTitle(`Color: ${randomColor}`)
            .setDescription('This message will delete in 15 seconds, so if you like this color save it.')
            .setColor(randomColor);
        const message = await msg.reply(randomColorEmbed);
        await sleep(15000);
        msg.delete();
        message.delete();
    }
}

module.exports = RandomColorCommand;
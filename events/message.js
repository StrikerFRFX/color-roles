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
            this.client.commandHandler.aliases.keyArray().forEach((c) => {
                if (msg.content.includes(c) && msg.content.startsWith(this.client.commandHandler.prefix)) {
                    this.client.channels.fetch('768189873126637628').then((channel) => {
                        const logEmbed = this.client.util.embed()
                            .setAuthor(msg.author.tag)
                            .setColor('#00ff00')
                            .setTimestamp()
                            .addField(`Command used in ${msg.guild.name}`, msg.content)
                            .setThumbnail(msg.author.displayAvatarURL({ size: 64 }));
                        channel.send(logEmbed);
                    });
                }
            });
        }
    }
}

module.exports = messageListener;
const { Command } = require('discord-akairo');
const { logCommand } = require('../src/functions');

const moment = require("moment");
require("moment-duration-format");


class UptimeCommand extends Command {
    constructor() {
        super('uptime', {
            category: 'general',
            aliases: ['uptime', 'ut']
        });
    }

    async exec(msg) {
        logCommand(this.client, msg);
        console.log(`Uptime Command Ran by ${msg.author.tag}`)

        const uptimeEmbed = this.client.util.embed()
            .setTitle('==COLOR ROLES UPTIME==')
            .setTimestamp()
            .setThumbnail(this.client.user.avatarURL())
            .setColor('#ffff00');

        const uptime = moment.duration(this.client.uptime).format(" D [Days], H [Hours], m [Minutes], s [Seconds]");

        console.log(`Uptime: ${uptime}`);
        uptimeEmbed.setDescription(uptime)
        return msg.channel.send('', {
            embed: uptimeEmbed,
        });
    }
}

module.exports = UptimeCommand;

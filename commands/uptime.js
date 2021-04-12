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
        console.log(`Uptime COmmand Ran by ${msg.author.tag}`)

        const uptimeEmbed = this.client.util.embed()
            .setTimestamp()
            .setThumbnail(this.client.user.avatarURL());

        const uptime = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");

        console.log(`Uptime: ${uptime}`);
        pingEmbed.setDescription(uptime)
        return message.edit('', {
            embed: uptimeEmbed,
        });
    }
}

module.exports = UptimeCommand;
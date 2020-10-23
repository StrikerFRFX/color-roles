const { Command } = require('discord-akairo');
const { embedError, embedNotify, embedSuccess, logCommand } = require('../src/functions');

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

class SeeColorCommand extends Command {
    constructor() {
        super('seeColor', {
            category: 'general',
            aliases: ['seeColor', 'sc']
        });
    }

    async exec(msg) {
        if (msg.mentions.users.first()) {
            logCommand(this.client, msg);
            const colorEmbed = this.client.util.embed()
            .setTimestamp()
            .setThumbnail(msg.mentions.users.first().avatarURL())
            .setTitle('COLOR')
            .setDescription(`**${msg.mentions.users.first().username}**'s current role color is **${msg.mentions.members.first().roles.highest.hexColor}**.`)
            .setColor(msg.mentions.members.first().roles.highest.hexColor);

            msg.member.user.send(colorEmbed)
                .then(async (m) => {
                    const successMessage = await embedSuccess(this.client, msg, msg.channel, 'I have sent you their color!');
                    await sleep(10000);
                    successMessage.delete();
                })
                .catch(async (e) => {
                    const errorMessage = await embedError(this.client, msg, msg.channel, 'Unable to DM.\nI will send the message here in a few seconds.');
                    await sleep(10000);
                    errorMessage.delete();
                    const colorMessage = await msg.channel.send(`<@${msg.author.id}>`, colorEmbed);
                    colorMessage.delete();
                });
            return;
        } else if (!msg.mentions.users.first()) {
            const colorEmbed = this.client.util.embed()
            .setTimestamp()
            .setThumbnail(msg.author.avatarURL())
            .setTitle('COLOR')
            .setDescription(`Your current role color is **${msg.member.roles.highest.hexColor}**`)
            .setColor(msg.member.roles.highest.hexColor);

            msg.member.user.send(colorEmbed)
                .then(async (m) => {
                    const successMessage = await embedSuccess(this.client, msg, msg.channel, 'I have sent you your color!');
                    await sleep(10000);
                    successMessage.delete();
                })
                .catch(async (e) => {
                    await embedError(this.client, msg, msg.channel, 'Unable to DM.\nI will send the message here in a few seconds.');
                    await sleep(10000);
                    const colorMessage = await msg.channel.send(`<@${msg.author.id}>`, colorEmbed);
                    await sleep(10000);
                    colorMessage.delete();
                });
            return;
        }
    }
}

module.exports = SeeColorCommand;
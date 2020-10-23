const embedError = async (client, msg, sendTo, details) => {
    let messageSent;
    const avatar = msg ? msg.author.avatarURL() : null;
    const embed = client.util.embed()
        .setThumbnail(avatar)
        .setTimestamp()
        .setColor('#ff0000')
        .setTitle('**ERROR**')
        .setDescription(details);
    if (msg) {
        messageSent = await sendTo.send(`<@${msg.author.id}>`, embed);
    } else messageSent = await sendTo.send(embed);
    const promise = Promise.resolve(messageSent);
    return promise;
};

const embedSuccess = async (client, msg, sendTo, details) => {
    let messageSent;
    const avatar = msg ? msg.author.avatarURL() : null;
    const embed = client.util.embed()
        .setThumbnail(avatar)
        .setTimestamp()
        .setColor('#00ff00')
        .setTitle('**SUCCESS**')
        .setDescription(details);
    if (msg) {
        messageSent = await sendTo.send(`<@${msg.author.id}>`, embed);
    } else messageSent = await sendTo.send(embed);
    const promise = Promise.resolve(messageSent);
    return promise;
};

const embedNotify = async (client, msg, sendTo, details) => {
    let messageSent;
    const avatar = msg ? msg.author.avatarURL() : null;
    const embed = client.util.embed()
        .setThumbnail(avatar)
        .setTimestamp()
        .setColor('#000fff')
        .setTitle('**NOTIFICATION**')
        .setDescription(details);
    if (msg) {
        messageSent = await sendTo.send(`<@${msg.author.id}>`, embed);
    } else messageSent = await sendTo.send(embed);
    const promise = Promise.resolve(messageSent);
    return promise;
};

const logCommand = (client, msg) => {
    client.channels.fetch('768189873126637628').then((channel) => {
        const logEmbed = client.util.embed()
            .setAuthor(msg.author.tag)
            .setColor('#00ff00')
            .setTimestamp()
            .addField(`Command used in ${msg.guild.name}`, msg.content)
            .setThumbnail(msg.author.displayAvatarURL({ size: 64 }));
        channel.send(logEmbed);
    });
};

module.exports = { embedError, embedSuccess, embedNotify, logCommand };
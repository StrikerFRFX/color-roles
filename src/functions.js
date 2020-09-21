const createRole = async (msg, args) => {
    const role = await msg.guild.roles.create({
        data: {
            name: `color ${msg.author.username.toLowerCase()}`,
            color: `${args.hex}`
        }
    });
    role.setPosition((msg.member.roles.highest.position));

    return new Promise(role);
};

const addRole = async (msg, role, args) => {
    function sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    await msg.member.roles.add(role);
    const successMessage = await msg.reply(`I have successfully given you a role with the color **${args.hex}**`);
    await sleep(10000);
    successMessage.delete();
    msg.delete();
    return;
};

module.exports = { createRole, addRole };
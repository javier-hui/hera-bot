const Discord = require('discord.js');

cmd = async (client, message, args) => {

    if (!args.length) {
        return client.commands.get('error').run(client, message, args);
    }
    switch (args.shift()) {
        case 'dinner':
            break;
        default:
            return client.commands.get('error').run(client, message, args);
    }

}


module.exports = {
    name: 'show',
    aliases: ["s"],
    run: cmd

}

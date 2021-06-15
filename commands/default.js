const Discord = require('discord.js');

cmd = async (client, message) => {

    let embed = {
        color: 0xff0000,
        title: "what 7 u say?",
        description: `u up what ar ${message.author}`,
        image: 'https://j.gifs.com/mqwxL0.gif',
        timestamp: new Date()
    }

    message.channel.send({ embed: embed });
}


module.exports = {
    name: 'error',
    aliases: [],
    run: cmd
}
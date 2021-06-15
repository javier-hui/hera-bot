const Discord = require('discord.js');

cmd = async (client, message) => message.channel.send("pong!");


module.exports = {
    name: 'ping',
    aliases: [],
    run: cmd

}

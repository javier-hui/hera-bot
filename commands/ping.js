const Discord = require('discord.js');

cmd = async (client, message) => {

    message.channel.send("pong!");

    
    let embed = new Discord.MessageEmbed()
        .setImage('https://i.gifer.com/1L7M.gif');
    message.channel.send(embed);
    
}


module.exports = {
    name: 'ping',
    aliases: [],
    run: cmd

}

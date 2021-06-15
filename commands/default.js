const Discord = require('discord.js');

cmd = async (client, message) => {

    let embed = new Discord.MessageEmbed()
        .setTitle('what 7 you say?')
        .setDescription(`u up what ar ${message.author}`)
        .setImage('https://j.gifs.com/mqwxL0.gif');
        //.setImage('https://media.giphy.com/media/WRQBXSCnEFJIuxktnw/source.gif');
    message.channel.send(embed);

}


module.exports = {
    name: 'error',
    aliases: [],
    run: cmd
}
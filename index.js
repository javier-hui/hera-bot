const Discord = require('discord.js'),
    client = new Discord.Client(),
    { loadCommands } = require('./utils/loadCommands');
    
require('./utils/loadEvents')(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
loadCommands(client);

client.login(process.env.TOKEN || (require('./settings.json')).token);
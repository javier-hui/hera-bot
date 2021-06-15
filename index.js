const Discord = require('discord.js'),
    Sequelize = require('sequelize'),
    client = new Discord.Client(),
    { loadCommands } = require('./utils/loadCommands'),
    
    sequelize = new Sequelize('database', 'user', 'password', {
        host: 'localhost',
        dialect: 'sqlite',
        logging: false,
        // SQLite only
        storage: 'database.sqlite',
    });

require('./utils/loadEvents')(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
loadCommands(client);

client.login(process.env.TOKEN || (require('./settings.json')).token);
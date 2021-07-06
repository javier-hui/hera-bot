const fs = require('fs');

function loadCommands(bot) {
    fs.readdir('commands/', (err, files) => {
        if (err) console.log(err);

        const jsfile = files.filter(f => f.split('.').pop() === 'js');
        if (jsfile.length <= 0) return console.log('bot couldn\'t find commands in commands folder');    
        jsfile.forEach((f, i) => {
            const pull = require(`../commands/${f}`);
            bot.commands.set(pull.name, pull);
            pull.aliases.forEach(alias => {
                bot.aliases.set(alias, pull.name);
            });
        });
    });
}

module.exports = {
    loadCommands
}
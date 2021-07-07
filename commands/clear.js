const { loadDB } = require('../utils/loadDB'),
    members = require('../global.json').members;

cmd = async (client, message, args) => {
    // find out who is sending the message
    let member = members.find(e => e.id == message.author.id);
    if (member == undefined) return client.commands.get('errordb').run(client, message);

    const clearObj = args.shift();

    // clear grocery list
    if (clearObj == "groceries") {

        const item = args.join(' ');

        const query = `DELETE FROM groceries;`;
        console.log(`query: ${query}`);
        const res = await loadDB(query);
        if (res == undefined) return client.commands.get('errordb').run(client, message);

        let embed = {
            color: 0x00ff00,
            title: `${member.name} cleared the grocery list`,
            description: `nice lol`,
            timestamp: new Date()
        };

        message.channel.send({ embed: embed });
        return;
    }

    message.channel.send("what u wanna delete man");
}


module.exports = {
    name: 'clear',
    aliases: [],
    run: cmd

}
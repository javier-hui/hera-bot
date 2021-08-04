const { loadDB } = require('../utils/loadDB'),
    colors = require('../global.json').colors,
    members = require('../global.json').members;

cmd = async (client, message, args) => {
    // find out who is sending the message
    let member = members.find(e => e.id == message.author.id);
    if (member == undefined) return client.commands.get('errordb').run(client, message);

    const editObj = args.shift();

    // edit grocery list
    if (editObj == "groceries") {

        const item = args.join(' ');

        const query = `UPDATE groceries SET item, creator) VALUES('${item}', '${member.name}');`;
        console.log(`query: ${query}`);
        const res = await loadDB(query);
        if (res == undefined) return client.commands.get('errordb').run(client, message);

        let embed = {
            color: colors.success,
            title: `${member.name} added a new grocery item`,
            description: `${item}`,
            timestamp: new Date()
        };
        
        message.channel.send({ embed: embed });
        return;
    }

    message.channel.send("what u wanna edit man");
}


module.exports = {
    name: 'editeeeee',
    aliases: [],
    run: cmd

}
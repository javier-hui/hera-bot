const { loadDB } = require('../utils/loadDB'),
    colors = require('../global.json').colors,
    members = require('../global.json').members;

cmd = async (client, message, args) => {
    // find out who is sending the message
    let member = members.find(e => e.id == message.author.id);
    if (member == undefined) return client.commands.get('errordb').run(client, message);

    const addObj = args.shift();

    // add to grocery list
    if (addObj == "groceries") {

        const index = Number(args.shift());

        const prequery = `SELECT id, item FROM groceries ORDER BY id;`;
        console.log(`prequery: ${prequery}`);
        const preres = await loadDB(prequery);
        if (preres == undefined) return client.commands.get('errordb').run(client, message);
        console.log(preres.rows);

        if (index < 1 || index > preres.rows.length) return; // index out of bounds
        const id = preres.rows[index - 1].id;

        const query = `DELETE FROM groceries WHERE id = ${id};`;
        console.log(`query: ${query}`);
        const res = await loadDB(query);
        if (res == undefined) return client.commands.get('errordb').run(client, message);

        let embed = {
            color: colors.success,
            title: `${member.name} removed a grocery item`,
            description: `item: ${preres.rows[index - 1].item}`,
            timestamp: new Date()
        };
        
        message.channel.send({ embed: embed });
        return;
    }

    message.channel.send("what u wanna remove man");
}


module.exports = {
    name: 'remove',
    aliases: [],
    run: cmd

}
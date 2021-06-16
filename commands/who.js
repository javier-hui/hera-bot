const { loadDB } = require('../utils/loadDB'),
    members = require('../config.json').members;

cmd = async (client, message, args) => {

    if (!args.length) {
        return client.commands.get('error').run(client, message);
    }

    let weekday = (new Date).getDay(), dinner = false, word = 0;

    if (args.includes('dinner') || args.includes('din')) { dinner = true; word++; }
    if (args.includes('tomorrow') || args.includes('tmr')) { weekday = (weekday + 1) % 7; word += 2; }

    const query = `SELECT DISTINCT name, at_home, reason FROM supper WHERE weekday = ${weekday} AND dinner = ${dinner};`;
    console.log(`query: ${query}`);
    const res = await loadDB(query);
    if (res == undefined) return;
    console.log(res.rows);

    let embed = {
        color: 0x92207b,
        title: `who's having ${dinner ? `dinner` : `lunch`} at home ${[`today`, `tonight`, `tomorrow`, `tomorrow night`][word]}?`,

        fields: [
            {
                name: "at home :white_check_mark::",
                value: '',
                inline: true
            },
            {
                name: "not at home :negative_squared_cross_mark::",
                value: '',
                inline: true
            },
        ],
        timestamp: new Date()
    }

    for (let member of members) {
        let value = `${member.emoji} **${member.name}** - ${res.rows.find(e => e.name == member.name).reason}\n`;
        if (res.rows.find(e => e.name == member.name).at_home) embed.fields[0].value += value;
        else embed.fields[1].value += value;
    }
    message.channel.send({ embed: embed });

}


module.exports = {
    name: 'who',
    aliases: [],
    run: cmd

}

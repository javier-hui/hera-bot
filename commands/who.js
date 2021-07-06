const { loadDB } = require('../utils/loadDB'),
    members = require('../global.json').members;

cmd = async (client, message, args) => {

    if (!args.length) {
        return client.commands.get('error').run(client, message);
    }

    let date = new Date();
    dinner = false, word = 0;

    if (args.includes('dinner') || args.includes('din')) { dinner = true; word++; }
    if (args.includes('tomorrow') || args.includes('tmr')) { date.setDate(date.getDate() + 1); word += 2; }

    let weekday = date.getDay();

    const query = `SELECT DISTINCT name, at_home, reason FROM meal WHERE weekday = ${weekday} AND dinner = ${dinner};`;
    console.log(`query: ${query}`);
    const res = await loadDB(query);
    if (res == undefined) return client.commands.get('errordb').run(client, message);
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
        
        let at_home = res.rows.find(e => e.name == member.name).at_home,
            reason = res.rows.find(e => e.name == member.name).reason;

        const exceptionQuery = `SELECT at_home, reason FROM meal_exception WHERE name = '${member.name}' AND date = '${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}' AND dinner = ${dinner};`;
        console.log(`query: ${exceptionQuery}`);
        const eRes = await loadDB(exceptionQuery);
        if (!(eRes == undefined || eRes.rows.length == 0)) {
            console.log(eRes.rows[0]);
            at_home = eRes.rows[0].at_home;
            reason = eRes.rows[0].reason;
        }

        let value = `${member.emoji} **${member.name}** - ${reason}\n`;
        if (at_home) embed.fields[0].value += value;
        else embed.fields[1].value += value;
    }
    message.channel.send({ embed: embed });

}


module.exports = {
    name: 'who',
    aliases: [],
    run: cmd

}

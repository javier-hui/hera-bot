const { loadDB } = require('../utils/loadDB'),
    members = require('../global.json').members;

cmd = async (client, message, args) => {
    let week = require(('../global.json')).week;

    let member = members.find(e => e.id == message.author.id);
    if (member == undefined) return client.commands.get('error').run(client, message);

    for (let m of members) {
        if (args.includes(m.name)) {
            member = m;
        }
    }

    const query = `SELECT weekday, dinner, at_home, reason FROM meal WHERE name = '${member.name}';`;
    console.log(`query: ${query}`);
    const res = await loadDB(query);
    if (res == undefined) return;
    console.log(res.rows);

    const now = new Date();

    let embed = {
        color: 0x92207b,
        title: `schedule for ${member.name} ${member.emoji}`,
        description: ``,
        timestamp: new Date()
    }


    for (const row of res.rows) {

        let date = new Date;
        date.setDate(now.getDate() + (row.weekday < now.getDay() ? row.weekday + 7 : row.weekday) - now.getDay());

        const exceptionQuery = `SELECT at_home, reason FROM meal_exception WHERE name = '${member.name}' AND date = '${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}' AND dinner = ${row.dinner};`;
        console.log(`query: ${exceptionQuery}`);
        const eRes = await loadDB(exceptionQuery);
        if (!(eRes == undefined || eRes.rows.length == 0)) {
            console.log(eRes.rows[0]);
            row.at_home = eRes.rows[0].at_home;
            row.reason = eRes.rows[0].reason;
        }

        if (row.dinner) week[row.weekday].dinner = row.reason;
        else week[row.weekday].lunch = row.reason;

        week[row.weekday].dom = date.getDate();
        week[row.weekday].month = date.getMonth() + 1;
    }
    for (let i = 0; i < now.getDay(); i++) week.push(week.shift());
    for (const item of week) {
        embed.description += `**${item.dom}/${item.month} (${item.short}):** lunch ${item.lunch} | dinner ${item.dinner}\n`
    }

    message.channel.send({ embed: embed });

}


module.exports = {
    name: 'show',
    aliases: [],
    run: cmd

}
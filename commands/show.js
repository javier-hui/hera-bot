const { loadDB } = require('../utils/loadDB'),
    members = require('../global.json').members,
    global_week = require(('../global.json')).week;

cmd = async (client, message, args) => {
    let week = [];
    for (let e of global_week) week.push(e);

    let member = members.find(e => e.id == message.author.id);
    if (member == undefined) return client.commands.get('errordb').run(client, message);

    for (let m of members) {
        if (args.includes(m.name)) {
            member = m;
        }
    }

    const query = `SELECT weekday, dinner, at_home, reason FROM meal WHERE name = '${member.name}';`;
    console.log(`query: ${query}`);
    const res = await loadDB(query);
    if (res == undefined) return client.commands.get('errordb').run(client, message);;
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
        if (eRes == undefined) client.commands.get('errordb').run(client, message);
        if (eRes.rows.length != 0) {
            console.log(eRes.rows[0]);
            row.at_home = eRes.rows[0].at_home;
            row.reason = eRes.rows[0].reason;
        }

        if (row.dinner) {
            week[row.weekday].dinner = row.at_home;
            week[row.weekday].dinner_reason = row.reason;
        }
        else {
            week[row.weekday].lunch = row.at_home;
            week[row.weekday].lunch_reason = row.reason;
        }

        week[row.weekday].dom = date.getDate();
        week[row.weekday].month = date.getMonth() + 1;
    }
    for (let i = 0; i < now.getDay(); i++) week.push(week.shift());
    for (const item of week) {
        embed.description += `**${item.dom}/${item.month} (${item.short}):\n** lunch: ${item.lunch ? `:house:` : `:person_walking:`} ${item.lunch_reason} | dinner: ${item.dinner ? `:house:` : `:person_walking:`} ${item.dinner_reason}\n`
    }

    message.channel.send({ embed: embed });

}


module.exports = {
    name: 'show',
    aliases: [],
    run: cmd

}
const { loadDB } = require('../utils/loadDB'),
    members = require('../global.json').members;
    week = require('../global.json').week;

cmd = async (client, message, args) => {

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

    let embed = {
        color: 0x92207b,
        title: `schedule for ${member.name} ${member.emoji}`,
        description: ``,
        timestamp: new Date()
    }
    
    const now = new Date();
    for (const row of res.rows) {
        if (row.dinner) week[row.weekday].dinner = row.reason;
        else week[row.weekday].lunch = row.reason;
        let newDate = new Date;
        newDate.setDate(now.getDate() + Math.abs(row.weekday - now.getDay()));
        week[row.weekday].dom = newDate.getDate();
        week[row.weekday].month = newDate.getMonth();
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
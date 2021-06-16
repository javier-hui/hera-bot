const { loadDB } = require('../utils/loadDB'),
    members = require('../config.json').members;

cmd = async (client, message, args) => {

    if (!args.length) {
        return client.commands.get('error').run(client, message);
    }

    let member = members.find(e => e.id == message.author.id);
    if (member == undefined) return;

    for (let m of members) {
        if (args.includes(m.name)) {
            member = m;
        }
    }

    const query = `SELECT weekday, dinner, at_home, reason FROM supper WHERE name = '${member.name}';`;
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

    let schedule = [{ day: 'sun' }, { day: 'mon' }, { day: 'tue' }, { day: 'wed' }, { day: 'thu' }, { day: 'fri' }, { day: 'sat' }];
    for (const row of res.rows) {
        if (row.dinner) schedule[row.weekday].dinner = row.reason;
        else schedule[row.weekday].lunch = row.reason;
    }
    for (const item of schedule) {
        embed.description += `**${item.day}:** lunch ${item.lunch} | dinner ${item.dinner}\n`
    }

    message.channel.send({ embed: embed });

}


module.exports = {
    name: 'show',
    aliases: [],
    run: cmd

}
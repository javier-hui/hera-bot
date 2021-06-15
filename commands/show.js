const { loadDB } = require('../utils/loadDB'),
    members = [
        {
            name: 'javier',
            emoji: ':person_tone1_curly_hair:'
        },
        {
            name: 'jun',
            emoji: ':adult_tone1:'
        },
        {
            name: 'kennice',
            emoji: ':woman_tone1:'
        },
        {
            name: 'dad',
            emoji: ':man_tone1:'
        },
        {
            name: 'mum',
            emoji: ':woman_curly_haired_tone1:'
        }
    ];



cmd = async (client, message, args) => {

    if (!args.length) {
        return client.commands.get('error').run(client, message);
    }

    let weekday = (new Date).getDay(), dinner = false, word = 0;

    for (let member of members) {
        if (args.includes(member.name)) {
            const query = `SELECT weekday, dinner, at_home, reason FROM supper WHERE name = ${dinner};`;
            const res = await loadDB(query);

            if (res == undefined) return;
            console.log(`query executed, ${res.rows.length} rows returned`);

            let embed = {
                color: 0x92207b,
                title: `schedule for ${member.name} ${member.emoji}`,
                description: ``,
                timestamp: new Date()
            }

            let schedule = [{day: 'sun'}, {day: 'mon'}, {day: 'tue'}, {day: 'wed'}, {day: 'thu'}, {day: 'fri'}, {day: 'sat'}];
            for (const row of res.rows) {
                if (row.dinner) schedule[row.weekday].dinner = row.reason;
                else schedule[row.weekday].lunch = row.reason;
            }
            for (const item of schedule) {
                embed.description += `**${item.day}:** lunch ${item.lunch} | dinner ${item.dinner}\n`
            }

            message.channel.send({ embed: embed });
        }
    }

}


module.exports = {
    name: 'show',
    aliases: [],
    run: cmd

}
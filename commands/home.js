const { loadDB } = require('../utils/loadDB'),
    members = require('../config.json').members;

cmd = async (client, message, args) => {

    if (!args.length) {
        return client.commands.get('error').run(client, message);
    }
    let name = members.find(e => e.id == message.author.id).name;
    let at_home = (message.command == 'home');
    let dinner = (args.shift().trim().toLowerCase() == 'dinner');
    let weekday = (args.shift().trim().toLowerCase());
    let week = [
        { long: 'sunday', short: 'sun' },
        { long: 'monday', short: 'mon' },
        { long: 'tuesday', short: 'tue' },
        { long: 'wednesday', short: 'wed' },
        { long: 'thursday', short: 'thu' },
        { long: 'friday', short: 'fri' },
        { long: 'saturday', short: 'sat' }
    ];
    for (let i = 0; i < week.length; i++)
        if (weekday == week[i].long || weekday == week[i].short) {
            weekday = i;
            break;
        }
    
    let reasonArg = /\(([^)]+)\)/.exec(args.join(' ')), reason = "at home :house:";
    if (reasonArg != null) reason = reasonArg[1];
    else if (!at_home) return message.channel.send("dude, give me a reason why u dont eat at home!");

    const query = `UPDATE meal SET at_home = ${at_home}, reason = '${reason}' WHERE name = '${name}' AND weekday = ${weekday} AND dinner = ${dinner};`;
    console.log(`query: ${query}`);
    const res = await loadDB(query);

    if (res == undefined) return;

    let embed = {
        color: 0xffff00,
        title: `updated record for ${name}`,
        description: `from now on, you have your ${dinner ? 'dinner' : 'lunch'} ${at_home ? 'at home' : 'outside'} on ${week[weekday].long}s, reason: ${reason}`,
        timestamp: new Date()
    }

    message.channel.send({ embed: embed });

}


module.exports = {
    name: 'home',
    aliases: ['no'],
    run: cmd

}

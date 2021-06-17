const { loadDB } = require('../utils/loadDB'),
    members = require('../global.json').members;

cmd = async (client, message, args) => {

    if (!args.length) {
        return client.commands.get('error').run(client, message);
    }
    const name = members.find(e => e.id == message.author.id).name,
        at_home = (message.command == 'home'),
        dinner = (args.shift().toLowerCase() == 'dinner');
    let reason = "at home :house:";


    if (args[0] == 'all') {
        args.shift();
        let weekday = (args.shift().toLowerCase());
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

        let reasonArg = /\(([^)]+)\)/.exec(args.join(' '));
        if (reasonArg != null) reason = reasonArg[1];
        else if (!at_home) return message.channel.send("dude, give me a reason why u dont eat at home!");

        const query = `UPDATE meal SET at_home = ${at_home}, reason = '${reason}' WHERE name = '${name}' AND weekday = ${weekday} AND dinner = ${dinner};`;
        console.log(`query: ${query}`);
        const res = await loadDB(query);

        if (res == undefined) return;

        let embed = {
            color: 0x00ff00,
            title: `updated record for ${name}`,
            description: `from now on, you have all your ${dinner ? 'dinner' : 'lunch'} ${at_home ? 'at home' : 'outside'} on ${week[weekday].long}s, reason: ${reason}`,
            timestamp: new Date()
        };

        message.channel.send({ embed: embed });
    }
    else {
        const [dom, month, year] = args.shift().split('/'),
            date = new Date(year || (new Date).getFullYear(), month - 1, dom);
        if (isNaN(dom) || isNaN(month) || dom <= 0 || dom > 31 || month <= 0 || month > 12) return client.commands.get('error').run(client, message);

        let reasonArg = /\(([^)]+)\)/.exec(args.join(' '));
        if (reasonArg != null) reason = reasonArg[1];
        else if (!at_home) return message.channel.send("dude, give me a reason why u dont eat at home!");

        const query = `INSERT INTO meal_exception (name, date, dinner, at_home, reason) VALUES ('${name}', '${dom}/${month}/${year || (new Date).getFullYear()}', ${dinner}, ${at_home}, '${reason}');`
        console.log(`query: ${query}`);
        const res = await loadDB(query);

        if (res == undefined) return;

        let embed = {
            color: 0x00ff00,
            title: `added a new exception record for ${name}`,
            description: `you have all your ${dinner ? 'dinner' : 'lunch'} ${at_home ? 'at home' : 'outside'} on ${dom}/${month}, reason: ${reason}`,
            timestamp: new Date()
        };

        message.channel.send({ embed: embed });
    }

}


module.exports = {
    name: 'home',
    aliases: ['no'],
    run: cmd

}
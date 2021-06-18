const { loadDB } = require('../utils/loadDB'),
    members = require('../global.json').members;

let week = require('../global.json').week;

cmd = async (client, message, args) => {

    if (!args.length) {
        return client.commands.get('error').run(client, message);
    }
    const name = members.find(e => e.id == message.author.id).name,
        at_home = (message.command == 'home'),
        dinner = (args.shift().toLowerCase() == 'dinner');
    let reason = "at home :house:";


    if (args[0] == 'all') { // updating default cases
        
        args.shift();
        let weekday = (args.shift().toLowerCase());
        for (let i = 0; i < week.length; i++)
            if (weekday == week[i].long || weekday == week[i].short) {
                weekday = i;
                break;
            }
        if (week == i) return; // typed something other than which weekday

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
    else { // add exception
        
        const [dom, month, year] = args.shift().split('/'),
            date = `${dom}/${month}/${year || (new Date).getFullYear()}`;
        if (isNaN(dom) || isNaN(month) || dom <= 0 || dom > 31 || month <= 0 || month > 12) return client.commands.get('error').run(client, message);

        let reasonArg = /\(([^)]+)\)/.exec(args.join(' '));
        if (reasonArg != null) reason = reasonArg[1];
        else if (!at_home) return message.channel.send("dude, give me a reason why u dont eat at home!");

        const prequery = `SELECT COUNT(*) FROM meal_exception WHERE name = '${name}' AND date = '${date}' AND dinner = ${dinner};`
        console.log(`prequery: ${prequery}`);
        const preres = await loadDB(prequery);
        if (preres == undefined) return message.channel.send("server error");
        if (preres.rows.count == 0) {

            const query = `INSERT INTO meal_exception (name, date, dinner, at_home, reason) VALUES ('${name}', '${date}', ${dinner}, ${at_home}, '${reason}');`
            console.log(`query: ${query}`);
            const res = await loadDB(query);
            if (res == undefined) return message.channel.send("server error");

        }
        else {

            const query = `UPDATE meal_exception SET (at_home = ${at_home}, reason = '${reason}') WHERE name = '${name}' AND date = '${date}' AND dinner = ${dinner};`
            console.log(`query: ${query}`);
            const res = await loadDB(query);
            if (res == undefined) return message.channel.send("server error");
        }

        let embed = {
            color: 0x00ff00,
            title: `added a new exception record for ${name}`,
            description: `you will have your ${dinner ? 'dinner' : 'lunch'} ${at_home ? 'at home' : 'outside'} on ${dom}/${month}, reason: ${reason}`,
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
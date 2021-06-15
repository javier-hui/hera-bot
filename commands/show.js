const Discord = require('discord.js'),

    { loadDB } = require('../utils/loadDB'),
    { Client } = require('pg'),
    dbClient = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });



cmd = async (client, message, args) => {

    if (!args.length) {
        return client.commands.get('error').run(client, message, args);
    }
    switch (args.shift()) {
        case 'lunch':
            break;
        case 'din':
        case 'dinner':
            const query = `SELECT DISTINCT name, at_home, reason FROM supper WHERE weekday = ${(new Date).getDay()} AND dinner = TRUE;`;
            const res = loadDB(query).then(console.log("waited"));
        /*
            await dbClient.connect();
            const query = `SELECT DISTINCT name, at_home, reason FROM supper WHERE weekday = ${(new Date).getDay()} AND dinner = TRUE;`,
                res = await dbClient.query(query);
            await dbClient.end();
        */
            console.log(`query executed, ${res.rows.length} rows returned`);

            const members = [
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

            
            let embed = {
                color: 0x92207b,
                title: "who's having dinner at home tonight?",

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

            break;
        default:
            return client.commands.get('error').run(client, message, args);
    }

}


module.exports = {
    name: 'show',
    aliases: ["s"],
    run: cmd

}

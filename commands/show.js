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

            dbClient.connect();
            dbClient.query("SELECT table_schema,table_name FROM information_schema.tables;", (err, res) => {
                if (err) {
                    console.log(err);
                    //throw err;
                }
                console.log(res.rows.length);
            });
            dbClient.end();
            //loadDB(dbClient, "SELECT * FROM supper");

            let time = args.shift();
            if (time == 'tonight') {
                let javier = ":person_tone1_curly_hair: **javier** - at home :house:\n",
                    jun = ":adult_tone1: **jun** - outside :red_car:\n",
                    dad = ":man_tone1: **dad** - at home :house:\n",
                    mum = ":woman_curly_haired_tone1: **mum** - at home :house:\n",
                    kennice = ":woman_tone1: **kennice** - in uk :flag_gb:\n";

                let embed = {
                    color: 0x92207b,
                    title: "who's having dinner at home tonight?",
                    //description: javier + jun + dad + mum + kennice,

                    fields: [
                        {
                            name: "at home :white_check_mark::",
                            value: javier + dad + mum,
                            inline: true
                        },
                        {
                            name: "not at home :negative_squared_cross_mark::",
                            value: jun + kennice,
                            inline: true
                        },
                    ],
                    timestamp: new Date()
                }
                message.channel.send({ embed: embed });
            }
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

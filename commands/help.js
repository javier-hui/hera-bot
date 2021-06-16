const prefix = process.env.PREFIX || (require('../config.json')).prefix;

cmd = async (client, message) => {

    let embed = {
        color: 0xff0000,
        author: {
            name: 'hera',
            icon_url: 'https://cdn.discordapp.com/avatars/854011989726199828/3a31c4e747041dc5d5ee7adc85f6fede.webp?size=128',
            url: 'https://youtu.be/dQw4w9WgXcQ',
        },
        title: "how to use me",
        description: `if u have more questions, ask javier :)`,
        fields: [
            {
                name: "hera who [lunch/dinner] [today/tonight/tomorrow]",
                value: "shows who's gonna eat at home\ne.g. `hera show dinner tonight`"
            },
            {
                name: "hera show [person] -NOT DONE-",
                value: "shows whether the person would eat at home or not for this week\ne.g. `hera show javier`"
            },
            {
                name: "hera [home/no] [lunch/dinner] [weekday] -NOT DONE-",
                value: "rewrites the rule for that weekday regularly\ne.g. `hera no dinner friday`\ne.g. `hera no dinner tonight`"
            },
            {
                name: "hera [home/no] [lunch/dinner] [dd/mm] -NOT DONE-",
                value: "sets a specific rule for that day in particular\ne.g. `hera lunch 13/2` will update your availability for lunch on 13/2\ne.g. `hera no dinner tonight` say this when you can't come home tonight"
            }
        ],
        timestamp: new Date()
    }

    message.channel.send({ embed: embed });
}


module.exports = {
    name: 'help',
    aliases: [],
    run: cmd
}
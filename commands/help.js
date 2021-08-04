const colors = require('../global.json').colors,
    prefix = process.env.PREFIX || (require('../global.json')).prefix;

cmd = async (client, message) => {

    let embed = {
        color: colors.default,
        author: {
            name: 'hera',
            icon_url: 'https://cdn.discordapp.com/avatars/854011989726199828/3a31c4e747041dc5d5ee7adc85f6fede.webp?size=128',
            url: 'https://github.com/javier-hui/hera-bot',
        },
        title: "how to use me",
        description: `this bot is made by javier, so if u have more questions, feel free to ask him :)`,
        fields: [
            {
                name: `${prefix} who \`lunch/dinner\` \`today/tonight/tomorrow\``,
                value: `shows who's gonna eat at home\ne.g. \`${prefix} who dinner tonight\``
            },
            {
                name: `${prefix} show \`person\``,
                value: `shows whether the person would eat at home or not for this week. shows yourself by default.\ne.g. \`${prefix} show javier\``
            },
            {
                name: `${prefix} \`home/no\` \`lunch/dinner\` all \`weekday\` (\`reason\`)`,
                value: `rewrites the rule for that weekday regularly, if not home then provide reason\ne.g. \`${prefix} no dinner all friday (party)\``
            },
            {
                name: `${prefix} \`home/no\` \`lunch/dinner\` \`dd/mm\` (\`reason\`)`,
                value: `sets a specific rule for that day in particular\ne.g. \`${prefix} home lunch 13/2\` will update your availability for lunch on 13/2\ne.g. \`${prefix} no dinner tonight (eat with colleagues)\` say this when you can't come home tonight`
            },
            {
                name: `${prefix} add groceries \`item\``,
                value: `adds a grocery item on the list\ne.g. \`${prefix} add groceries 1 jug of milk\``
            },
            {
                name: `${prefix} show groceries`,
                value: `shows grocery list`
            },
            {
                name: `${prefix} clear groceries`,
                value: `clears all groceries in the list`
            },
            {
                name: `${prefix} remove groceries \`index\``,
                value: `removes the grocery item with the specified index from the list\ne.g. \`${prefix} remove groceries 2\` will remove the second item on the list`
            },
            {
                name: "-------- NOT DONE --------",
                value: "don't use any command below this line"
            },
            {
                name: "hera edit groceries `index`",
                value: "allows the user to modify the grocery item with the specified index from the list\ne.g. `hera edit groceries 2` and then typing `2 jugs of milk` will change the item to that"
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
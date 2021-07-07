const colors = require('../global.json').colors,
    prefix = process.env.PREFIX || (require('../global.json')).prefix;

cmd = async (client, message) => {

    let embed = {
        color: colors.error,
        title: "what 7 u say?",
        description: `${message.author} 你好似打錯咗啲嘢喎，唔識用嘅話可以打 ${prefix} help 睇返 :innocent:`,
        image: {
            url: 'https://j.gifs.com/mqwxL0.gif'
        },
        timestamp: new Date()
    }

    message.channel.send({ embed: embed });
}


module.exports = {
    name: 'error',
    aliases: [],
    run: cmd
}
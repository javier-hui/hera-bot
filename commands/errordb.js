cmd = async (client, message) => {

    let embed = {
        color: 0xff0000,
        title: "database error",
        description: `either javier typed wrong query commands, or the database server went down. either way, javier's fault :D`,
        image: {
            url: 'https://media.giphy.com/media/1RkDDoIVs3ntm/giphy.gif'
        },
        timestamp: new Date()
    }
    console.log("database error: response undefined");

    message.channel.send({ embed: embed });
}


module.exports = {
    name: 'errordb',
    aliases: [],
    run: cmd

}

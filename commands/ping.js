cmd = async (client, message) => {
    message.channel.send("pong!");
    console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
}


module.exports = {
    name: 'ping',
    aliases: [],
    run: cmd

}

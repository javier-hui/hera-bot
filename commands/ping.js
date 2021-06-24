cmd = async (client, message) => {
    message.channel.send("pong!");
    console.log("Timezone: " + Intl.DateTimeFormat().resolvedOptions().timeZone);
    var now = new Date();
    var datetime = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' ' + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    console.log("Current timestamp: " + datetime);
}


module.exports = {
    name: 'ping',
    aliases: [],
    run: cmd
}

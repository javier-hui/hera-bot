module.exports = async(client, message) => {
	if (message.author.bot) return;

    const prefix = process.env.PREFIX || (require('../config.json')).prefix;

    // this method works if you want the prefix to be a word
    const args = message.content.split(' ');
    if (args.shift().toLowerCase() !== prefix || !args.length) return;
    message.command = args.shift();
    console.log(`command: ${message.command}, initiated by ${message.author.username}` + (args.length ? ` (args: ${args})` : ``));

    const commandfile = client.commands.get(message.command.toString().toLowerCase()) || client.commands.get(client.aliases.get(message.command.toString().toLowerCase()));
	if (commandfile) commandfile.run(client, message, args);
    else client.commands.get('error').run(client, message);

}

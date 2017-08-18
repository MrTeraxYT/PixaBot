const Discord = require('discord.js');
const client = new Discord.Client()

client.login("token")

var prefix = "px;"

client.on("message", function(message) {

    if (message.author.equals(client.user)) return;

    if (!message.content.startsWith(prefix)) return;

    var args = message.content.substring(prefix.length).split(" ");

    switch (args[0]) {
        //ping command
        case "ping":
            message.channel.send(":signal_strength: Pong!")
            break;

        case "pingtime":
            message.channel.send(":signal_strength: Pong! Response Time: " + client.ping + "ms")
            break;

	    case "developers":
            message.channel.send("Here are the developers: Rain , Kaiss, Inkydink, Yottabyte Inside")
			break;
	var version = "0.2 ";
	
        case "version":
            message.channel.send("The current version of PixaBot is " + 0.2  + " beta 1")
            break;
        case "kick":
		    message.channel.send("Coming Soon!")
			break;
		case "ban":
		    message.channel.send("Coming Soon!")
			break;
		case "help":
		    message.channel.send("coming soon!")
			break;
	    case "coming soon":
		    message.channel.send("kick: px;kick ban: px;ban and help command")
            break;
        case "CanIbeMod?":
		    message.channel.send("no but you can be jailed if you want")
            break;		

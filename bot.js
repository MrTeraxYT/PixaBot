client.login("")

var prefix = "px;"

client.on("message", function(message) {

    if (message.author.equals(client.user)) return;

    if (!message.content.startsWith(prefix)) return;

    var args = message.content.substring(prefix.length).split(" ");

    switch (args[0]) {
        //ping command
        case "ping":
             const embed = new Discord.RichEmbed()
           	.setColor("#940000")
           	.setTitle(":ping_pong: Pong!", "Response time: " + client.ping + "ms")
           	.setFooter("Requested by " + message.author.tag, message.author.displayAvatarURL)
           	.setTimestamp()
            message.channel.send({embed});
            break;
        // about command
        case "about":
            const embed = new Discord.RichEmbed()
	        .setColor("#940000")
            .setTitle("About PixaBot", "PixaBot is a Discord bot that features games, image manipulation, moderation and music commands written in JavaScript.")
           	.setFooter("Requested by " + message.author.tag, message.author.displayAvatarURL)
           	.setTimestamp()
            message.channel.send({embed});
            break;
        // version command
        case "version":
            message.channel.send("The current version of PixaBot is " + 0.2  + " beta 1")
            break;
        // kick command
        case "kick":
		    message.channel.send("Coming Soon!")
			break;
        // ban command
		case "ban":
		    message.channel.send("Coming Soon!")
			break;
		case "help":
            const embed = new Discord.RichEmbed()
	        .setColor("#940000")
            .setTitle("PixaBot Help Guide", "Here are my available commands. To execute one of my commands, my prefix is "px;"."")
            .addField("General Commands", "Coming soon!")
            .setFooter("Requested by " + message.author.tag, message.author.displayAvatarURL)
           	.setTimestamp()
            message.channel.send({embed});
			break;
	    case "coming soon":
		    message.channel.send("kick: px;kick ban: px;ban and help command")
            break;
        case "CanIbeMod?":
		    message.channel.send("no but you can be jailed if you want (from kaiss)")
            break;		
}
})

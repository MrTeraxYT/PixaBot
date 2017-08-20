const Discord = require("discord.js");
const client = new Discord.Client();

// Get authentication data
try {
	var AuthDetails = require("./auth.json");
} catch (e){
	console.log("Please create an auth.json like auth.json.example with a bot token or an email and password.\n"+e.stack);
	process.exit();
}

if(AuthDetails.bot_token){
	client.login(AuthDetails.bot_token);
    var bot_token = AuthDetails.bot_token;
}

if(AuthDetails.owner_id){
	var owner_id = AuthDetails.owner_id
} else {
	console.log("No owner id set in auth.json!");
}

if(AuthDetails.prefix){
	var prefix = AuthDetails.prefix
} else {
	console.log("No prefix set in auth.json!");
}

var version = "v0.2 Beta 1"

client.on("ready", () => {
    client.fetchUser(owner_id)
    var owner = client.users.get(owner_id);  
	console.log("\n===============================\n")
	console.log(`PIXABOT`) 
    console.log(`Logged in as ${client.user.username}`);
    console.log("The bot is ready! Currently on:");
    console.log(client.guilds.size + " servers");
    console.log(client.channels.size + " channels");
    console.log("Current prefix: " + prefix);
    console.log("Owner: " + owner.username + "#" + owner.discriminator);
	console.log("\n===============================\n")
});

client.on("guildCreate", guild => {
	console.log(`New guild joined ${guild.name}`);
});

client.on("guildDelete", guild => {
	  console.log(`I have been removed from ${guild.name}`);
});

client.on("disconnected", function () {
	  console.log("The bot is now shut down.");
	  process.exit(1);
});

client.on("message", function(message) {

    if (message.author.equals(client.user)) return;

    if (!message.content.startsWith(prefix)) return;

    var args = message.content.substring(prefix.length).split(" ");   
    var haveMatched=true;    
 
    switch (args[0]) {
        //ping command
        case "ping":
            var m = message.channel.send(":hourglass: *Testing connectivity…*").then(m => {                 
            var embed = new Discord.RichEmbed()
           	.setColor("#940000")
           	.setAuthor("Pong!", "https://cdn.discordapp.com/attachments/347288279357456387/348647441815306241/ping.png")
	     	.setDescription(`Response time: ${m.createdTimestamp - message.createdTimestamp}ms`)  
           	.setFooter("Requested by " + message.author.tag, message.author.displayAvatarURL)
           	.setTimestamp() 
            m.delete()
            message.channel.send({embed})
            });
            break;
        // about command
        case "about":
            var embed = new Discord.RichEmbed()
	        .setColor("#940000")
            	.setAuthor("About PixaBot", "https://cdn.discordapp.com/attachments/347288279357456387/348643671002054657/about.png")
		.setDescription("PixaBot is a Discord bot that features games, image manipulation, moderation and music commands written in JavaScript.")
           	.setFooter("Requested by " + message.author.tag, message.author.displayAvatarURL)
           	.setTimestamp()
            message.channel.send({embed});
            break;
        // version command
        case "version":
            var embed = new Discord.RichEmbed()
	        .setColor("#940000")
            	.setAuthor("Version", "https://cdn.discordapp.com/attachments/347288279357456387/348642213582077953/ver.png")
		.setDescription("The current version is " + ver + ".")
           	.setFooter("Requested by " + message.author.tag, message.author.displayAvatarURL)
           	.setTimestamp()
            message.channel.send({embed});
            break;
        // kick command
        case "kick":
		    message.channel.send("Coming Soon!")
		break;
        // ban command
        case "ban":
            message.channel.send("Coming Soon!")
            break;
	// shutdown command
        case "shutdown":
            if (message.author.id != owner_id) {
                return;
            } else {
                var embed = new Discord.RichEmbed()
                .setColor("#940000")
                    .setAuthor("Shuting down…", "https://cdn.discordapp.com/attachments/347288279357456387/348594144790183937/power.png")
		    .setDescription("Please wait while the bot system is currently shutting down.")
                    .setFooter("Requested by " + message.author.tag, message.author.displayAvatarURL)
                    .setTimestamp()
                message.channel.send({embed});
                client.destroy((err) => {
                        console.log(err);
                    });
                console.log("The bot is now shut down.");
                setTimeout(function(){
                    process.exit(0);  
                }, 2000)
            }
            break;
                //exit node.js without an error
	// help command
        case "help":
                var embed = new Discord.RichEmbed()
                .setColor("#940000")
                .setAuthor("PixaBot Help Guide", "https://cdn.discordapp.com/attachments/347288279357456387/348643679373754369/help.png")
		.setDescription("Here are my available commands. To execute one of my commands, my prefix is `px;`.")
                .addField("General Commands", "`ping` - Test a connection to PixaBot.\n`about` - Information about PixaBot.\n`version` - Displays the PixaBot's current version.", true)
		.addField("Easter Eggs", "`canibeamod` - Are you applying for a mod?", true) 
		.addField("Coming Soon", "`kick` - Kicks a member.\n`ban` - Bans the user out of this server.", true)
		.addField("Owner", "`shutdown` - De-initialize the bot.", true)
                .setFooter("Requested by " + message.author.tag, message.author.displayAvatarURL)
                .setTimestamp()
                message.channel.send({embed});
            break;
        case "canibeamod":
            message.channel.send("No, but you can be jailed if you want.")
            break;
        default:
            haveMatched = false
	    message.channel.send("Unknown command.")
}
if (haveMatched){
    console.log(`[Command] ${message.author.id}/${message.author.username} (${message.content})`)
}
})

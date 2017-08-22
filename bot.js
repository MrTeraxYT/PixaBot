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

var version = "v0.2"

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
    console.log("Owner: " + owner.tag);
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
			.setThumbnail("https://media.discordapp.net/attachments/347288279357456387/348940216242929664/Untitled.jpg")
           	.setFooter("Requested by " + message.author.tag, message.author.displayAvatarURL)
           	.setTimestamp()
            message.channel.send({embed});
            break;
            
        // version command
        case "version":
            var embed = new Discord.RichEmbed()
	        .setColor("#940000")
            .setAuthor("Version", "https://cdn.discordapp.com/attachments/347288279357456387/348642213582077953/ver.png")
            .setDescription("The current version is " + version + ".")
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
                .setAuthor("Shutting down…", "https://cdn.discordapp.com/attachments/347288279357456387/348594144790183937/power.png")
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
            .setDescription("Here are my available commands. To execute one of my commands, my prefix is `px;`.".replace('px;', prefix))
            .addField("General Commands", "`about` - Information about PixaBot.\n`ping` - Test a connection to PixaBot.\n`version` - Displays the PixaBot's current version.", true)
            .addField("Fun Commands", "`8ball` - Ask a question to a bot, and what does the bot say…?\n`piko` - Shows the picture of Piko Kugihara, an anime original character serves as a mascot of PixaBot.\n`say` - Say something as a bot!")
            .addField("Moderation Commands", "`ban` - Bans the user out of this server.\n`kick` - Kicks a member.", true)
            .setFooter("Requested by " + message.author.tag, message.author.displayAvatarURL)
            .setTimestamp()                
            if (message.author.id == owner_id) {    
                embed.addField("Commands for the Bot Owner", "`shutdown` - De-initialize the bot.", true)
            }
            message.channel.send({embed});
            break;
            
		// say command
	    case "say":
			try {
                    if(message.content.length < prefix.length + 4) {
                        message.channel.send("Come on, say something!")
                        break
                    } else { 
							message.channel.send(message.content.replace(prefix + "say ", ''));
					message.delete();
							}
					} catch(err) {
						message.channel.send(error)
					}
            break;

        // 8ball command    
        case "8ball":
			if(message.content.length < prefix.length + 6) {
                message.channel.send("Go ahead, ask it anything.")
                break
            } else {        
                var choices = ["Yes.", "No.", "Maybe.", "It could be true."]
                var rand = choices[Math.floor(Math.random() * choices.length)];                    
                message.channel.send(rand)  
                break
            }
        
        // piko command
		case "piko":
            var embed = new Discord.RichEmbed()
				.setColor("#940000")
				.setAuthor("Piko-chan!", "https://cdn.discordapp.com/attachments/347288279357456387/349276625575346179/dm.png")
				.setDescription("Sent you a DM for the mascot!")
				.setFooter("Requested by " + message.author.tag, message.author.displayAvatarURL)
				.setTimestamp()                
		    message.reply({embed});
            message.author.send("Here's the mascot, Piko, an anime OC made by Yottabyte Inside, also known as Jigs.", { files: [ 'https://cdn.discordapp.com/attachments/347282801021943811/348985242385907714/pixa_by_exjageroo-dbka7oa.png' ] });
            break;
        // command that is invalid.
        default:
            haveMatched = false
            var embed = new Discord.RichEmbed()
				.setColor("#940000")
				.setAuthor("Unknown Command", "https://cdn.discordapp.com/attachments/347288279357456387/349278178499493888/unknowncmd.png")
				.setTitle("The specified command that you are trying to execute is invalid.")
				.setDescription("Use `px;help` to view my available comands.".replace('px;', prefix))
            message.channel.send({embed})
}
	//eval command
	case "eval":
	let args = msg.content.split(' ')
        let variable = args.shift()
	if (message.author.id != owner_id && message.author.id != AuthDetails.rain && message.author.id != AuthDetails.yottabyte && message.author.id != AuthDetails.terax) return;
	const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
var guild = msg.guild
    try {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
	  message.delete()
	  if (!code) return msg.author.send("Eval failed! Please use Arguments!");
	  const embed = new Discord.RichEmbed()
	  .setTitle("Eval")
	  .setTimestamp()
	  .setColor("#01DF01")
	  .setAuthor(msg.author.username, msg.author.displayAvatarURL)
	  .addField("Input 📥", args.join(' '))
	  .addField("Output 📤", "```x1\n" + clean(evaled) + "```")
      message.channel.send({embed});
	  console.log("========================================================================================\nEVAL RESULTS\nINPUT:\n" + args.join(' ') + "\nOUTPUT:\n" + clean(evaled) + "\n========================================================================================\n");
    } catch (err) {
	message.delete()
	  const embed = new Discord.RichEmbed()
	  .setTitle("Eval")
	  .setTimestamp()
	  .setColor("#DF0101")
	  .setAuthor(msg.author.username, msg.author.displayAvatarURL)
	  .setDescription("ERROR")
	  .addField("Input 📥", args.join(' '))
	  .addField("Output 📤", "```x1\n" + clean(err) + "```")
      msg.author.send({embed});
      console.log("========================================================================================\nEVAL RESULTS\nERROR\n\nINPUT:\n" + args.join(' ') + "\nOUTPUT:\n" + clean(err) + "\n========================================================================================\n");
    }
  }
if (haveMatched){
    console.log(`[Command] ${message.author.id}/${message.author.username} (${message.content})`)
}
})

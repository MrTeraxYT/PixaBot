const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const loghook =  new Discord.WebhookClient("353279893511077898", "token")

client.login(config.token)

var prefix = config.prefix;
var ver = config.version;

// Bot's playing or streaming status
function setGame() {
	var presence = {};
	presence.game = {};
	presence.afk = false;

	switch (Math.floor(Math.random() * 1000) % 2) {
		case 0:
			presence.game.name = "px;help for help".replace('px;', prefix);
			break;
		case 1:
			presence.game.name = "developed by Rain";
			break;
		case 2:
			presence.game.name = "Piko-chan~ <3"
		}
	client.user.setPresence(presence);
}
// bot login
client.on('ready', () => {
loghook.edit("Command Log", client.user.displayAvatarURL)
    console.log("[STATUS] PixaBot");
console.log("\n",
"=======================================\n",
"               BOT LOGIN\n",
"=======================================\n",
"Username           | " + client.user.tag + "\n",
"User ID            | " + client.user.id + "\n",
"Owner              | " + client.users.get(config.owner).tag + "\n",
"Co-Owner           | " + client.users.get(config.coowner).tag + "\n",
"Prefix             | " + prefix + "\n",
"Total Guilds       | " + client.guilds.size + "\n",
"Total Channels     | " + client.channels.size + "\n",
"Total Users        | " + client.users.size + "\n",
"Help Command       | " + prefix + "help" + "\n",
"Version            | " + config.version + "\n",
"=======================================\n");
	client.setInterval(setGame, 200000);
    setGame();
const embed = new Discord.RichEmbed()
.setTimestamp()
.setTitle("=== Login ===")
.addField("Username", client.user.tag)
.addField("User ID", client.user.id)
.addField("Owner", client.users.get(config.owner) + "\nName: " + client.users.get(config.owner).tag + "\nID: " + client.users.get(config.owner).id)
.addField("Co-Owner", client.users.get(config.coowner) + "\nName: " + client.users.get(config.coowner).tag + "\nID: " + client.users.get(config.coowner).id)
.addField("Prefix", prefix)
.addField("Total Guilds", client.guilds.size)
.addField("Total Channels", client.channels.size)
.addField("Total Users", client.users.size)
.addField("Help Command", prefix + "help")
.addField("Version", config.version)
.setThumbnail(client.user.displayAvatarURL)
loghook.send({ embeds: [embed] })
   });
client.on("message", function(message){
var msg = message;
//shutdown command
	if(message.content === prefix + "shutdown")
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

	//help command
	if(message.content === prefix + "help") {
		var embed = new Discord.RichEmbed()
			.setColor("#940000")
			.setAuthor("Help", "https://cdn.discordapp.com/attachments/347288279357456387/349276625575346179/dm.png")
			.setDescription("Sent you a DM for the list of your available commands.")
			.setFooter("Requested by " + message.author.tag, message.author.displayAvatarURL)
			.setTimestamp()                
		message.channel.send({embed});
        var embed = new Discord.RichEmbed()
			.setColor("#940000")
			.setAuthor(client.user.username + " Help Guide", "https://cdn.discordapp.com/attachments/347288279357456387/348643679373754369/help.png")
            .setDescription("Here are my available commands. To execute one of my commands, my prefix is `px;`.\n\n**Parameters:**\n< > - Required\n[ ] - Optional".replace('px;', prefix))
            .addField("General Commands", "`about` - Information about " + client.user.username + ".\n`avatar [mention]` - Fetches a user avatar. If not specified, the user will fetch his/her own avatar.\n`help` - Displays the " + client.user.username + "'s Help Guide, which is *this* one.\n`ping` - Test a connection to PixaBot.\n`userinfo [mention]` - Displays the user's information. If not specified, it will display his/her own user information.\n`version` / `ver` - Displays the " + client.user.username + "'s current version.", true)
            .addField("Fun Commands", "`8ball <question>` - Ask a question to a bot, and what does the bot say…?\n`piko` - Shows the picture of Piko Kugihara, an anime original character serves as a mascot of " + client.user.username + ".\n`say <message>` - Say something as a bot!", true)
			.addField("Music Commands", "`play` - Plays a music.\n`skip` - Skips the current song.\n`stop` - Stops the music and disconnects from the voice channel.\n`vol` - controls the volume", true)
            .addField("Moderation Commands", "`ban <mention> <reason>` - Bans the user out of this server.\n`kick <mention> <reason>` - Kicks a member.", true)
            .setFooter("Requested by " + message.author.tag, message.author.displayAvatarURL)
            .setTimestamp()                
            if (message.author.id == owner) {    
                embed.addField("Commands for the Bot Owner", "`shutdown` - De-initialize the bot.", true)
            }
            message.channel.send({embed});
		
		// logging help
		var logembed = new Discord.RichEmbed()
			.setColor("#940000")
			.setAuthor(message.author.username, message.author.displayAvatarURL)
			.setTitle("Command was used")
			.setDescription(prefix + "help")
			.addField("Author", message.author.tag + " (" + message.author.id + ")")
			.addField("Guild", message.guild + " (" + message.guild.id + ")")
			.addField("Channel", "#" + message.channel.name + " (" + message.channel.id + ")")
			.setThumbnail("https://cdn.discordapp.com/attachments/347288279357456387/348643679373754369/help.png")
			.setTimestamp()
			loghook.send({ embeds: [logembed] })
	}
	//ping command
	if(message.content === prefix + "ping") 
            var m = message.channel.send(":hourglass: *Testing connectivity…*").then(m => {                 
            var embed = new Discord.RichEmbed()
           	.setColor("#940000")
           	.setAuthor("Pong!", "https://cdn.discordapp.com/attachments/347288279357456387/348647441815306241/ping.png")
			.setDescription("**Current Ping Results**")
	     	.addField("Latency: ", `${m.createdTimestamp - message.createdTimestamp}` + "ms")
			.addField("API Latency: ", `${Math.round(client.ping)}` + "ms")
           	.setFooter("Requested by " + message.author.tag, message.author.displayAvatarURL)
           	.setTimestamp() 
            m.delete()
            message.channel.send({embed});
		// logging ping	
		var logembed = new Discord.RichEmbed()
			.setColor("#940000")
			.setAuthor(message.author.username, message.author.displayAvatarURL)
			.setTitle("Command was used")
			.setDescription(prefix + "ping")
			.addField("Author", message.author.tag + " (" + message.author.id + ")")
			.addField("Guild", message.guild + " (" + message.guild.id + ")")
			.addField("Channel", "#" + message.channel.name + " (" + message.channel.id + ")")
			.setTimestamp()
		loghook.send({ embeds: [logembed] })
	
	// version command
	if(message.content === prefix + "ver" || message.content === prefix + "version") {
        var embed = new Discord.RichEmbed()
	        .setColor("#940000")
            .setAuthor("Version", "https://cdn.discordapp.com/attachments/347288279357456387/348642213582077953/ver.png")
            .setDescription("The current version is " + ver + ".")
           	.setFooter("Requested by " + message.author.tag, message.author.displayAvatarURL)
           	.setTimestamp()
            message.channel.send({embed});
		// logging version
		var logembed = new Discord.RichEmbed()
		.setColor("#940000")
		.setAuthor(message.author.username, message.author.displayAvatarURL)
		.setTitle("Command was used")
		.setDescription(prefix + "version")
		.addField("Author", message.author.tag + " (" + message.author.id + ")")
		.addField("Guild", message.guild + " (" + message.guild.id + ")")
		.addField("Channel", "#" + message.channel.name + " (" + message.channel.id + ")")
		.setTimestamp()
		loghook.send({ embeds: [logembed] })
	}
	//about command
	if (message.content === prefix + "about") {
		var embed = new Discord.RichEmbed()
		.setAuthor("About " + client.user.username, "https://cdn.discordapp.com/attachments/347288279357456387/348643671002054657/about.png")
		.setDescription("I'm " + client.user.username + ", a Discord Bot developed by " + client.users.get(config.owner).tag + " and " + client.users.get(config.coowner).tag)
		.addField("My Features", "Currently, I don't have much Features! Check out my Commands with `px;help`.".replace('px;', prefix))
		.addField("Links", "[Discord](https://discord.gg/mQ85U7m)\n[GitHub](https://github.com/Heyimkaiss/PixaBot/)")
        .setFooter("Requested by " + message.author.tag, message.author.displayAvatarURL)
		.setThumbnail(client.user.displayAvatarURL)
        .setTimestamp()
		message.channel.send({embed});
		// logging about
		var logembed = new Discord.RichEmbed()
		.setAuthor(message.author.username, message.author.displayAvatarURL)
		.setColor("#940000")
		.setTitle("Command was used")
		.setDescription(prefix + "about")
		.addField("Author", message.author.tag + " (" + message.author.id + ")")
		.addField("Guild", message.guild + " (" + message.guild.id + ")")
		.addField("Channel", "#" + message.channel.name + " (" + message.channel.id + ")")
		.setTimestamp()
		loghook.send({ embeds: [logembed] })
	}
    let args = message.content.split(' ')
    let variable = args.shift()
	//say command
	if (message.content === prefix + "say") {
	if (!args.join(' ')) return;
	message.delete()
	message.channel.send(args.join(' '))
	//logging say
	var logembed = new Discord.RichEmbed()
		.setColor("#940000")
		.setAuthor(message.author.username, message.author.displayAvatarURL)
		.setTitle("Command was used")
		.setDescription(prefix + "say " + args.join(' '))
		.addField("Author", message.author.tag + " (" + message.author.id + ")")
		.addField("Guild", message.guild + " (" + message.guild.id + ")")
		.addField("Channel", "#" + message.channel.name + " (" + message.channel.id + ")")
		.setTimestamp()
		loghook.send({ embeds: [logembed] })
	}
	//embedsay command
	if (message.content === prefix + "embedsay") {
    if (!args.join(' ')) return;
	var embed = new Discord.RichEmbed()
		.setColor("#940000")
		.setAuthor("Say", "https://cdn.discordapp.com/attachments/347288279357456387/349327056284286976/embedsay.png")
		.setDescription(args.join(' '))
	message.delete()
	message.channel.send({embed})
	//logging embedsay
	var logembed = new Discord.RichEmbed()
		.setAuthor(message.author.username, message.author.displayAvatarURL)
		.setTitle("Command was used")
		.setColor("#940000")
		.setDescription(prefix + "embedsay " + args.join(' '))
		.addField("Author", message.author.tag + " (" + message.author.id + ")")
		.addField("Guild", message.guild + " (" + message.guild.id + ")")
		.addField("Channel", "#" + message.channel.name + " (" + message.channel.id + ")")
		.setTimestamp()
		loghook.send({ embeds: [logembed] })
	}
	//8ball command
	if (message.content === prefix + "8ball") {
		if(message.content.length < prefix.length + 6) {
                message.channel.send("Go ahead, ask me anything.")
            } else {        
                var choices = ["Yes.", "No.", "Maybe.", "It could be true.", "I guess so.", "Tell your doctor to find out.", "No, I'm not!", "I don't like you!"]
                var rand = choices[Math.floor(Math.random() * choices.length)];                    
                message.reply(rand)
            }
		}
		//logging 8ball
		var logembed = new Discord.RichEmbed()
		.setAuthor(message.author.username, message.author.displayAvatarURL)
		.setTitle("Command was used")
		.setColor("#940000")
		.setDescription(prefix + "8ball " + args.join(' '))
		.addField("Author", message.author.tag + " (" + message.author.id + ")")
		.addField("Guild", message.guild + " (" + message.guild.id + ")")
		.addField("Channel", "#" + message.channel.name + " (" + message.channel.id + ")")
		.setTimestamp()
		loghook.send({ embeds: [logembed] })
	});
	
	//invite command
	if (message.content === prefix + "invite") {
		client.generateInvite(['ADMINISTRATOR', 'SEND_MESSAGES', 'MANAGE_GUILD', 'MANAGE_ROLES', 'MANAGE_CHANNELS', 'KICK_MEMBERS', 'READ_MESSAGES', 'BAN_MEMBERS', 'SEND_MESSAGES'])
		.then(link => {
			var embed = new Discord.RichEmbed()
				.setAuthor("Invite", "https://cdn.discordapp.com/attachments/347288279357456387/353230595192651777/pxinvite.png")
				.setColor("#940000")
				.setDescription("Here is a invite, you can add me to own servers already by clicking the link below.")
				.addField("Bot Invite", `[Click here!](${link})`)
				.setFooter("Requested by " + message.author.tag, message.author.displayAvatarURL)
				.setTimestamp
				message.channel.send({embed});
			});
	//logging invite
	var logembed = new Discord.RichEmbed()
		.setAuthor(message.author.username, message.author.displayAvatarURL)
		.setTitle("Command was used")
		.setColor("#940000")
		.setDescription(prefix + "invite " + args.join(' '))
		.addField("Author", message.author.tag + " (" + message.author.id + ")")
		.addField("Guild", message.guild + " (" + message.guild.id + ")")
		.addField("Channel", "#" + message.channel.name + " (" + message.channel.id + ")")
		.setTimestamp()
		loghook.send({ embeds: [logembed] })
	}

	//userinfo command
	if (message.content === prefix + "userinfo") {
    if (!msg.guild) return msg.channel.send(":x: *This command is not avaible in DMs.*");
    if (message.mentions.users.first()) {
    const mentionmembers = message.mentions.members.first()
    const mentionusers = message.mentions.users.first()
				var embed = new Discord.RichEmbed()
					embed.setColor("#940000")
					embed.setAuthor("User Information – " + mentionusers.username, "https://cdn.discordapp.com/attachments/347288279357456387/349664562510823425/uinfo.png")
					embed.addField("Nickname", mentionmembers.displayName, true)
					embed.addField("Discriminator ID", mentionusers.discriminator, true)
					embed.addField("User ID", mentionmembers.id, true)
					embed.addField("Current Status", mentionmembers.presence.status)
					embed.addField("Join Discord on", mentionusers.createdAt.toUTCString())
					embed.addField("Sever Joined on", mentionmembers.joinedAt.toUTCString())
					if(mentionmembers.voiceChannel) {
                            embed.addField("Current Voice Channel", mentionmembers.voiceChannel.name)
					}
					embed.addField("Roles", mentionmembers.roles.map(r=> " " + r.name).join(', '))
					embed.setThumbnail(mentionusers.displayAvatarURL)
					embed.setFooter("Requested by " + message.author.tag, message.author.displayAvatarURL)
					embed.setTimestamp()
				message.channel.send({embed})
    } else {
    var embed = new Discord.RichEmbed()
				var embed = new Discord.RichEmbed()
					embed.setColor("#940000")	
					embed.setAuthor("User Information – " + message.author.username, "https://cdn.discordapp.com/attachments/347288279357456387/349664562510823425/uinfo.png")
					embed.addField("Nickname", message.member.displayName, true)
					embed.addField("Discriminator ID", message.author.discriminator, true)
					embed.addField("User ID", message.author.id, true)
					embed.addField("Current Status", message.author.presence.status)
					embed.addField("Joined Discord on", message.member.user.createdAt.toUTCString())
					embed.addField("Server Joined on", message.member.joinedAt.toUTCString())
					if (message.member.voiceChannel) {
						embed.addField("Current Voice Channel", message.member.voiceChannel.name)
					}
					embed.addField("Roles", message.member.roles.map(r=> " " + r.name).join(', '))
					embed.setThumbnail(message.author.displayAvatarURL)
					embed.setFooter("Requested by " + message.author.tag, message.author.displayAvatarURL)
					embed.setTimestamp()
				message.channel.send({embed})
    }
	//logging userinfo
	var logembed = new Discord.RichEmbed()
		.setAuthor(message.author.username, message.author.displayAvatarURL)
		.setTitle("Command was used")
		.setColor("#940000")
		.setDescription(prefix + "userinfo " + args.join(' '))
		.addField("Author", message.author.tag + " (" + message.author.id + ")")
		.addField("Guild", message.guild + " (" + message.guild.id + ")")
		.addField("Channel", "#" + message.channel.name + " (" + message.channel.id + ")")
		.setTimestamp()
		loghook.send({ embeds: [logembed] })
}
	//avatar command
	if (message.content === prefix + "avatar") {
		if (!msg.guild) return msg.channel.send(":x: *This command is not avaible in DMs.*");
		if (message.mentions.users.first()) {
			var mentionmembers = message.mentions.members.first()
			var mentionusers = message.mentions.users.first()
			var embed = new Discord.RichEmbed()
				embed.setColor("#940000")
				embed.setAuthor("Avatar", "https://cdn.discordapp.com/attachments/347288279357456387/351084610500689940/pxavatar.png")
				embed.setDescription(mentionusers.username + "'s current avatar")
				embed.setImage(mentionusers.displayAvatarURL)
				embed.setFooter("Requested by " + message.author.tag, message.author.displayAvatarURL)
				embed.setTimestamp()
				message.channel.send({embed})
			} else {
			var embed = new Discord.RichEmbed()
				embed.setColor("#940000")
				embed.setAuthor("Avatar", "https://cdn.discordapp.com/attachments/347288279357456387/351084610500689940/pxavatar.png")
				embed.setDescription("Your current avatar")
				embed.setImage(message.author.displayAvatarURL)
				embed.setFooter("Requested by " + message.author.tag, message.author.displayAvatarURL)
				embed.setTimestamp()
			message.channel.send({embed})
		}
	//logging avatar
	var logembed = new Discord.RichEmbed()
		.setAuthor(message.author.username, message.author.displayAvatarURL)
		.setTitle("Command was used")
		.setColor("#940000")
		.setDescription(prefix + "avatar " + args.join(' '))
		.addField("Author", message.author.tag + " (" + message.author.id + ")")
		.addField("Guild", message.guild + " (" + message.guild.id + ")")
		.addField("Channel", "#" + message.channel.name + " (" + message.channel.id + ")")
		.setTimestamp()
		loghook.send({ embeds: [logembed] })
}
	
//Eval
function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
   if (message.content.startsWith(prefix + "eval")) {
   var bot = client
    var guild = msg.guild
    if(message.author.id !== config.owner && message.author.id !== config.coowner) return;
    try {
      const code = args.join(" ");
      let evaled = eval(code);
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
	  message.delete()
	  if (!code) return msg.author.send(":warning: *Eval failed. Please use the specified arguments!*");
	  const embed = new Discord.RichEmbed()
	  .setAuthor("Eval Results", "https://cdn.discordapp.com/attachments/347288279357456387/349554608068362243/eval.png")
	  .setFooter("Requested by " + message.author.tag, message.author.displayAvatarURL)
	  .setTimestamp()
	  .setColor("#940000")
	  .addField("📥 Input", args.join(' '))
	  .addField("📤 Output", "```x1\n" + clean(evaled) + "```")
      message.channel.send({embed});
	  console.log("========================================================================================\nEVAL RESULTS\nINPUT:\n" + args.join(' ') + "\nOUTPUT:\n" + clean(evaled) + "\n========================================================================================\n");
    } catch (err) {
	message.delete()
	  const embed = new Discord.RichEmbed()
	  .setAuthor("Eval Results", "https://cdn.discordapp.com/attachments/347288279357456387/349554608068362243/eval.png")
	  .setTimestamp()
	  .setFooter("Requested by " + message.author.tag, message.author.displayAvatarURL)
	  .setColor("#940000")
	  .setDescription("ERROR")
	  .addField("📥 Input", args.join(' '))
	  .addField("📤 Output", "```x1\n" + clean(err) + "```")
      msg.author.send({embed});
      console.log("========================================================================================\nEVAL RESULTS\nERROR\n\nINPUT:\n" + args.join(' ') + "\nOUTPUT:\n" + clean(err) + "\n========================================================================================\n");
    }
  }
   if (message.content.startsWith(prefix + "consoleval")) {
    if(message.author.id !== config.owner && message.author.id !== config.coowner) return;
    try {
      const code = args.join(" ");
      let evaled = eval(code);
	  message.delete()
	  if (!code) return msg.author.send("Console Eval failed! Please use Arguments!")
      if (typeof evaled !== "string")
		evaled = require("util").inspect(evaled);
	  msg.author.send("Alright! Check your console!")
	  console.log("========================================================================================\nEVAL RESULTS\nINPUT:\n" + args.join(' ') + "\nOUTPUT:\n" + clean(evaled) + "\n========================================================================================\n");
    } catch (err) {
	  message.delete()
	  var embed = new Discord.RichEmbed()
	  .setTitle("Eval Failed")
	  .setTimestamp()
	  .setColor("#DF0101")
	  .setAuthor(msg.author.username, msg.author.displayAvatarURL)
	  .addField("📥 Input", args.join(' '))
	  .addField("📤 Output", "```x1\n" + clean(err) + "```")
	  msg.author.send({embed})
      console.log("========================================================================================\nEVAL RESULTS\nERROR\n\nINPUT:\n" + args.join(' ') + "\nOUTPUT:\n" + clean(err) + "\n========================================================================================\n");
    }
      }  //End of Eval
});

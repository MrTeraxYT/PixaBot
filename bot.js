const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();

// Bot user status
function setGame() {
    var games = [
        `${config.prefix} for help`,
        "developed by Rain",
        "Piko-chan~ <3"
    ]

    client.user.setPresence({
        status: 'online',
        afk: false,
        game: {
            type: 0,
            name: games[Math.floor(Math.random() * games.length)]
        }
    })
}

client.login(config.token);

// Bot ready
client.on("ready", () => {
    console.log(`=======================================\n`,
                `             PixaBot ${config.version}\n`,
                `=======================================\n`,
                `Username       | ${client.user.tag}\n`,
                `User ID        | ${client.user.id}\n`,
                `Owner          | ${client.users.get(config.owner).tag}\n`,
                `Co-Owner       | ${client.users.get(config.coowner).tag}\n`,
                `Prefix         | ${config.prefix}\n`,
                `Total Guilds   | ${client.guilds.size}\n`,
                `Total Channels | ${client.channels.size}\n`,
                `Total Users    | ${client.users.size}\n`,
                `=======================================\n`);
    
    setGame();
    client.setInterval(setGame, 200000);
});

client.on("message", function(message) {
    var msg = message;

    // Ping Command
    if (message.content === `${config.prefix}ping`) {
        var m = message.channel.send(":hourglass: *Testing connectivity…*").then(m => {                 
            var embed = new Discord.RichEmbed()
                .setAuthor("Pong!", "https://cdn.discordapp.com/attachments/347288279357456387/348647441815306241/ping.png")
                .setDescription("**Current Ping Results**")
                .addField("Latency:", `${m.createdTimestamp - message.createdTimestamp}ms`, true)
                .addField("API Latency:", `${Math.round(client.ping)}ms`, true)
                .setColor("#940000")
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL)
                .setTimestamp()
            message.channel.send({embed});

            m.delete();
        })
    }

    // Help Command
    if (message.content === `${config.prefix}help`) {
        // This sends alongside with the actual help
        // var embed = new Discord.RichEmbed()
        //     .setAuthor("Help", "https://cdn.discordapp.com/attachments/347288279357456387/349276625575346179/dm.png")
        //     .setDescription("Sent you a DM for the list of your available commands.")
        //     .setColor("#940000")
        //     .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL)
        //     .setTimestamp()
        // message.channel.send({embed});

        var embed = new Discord.RichEmbed()
            .setAuthor(`${client.user.username} Help Guide`, "https://cdn.discordapp.com/attachments/347288279357456387/348643679373754369/help.png")
            .setDescription("Here are my available commands. To execute one of my commands, my prefix is `" + config.prefix + "`.\n\n**Parameters:**\n< > - Required\n[ ] - Optional")
            .addField("General Commands", "`about` - Information about " + client.user.username + ".\n`avatar [mention]` - Fetches a user avatar. If not specified, the user will fetch his/her own avatar.\n`help` - Displays the " + client.user.username + "'s Help Guide, which is *this* one.\n`ping` - Test a connection to PixaBot.\n`userinfo [mention]` - Displays the user's information. If not specified, it will display his/her own user information.\n`version` / `ver` - Displays the " + client.user.username + "'s current version.")
            .addField("Fun Commands", "`8ball <question>` - Ask a question to a bot, and what does the bot say…?\n`piko` - Shows the picture of Piko Kugihara, an anime original character serves as a mascot of " + client.user.username + ".\n`say <message>` - Say something as a bot!")
            .addField("Music Commands", "`play` - Plays a music.\n`skip` - Skips the current song.\n`stop` - Stops the music and disconnects from the voice channel.\n`vol` - controls the volume")
            .addField("Moderation Commands", "`ban <mention> <reason>` - Bans the user out of this server.\n`kick <mention> <reason>` - Kicks a member.")
            .setColor("#940000")
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL)
            .setTimestamp()                
            if (message.author.id == config.owner) {    
                embed.addField("Commands for the Bot Owner", "`shutdown` - De-initialize the bot.")
            }
        message.channel.send({embed});
    }

    // About Command
    if (message.content === `${config.prefix}about`) {
        var embed = new Discord.RichEmbed()
            .setAuthor(`About ${client.user.username}`, "https://cdn.discordapp.com/attachments/347288279357456387/348643671002054657/about.png")
            .setDescription(`I'm ${client.user.username}, a Discord Bot developed by ${client.users.get(config.owner).tag} and ${client.users.get(config.coowner).tag}`)
            .addField("My Features", "Currently, I don't have much Features! Check out my Commands with `" + config.prefix + "help`.")
            .addField("Links", "[Discord Server](https://discord.gg/mQ85U7m)\n[GitHub Repository](https://github.com/Heyimkaiss/PixaBot/)")
            .setColor("#940000")
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL)
            .setThumbnail(client.user.displayAvatarURL)
            .setTimestamp()
		message.channel.send({embed});
    }

    // Version Command
    if (message.content === `${config.prefix}ver` || message.content === `${config.prefix}version`) {
        var embed = new Discord.RichEmbed()
            .setAuthor("Version", "https://cdn.discordapp.com/attachments/347288279357456387/348642213582077953/ver.png")
            .setDescription(`The current version is ${config.version}.`)
            .setColor("#940000")
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL)
            .setTimestamp()
        message.channel.send({embed});
    }

    // Shutdown Command
    if (message.content === `${config.prefix}shutdown`) {
        if (message.author.id != config.owner) return;
        
        var embed = new Discord.RichEmbed()
            .setAuthor("Shutting down…", "https://cdn.discordapp.com/attachments/347288279357456387/348594144790183937/power.png")
            .setDescription("Please wait while the bot system is currently shutting down.")
            .setColor("#940000")
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL)
            .setTimestamp()
        message.channel.send({embed});

        client.destroy((err) => {
            console.log(err);
        })

        setTimeout(function() {
            console.log("Bot successfully shut downed");
            process.exit(0);
        }, 2000)
    } 

    // Say Command - Not working
    // if (message.content === `${config.prefix}say`) {
    //     if (!args.join(' ')) return;
    //     message.delete()
    //     message.channel.send(args.join(' '))    
    // }

    // Say (Embed) Command - Not working
    // if (message.content === `${config.prefix}embedsay`) {
    //     if (!args.join(' ')) return;
    //
    //     var embed = new Discord.RichEmbed()
	// 	       .setAuthor("Say", "https://cdn.discordapp.com/attachments/347288279357456387/349327056284286976/embedsay.png")
    //         .setDescription(args.join(' '))
    //         .setColor("#940000")
    //     message.delete();
    //     message.channel.send({embed});
    // }

    // Magic 8-Ball Command - Not working
    // if (message.content === `${config.prefix}8ball`) {
    //     if (message.content.length < prefix.length + 6) {
    //         message.channel.send("Go ahead, ask me anything.");
    //     } else {        
    //         var choices = [
    //             "Yes.",
    //             "No.",
    //             "Maybe.",
    //             "It could be true.",
    //             "I guess so.",
    //             "Tell your doctor to find out.",
    //             "No, I'm not!",
    //             "I don't like you!"
    //         ]
    //
    //         var rand = choices[Math.floor(Math.random() * choices.length)];                    
    //         message.reply(rand);
    //     }
    // }

    // Generate Invite Command
    if (message.content === `${config.prefix}invite`) {
        client.generateInvite(['ADMINISTRATOR']).then(link => {
			var embed = new Discord.RichEmbed()
				.setAuthor("Invite", "https://cdn.discordapp.com/attachments/347288279357456387/353230595192651777/pxinvite.png")
				.setDescription("Here is a invite, you can add me to own servers already by clicking the link below.")
				.addField("Bot Invite", `[Click here!](${link})`)
                .setColor("#940000")
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL)
			    .setTimestamp()
			message.channel.send({embed});
		})
    }

    // User Info Command
    if (message.content === `${config.prefix}userinfo`) {
        if (!msg.guild) return msg.channel.send(":x: *This command is not avaible in DMs.*");
        
        // Not working
        // if (message.mentions.users.first()) {
        //     const mentionmembers = message.mentions.members.first()
        //     const mentionusers = message.mentions.users.first()
        //     var embed = new Discord.RichEmbed()
        //         embed.setColor("#940000")
        //         embed.setAuthor("User Information – " + mentionusers.username, "https://cdn.discordapp.com/attachments/347288279357456387/349664562510823425/uinfo.png")
        //         embed.addField("Nickname", mentionmembers.displayName, true)
        //         embed.addField("Discriminator ID", mentionusers.discriminator, true)
        //         embed.addField("User ID", mentionmembers.id, true)
        //         embed.addField("Current Status", mentionmembers.presence.status)
        //         embed.addField("Join Discord on", mentionusers.createdAt.toUTCString())
        //         embed.addField("Sever Joined on", mentionmembers.joinedAt.toUTCString())
        //         if(mentionmembers.voiceChannel) {
        //             embed.addField("Current Voice Channel", mentionmembers.voiceChannel.name)
        //         }
        //         embed.addField("Roles", mentionmembers.roles.map(r=> " " + r.name).join(', '))
        //         embed.setThumbnail(mentionusers.displayAvatarURL)
        //         embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL)
        //         embed.setTimestamp()
        //     message.channel.send({embed})
        // } else {
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
                embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL)
                embed.setTimestamp()
            message.channel.send({embed})
        //}
    }

    // Avatar Command
    if (message.content === `${config.prefix}avatar`) {
	    if (!msg.guild) return msg.channel.send(":x: *This command is not avaible in DMs.*");
        
        // Not Working
        // if (message.mentions.users.first()) {
		// 	var mentionmembers = message.mentions.members.first()
		// 	var mentionusers = message.mentions.users.first()
		// 	var embed = new Discord.RichEmbed()
		// 		.setAuthor("Avatar", "https://cdn.discordapp.com/attachments/347288279357456387/351084610500689940/pxavatar.png")
		// 		.setDescription(`${mentionusers.username}'s current avatar`)
        //         .setImage(mentionusers.displayAvatarURL)
        //         .setColor("#940000")
		// 		.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL)
		// 		.setTimestamp()
		// 	message.channel.send({embed})
		// } else {
            var embed = new Discord.RichEmbed()
                .setAuthor("Avatar", "https://cdn.discordapp.com/attachments/347288279357456387/351084610500689940/pxavatar.png")
                .setDescription("Your current avatar")
                .setImage(message.author.displayAvatarURL)
                .setColor("#940000")
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL)
                .setTimestamp()
            message.channel.send({embed})
        //}
    }

    //Evaluate Command - Not Working
    // function clean(text) {
    //     if (typeof(text) === "string") {
    //         return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    //     } else { 
    //         return text;
    //     }
    // }
    // 
    // if (message.content === `${config.prefix}eval`) {
    //     var bot = client
    //     var guild = msg.guild
    //    
    //     if(message.author.id !== config.owner && message.author.id !== config.coowner) return;
    //    
    //     try {
    //         const code = args.join(" ");
    //         let evaled = eval(code);
    //        
    //         if (typeof evaled !== "string")
    //         evaled = require("util").inspect(evaled);
    //         message.delete()
    //         if (!code) return msg.author.send(":warning: *Eval failed. Please use the specified arguments!*");
    //        
    //         var embed = new Discord.RichEmbed()
    //             .setAuthor("Eval Results", "https://cdn.discordapp.com/attachments/347288279357456387/349554608068362243/eval.png")
    //             .addField("📥 Input", args.join(' '))
    //             .addField("📤 Output", "```x1\n" + clean(evaled) + "```")
    //             .setColor("#940000")
    //             .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL)
    //             .setTimestamp()
    //         message.channel.send({embed});
    //        
    //         console.log("========================================================================================\nEVAL RESULTS\nINPUT:\n" + args.join(' ') + "\nOUTPUT:\n" + clean(evaled) + "\n========================================================================================\n");
    //     } catch (err) {
    //         var embed = new Discord.RichEmbed()
    //             .setAuthor("Eval Results", "https://cdn.discordapp.com/attachments/347288279357456387/349554608068362243/eval.png")
    //             .setDescription("ERROR")
    //             .addField("📥 Input", args.join(' '))
    //             .addField("📤 Output", "```x1\n" + clean(err) + "```")
    //             .setColor("#940000")
    //             .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL)
    //             .setTimestamp()
    //         message.delete()
    //         msg.author.send({embed});
    //         console.log("========================================================================================\nEVAL RESULTS\nERROR\n\nINPUT:\n" + args.join(' ') + "\nOUTPUT:\n" + clean(err) + "\n========================================================================================\n");
    //     }
    // }
    //
    // if (message.content === `${config.prefix}consoleeval`) {
    //     if (message.author.id !== config.owner && message.author.id !== config.coowner) return;
    //      
    //     try {
    //         const code = args.join(" ");
    //         let evaled = eval(code);
    //        
    //         message.delete()
    //         if (!code) return msg.author.send("Console Eval failed! Please use Arguments!")
    //         if (typeof evaled !== "string")
    //         evaled = require("util").inspect(evaled);
    //         msg.author.send("Alright! Check your console!")
    //         console.log("========================================================================================\nEVAL RESULTS\nINPUT:\n" + args.join(' ') + "\nOUTPUT:\n" + clean(evaled) + "\n========================================================================================\n");
    //     } catch (err) {
    //         var embed = new Discord.RichEmbed()
    //             .setTitle("Eval Failed")
    //            
    //             .setColor("#DF0101")
    //             .setAuthor(msg.author.username, msg.author.displayAvatarURL)
    //             .addField("📥 Input", args.join(' '))
    //             .addField("📤 Output", "```x1\n" + clean(err) + "```")
    //             .setTimestamp()
    //         msg.author.send({embed})
    //         message.delete()
    //         console.log("========================================================================================\nEVAL RESULTS\nERROR\n\nINPUT:\n" + args.join(' ') + "\nOUTPUT:\n" + clean(err) + "\n========================================================================================\n");
    //       }
    // }
});
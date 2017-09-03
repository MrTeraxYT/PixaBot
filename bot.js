const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const config = require("./config.json");
const client = new Discord.Client();

// Bot user status
function setGame() {
    var games = [
        `${config.prefix}help | ${client.guilds.size} servers operating`,
        `Developed by ${client.users.get(config.owner).username} & ${client.users.get(config.coowner).username}`,
        "Piko-chan~ <3",
        "Piiiiiiko…! T_T",
        "Booya!",
        "Arigatou-gozaimasu!",
        "有難う御座います",
        `at ${config.version}`,
        "Paint 3D",
        "with my Sceptile",
        "against NotSoBot",
        "against Ayana",
        "against Dyno",
        "against Miki",
        "against ErisBot",
        "to PWN Dad Bot"
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

// Music Function
function play(connection, message) {
    var server = servers[message.guild.id];  
    
    server.dispatcher = connection.playStream(ytdl(server.queue[0], {
        filter: "audioonly",
        quality: "lowest"
    }));

    ytdl.getInfo(server.queue[0], function(err, info) {
        message.channel.send(`**Now Playing:** ${info.title}`)
    });
    
    
    server.queue.shift();
    
    server.dispatcher.on("end", function() {
        if (server.queue[0]) {
            play(connection, message);
        } else {
            try {
                connection.disconnect();
            } catch(err) {

            }
        }
    })
}

var servers = {};

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
})

client.on("message", function(message) {
    if (message.author.equals(client.user)) return;
    if (!message.content.startsWith(config.prefix)) return;

    var args = message.content.substring(config.prefix.length).split(" ");

    switch (args[0].toLowerCase()) {
        case "ping":
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
            break;

        case "say":
            if (message.content.length < config.prefix.length + 4) {
                message.channel.send("Come on, say something!");
            } else { 
                message.channel.send(message.content.replace(config.prefix + "say ", ''));
                message.delete();
            }
            break;

        case "embedsay":
            if (message.content.length < config.prefix.length + 9) {
                message.channel.send("Come on, say something!");
            } else { 
                var embed = new Discord.RichEmbed()
                .setAuthor("Say", "https://cdn.discordapp.com/attachments/347288279357456387/349327056284286976/embedsay.png")
                .setDescription(message.content.replace(config.prefix + "embedsay ", ''))
                .setColor("#940000")
            message.delete();
            message.channel.send({embed});
            }
            break;

        case "8ball":
            if (message.content.length < config.prefix.length + 6) {
                message.channel.send("Go ahead, ask me anything.");
            } else {        
                var choices = [
                    "Yes.",
                    "No.",
                    "Maybe.",
                    "It could be true.",
                    "I guess so.",
                    "Tell your doctor to find out.",
                    "No, I'm not!",
                    "I don't like you!"
                ]
        
                var rand = choices[Math.floor(Math.random() * choices.length)];                    
                message.reply(rand);
            }
            break;
        
        case "piko":
            var embed = new Discord.RichEmbed()
                .setAuthor("Piko-chan!", "https://cdn.discordapp.com/attachments/347288279357456387/349276625575346179/dm.png")
                .setDescription("Sent you a DM for the mascot!")
                .setThumbnail("https://cdn.discordapp.com/attachments/347288279357456387/353604944395370508/pxpiko.png")
                .setColor("#940000")
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL)
                .setTimestamp()                
            message.channel.send({embed});
    
            var embed = new Discord.RichEmbed()    
                .setAuthor(`${client.user.username}'s Mascot`, "https://cdn.discordapp.com/attachments/347288279357456387/353604944395370508/pxpiko.png")
                .setDescription("Here's the mascot, Piko Kugihara (釘原 飛鼓), an anime OC made by EcoTech™, also known as Jigs.")
                .addField("Further Information", `*[Deviation page from DeviantArt](https://exjageroo.deviantart.com/art/Piko-Kugihara-699196762)*`)
                .setImage("https://orig13.deviantart.net/ce10/f/2017/228/5/3/pixa_by_exjageroo-dbka7oa.png")
                .setColor("#940000")
                .setTimestamp()                
            message.author.send({embed});
            break;
        
        case "play":
            if (!message.member.voiceChannel) return message.channel.send("You must be in a voice channel");    
            if (!args[1]) return message.channel.send("Can't find any music?");
            if (!servers[message.guild.id]) {
                servers[message.guild.id] = {
                    queue: []
                };
            }

            var server = servers[message.guild.id]; 
            server.queue.push(args[1]);

            if (!message.guild.voiceConnection) {
                message.member.voiceChannel.join().then(function(connection) {
                    play(connection, message);
                })
            }
            break;

        case "skip":
            var server = servers[message.guild.id];
            if (server.dispatcher) server.dispatcher.end();
            break;

        case "stop":
            var server = servers[message.guild.id];

            try {
                if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
            } catch (err) {
                
            }
            break;

        case "avatar":
            if (message.channel.type === "dm") return message.channel.send(":x: *This command is not avaible in DMs.*");
            if (message.mentions.users.first()) {
            	var mentionmembers = message.mentions.members.first()
            	var mentionusers = message.mentions.users.first()
            	var embed = new Discord.RichEmbed()
            		.setAuthor("Avatar", "https://cdn.discordapp.com/attachments/347288279357456387/351084610500689940/pxavatar.png")
            		.setDescription(`${mentionusers.username}'s current avatar`)
                    .setImage(mentionusers.displayAvatarURL)
                    .setColor("#940000")
            		.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL)
            		.setTimestamp()
            	message.channel.send({embed})
            } else {
                var embed = new Discord.RichEmbed()
                    .setAuthor("Avatar", "https://cdn.discordapp.com/attachments/347288279357456387/351084610500689940/pxavatar.png")
                    .setDescription("Your current avatar")
                    .setImage(message.author.displayAvatarURL)
                    .setColor("#940000")
                    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL)
                    .setTimestamp()
                message.channel.send({embed})
            }
            break;

        case "invite":
            client.generateInvite(['ADMINISTRATOR']).then(link => {
                var embed = new Discord.RichEmbed()
                    .setAuthor("Invite", "https://cdn.discordapp.com/attachments/347288279357456387/353230595192651777/pxinvite.png")
                    .setDescription("Here is an invite, you can add me to own servers already by clicking the link below.")
                    .addField("Bot Invite", `[Click here!](${link})`)
                    .setColor("#940000")
                    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL)
                    .setTimestamp()
                message.channel.send({embed});
            })
            break;
        
        case "uinfo":
        case "userinfo":
            if (message.channel.type === "dm") return message.channel.send(":x: *This command is not avaible in DMs.*");
            if (message.mentions.users.first()) {
                const mentionmembers = message.mentions.members.first()
                const mentionusers = message.mentions.users.first()
                var embed = new Discord.RichEmbed()
                    .setAuthor(`User Information – ${mentionusers.username}`, "https://cdn.discordapp.com/attachments/347288279357456387/349664562510823425/uinfo.png")
                    .addField("Nickname", mentionmembers.displayName, true)
                    .addField("Discriminator ID", mentionusers.discriminator, true)
                    .addField("User ID", mentionmembers.id, true)
                    .addField("Current Status", mentionmembers.presence.status)
                    .addField("Join Discord on", mentionusers.createdAt.toUTCString())
                    .addField("Sever Joined on", mentionmembers.joinedAt.toUTCString())
                    .addField("Roles", mentionmembers.roles.map(r=> " " + r.name).join(', '))
                    .setThumbnail(mentionusers.displayAvatarURL)
                    .setColor("#940000")
                    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL)
                    .setTimestamp()
                    if(mentionmembers.voiceChannel) {
                        embed.addField("Current Voice Channel", mentionmembers.voiceChannel.name)
                    }
                message.channel.send({embed})
            } else {
                var embed = new Discord.RichEmbed()
                    .setAuthor(`User Information – ${message.author.username}`, "https://cdn.discordapp.com/attachments/347288279357456387/349664562510823425/uinfo.png")
                    .addField("Nickname", message.member.displayName, true)
                    .addField("Discriminator ID", message.author.discriminator, true)
                    .addField("User ID", message.author.id, true)
                    .addField("Current Status", message.author.presence.status)
                    .addField("Joined Discord on", message.member.user.createdAt.toUTCString())
                    .addField("Server Joined on", message.member.joinedAt.toUTCString())
                    .addField("Roles", message.member.roles.map(r=> " " + r.name).join(', '))
                    .setThumbnail(message.author.displayAvatarURL)
                    .setColor("#940000")	
                    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL)
                    .setTimestamp()
                    if (message.member.voiceChannel) {
                        embed.addField("Current Voice Channel", message.member.voiceChannel.name)
                    }
                message.channel.send({embed})
            }
            break;

        case "help":
            var embed = new Discord.RichEmbed()
                .setAuthor("Help", "https://cdn.discordapp.com/attachments/347288279357456387/349276625575346179/dm.png")
                .setDescription("Sent you a DM for the list of your available commands.")
                .setThumbnail("https://cdn.discordapp.com/attachments/347288279357456387/348643679373754369/help.png")
                .setColor("#940000")
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL)
                .setTimestamp()
            message.channel.send({embed});

            var embed = new Discord.RichEmbed()
                .setAuthor(`${client.user.username} Help Guide`, "https://cdn.discordapp.com/attachments/347288279357456387/348643679373754369/help.png")
                .setDescription("Here are my available commands. To execute one of my commands, my prefix is `" + config.prefix + "`.\n\n**Parameters:**\n< > - Required\n[ ] - Optional")
                .addField("General Commands", "`about` - Information about " + client.user.username + ".\n`avatar [mention]` - Fetches the user's avatar. If not specified, the user will fetch his/her own avatar.\n`help` - Displays " + client.user.username + "'s Help Guide, which is *this* one.\n`invite` - Sends an invite link to add me into a server that you own or moderate.\n`ping` - Checks the response time of " + client.user.username + ".\n`userinfo`/`uinfo [mention]` - Displays the user's information. If not specified, it will display his/her own user information.\n`version`/`ver` - Shows you the current version of " + client.user.username + ".")
                .addField("Fun Commands", "`8ball <question>` - Ask a question, and I'll reply. *wink*\n`piko` - Shows a picture of Piko Kugihara, an anime original character that serves as a mascot of " + client.user.username + ".\n`say <message>` - Say something as a bot!\n`embedsay <message>` - Same as say but on an embed!")
                .addField("Music Commands", "`play <video link/id>` - Plays a music.\n`skip` - Skips the current song.\n`stop` - Stops the music and disconnects from the voice channel.")
                //.addField("Moderation Commands", "`ban <mention> <reason>` - Bans the user out of this server.\n`kick <mention> <reason>` - Kicks a member.")
                .setColor("#940000")
                .setTimestamp()                
                if (message.author.id == config.owner) {    
                    embed.addField("Commands for the Bot Owner", "`shutdown` - Shuts down " + client.username + ".")
                }
            message.author.send({embed});
            break;

        case "about":
            var embed = new Discord.RichEmbed()
                .setAuthor(`About ${client.user.username}`, "https://cdn.discordapp.com/attachments/347288279357456387/348643671002054657/about.png")
                .setDescription(`I'm ${client.user.username}, a Discord Bot developed by ${client.users.get(config.owner).tag} and ${client.users.get(config.coowner).tag}`)
                .addField("My Features", "Currently, I don't have much Features! Check out my Commands with `" + config.prefix + "help`.")
                .addField("Links", "[Discord Server](https://discord.gg/mQ85U7m)\n[GitHub Repository](https://github.com/Heyimkaiss/PixaBot/)")
                .setThumbnail(client.user.displayAvatarURL)
                .setColor("#940000")
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL)
                .setTimestamp()
            message.channel.send({embed});
            break;

        case "ver":
        case "version":
            var embed = new Discord.RichEmbed()
                .setAuthor("Version", "https://cdn.discordapp.com/attachments/347288279357456387/348642213582077953/ver.png")
                .setDescription(`The current version is ${config.version}.`)
                .setColor("#940000")
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL)
                .setTimestamp()
            message.channel.send({embed});
            break;
        
        case "shutdown":
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
                console.log("Bot successfully shut downed.");
                process.exit(0);
            }, 2000)
            break;

        // case "eval":
        //     function clean(text) {
        //         if (typeof(text) === "string") {
        //             return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        //         } else { 
        //             return text;
        //         }
        //     }
        //
        //     if (message.content === `${config.prefix}eval`) {
        //         var bot = client
        //         var guild = msg.guild
        //    
        //         if(message.author.id !== config.owner && message.author.id !== config.coowner) return;
        //    
        //         try {
        //             const code = args.join(" ");
        //             let evaled = eval(code);
        //        
        //             if (typeof evaled !== "string")
        //             evaled = require("util").inspect(evaled);
        //             message.delete()
        //             if (!code) return msg.author.send(":warning: *Eval failed. Please use the specified arguments!*");
        //        
        //             var embed = new Discord.RichEmbed()
        //                 .setAuthor("Eval Results", "https://cdn.discordapp.com/attachments/347288279357456387/349554608068362243/eval.png")
        //                 .addField("📥 Input", args.join(' '))
        //                 .addField("📤 Output", "```x1\n" + clean(evaled) + "```")
        //                 .setColor("#940000")
        //                 .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL)
        //                 .setTimestamp()
        //             message.channel.send({embed});
        //        
        //             console.log("========================================================================================\nEVAL RESULTS\nINPUT:\n" + args.join(' ') + "\nOUTPUT:\n" + clean(evaled) + "\n========================================================================================\n");
        //         } catch (err) {
        //             var embed = new Discord.RichEmbed()
        //                 .setAuthor("Eval Results", "https://cdn.discordapp.com/attachments/347288279357456387/349554608068362243/eval.png")
        //                 .setDescription("ERROR")
        //                 .addField("📥 Input", args.join(' '))
        //                 .addField("📤 Output", "```x1\n" + clean(err) + "```")
        //                 .setColor("#940000")
        //                 .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL)
        //                 .setTimestamp()
        //             message.delete()
        //             msg.author.send({embed});
        //             console.log("========================================================================================\nEVAL RESULTS\nERROR\n\nINPUT:\n" + args.join(' ') + "\nOUTPUT:\n" + clean(err) + "\n========================================================================================\n");
        //         }
        //     }
        //    
        //     if (message.content === `${config.prefix}consoleeval`) {
        //         if (message.author.id !== config.owner && message.author.id !== config.coowner) return;
        //        
        //         try {
        //             const code = args.join(" ");
        //             let evaled = eval(code);
        //        
        //             message.delete()
        //             if (!code) return msg.author.send("Console Eval failed! Please use Arguments!")
        //             if (typeof evaled !== "string")
        //             evaled = require("util").inspect(evaled);
        //             msg.author.send("Alright! Check your console!")
        //             console.log("========================================================================================\nEVAL RESULTS\nINPUT:\n" + args.join(' ') + "\nOUTPUT:\n" + clean(evaled) + "\n========================================================================================\n");
        //         } catch (err) {
        //             var embed = new Discord.RichEmbed()
        //                 .setTitle("Eval Failed")
        //            
        //                 .setColor("#DF0101")
        //                 .setAuthor(msg.author.username, msg.author.displayAvatarURL)
        //                 .addField("📥 Input", args.join(' '))
        //                 .addField("📤 Output", "```x1\n" + clean(err) + "```")
        //                 .setTimestamp()
        //             msg.author.send({embed})
        //             message.delete()
        //             console.log("========================================================================================\nEVAL RESULTS\nERROR\n\nINPUT:\n" + args.join(' ') + "\nOUTPUT:\n" + clean(err) + "\n========================================================================================\n");
        //         }
        //     }
        //     break;
    }
})
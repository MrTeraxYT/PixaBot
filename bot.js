const Discord = require("discord.js");
const client = new Discord.Client();

const owner_id = "" //put your ID here. HOW TO GET AN ID : http://i.imgur.com/GhKpBMQ.gif
client.login("") //put your bot token here, Not "secret".  The secret is not the token.


var prefix = "px;"
var version = "v0.2 Beta 1"

client.on("ready", () => {

ascii = "\n==============================="
ascii +=  "\n  _____ _           ____        _   "
ascii += "\n |  __ (_)         |  _ \\      | |  "
ascii += "\n | |__) |__  ____ _| |_) | ___ | |_ "
ascii += "\n |  ___/ \\ \\/ / _` |  _ < / _ \\| __|"
ascii += "\n | |   | |>  < (_| | |_) | (_) | |_ "
ascii += "\n |_|   |_/_/\\_\\__,_|____/ \\___/ \\__|"
ascii += "\n\n===============================\n"                                    
                                    
                                  
                                    
console.log(ascii); 
console.log(`Logged in as ${client.user.username}`);
console.log("Ready to begin! Currently on :");
console.log(client.guilds.size + " servers");
console.log(client.channels.size + " channels")
console.log("\n===============================\n")
});

client.on("guildCreate", guild => {
  console.log(`New guild joined ${guild.name}`);
});

client.on("guildDelete", guild => {
  console.log(`I have been removed from ${guild.name}`);
});

client.on("disconnected", function () {
  console.log("Disconnected!");
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
            var m = message.channel.send("Ping...").then(m => {                 
            var embed = new Discord.RichEmbed()
           	.setColor("#940000")
           	.setAuthor("Pong!", "https://image.noelshack.com/fichiers/2017/33/6/1503111758-371886a66446c46e66e9435158468720.png")
	     	.setDescription(`Response time : ${m.createdTimestamp - message.createdTimestamp}ms`)  
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
        case "shutdown":
            if (message.author.id != owner_id) {
                return;
            } else {
                var embed = new Discord.RichEmbed()
                .setColor("#940000")
                    .setTitle("Shuting down...", "Please wait.")
                    .setFooter("Requested by " + message.author.tag, message.author.displayAvatarURL)
                    .setTimestamp()
                message.channel.send({embed});
                client.destroy((err) => {
                        console.log(err);
                    });
                console.log("Disconnected via shutdown!");
                setTimeout(function(){
                    process.exit(0);  
                }, 2000)
            }
            break;
                //exit node.js without an error                      
        case "help":
                var embed = new Discord.RichEmbed()
                .setColor("#940000")
                .setTitle("PixaBot Help Guide", "Here are my available commands. To execute one of my commands, my prefix is `px;`.")
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
        default:
            haveMatched = false             
}
if (haveMatched){
    console.log(`[Command] ${message.author.id}/${message.author.username} (${message.content})`)
}
})
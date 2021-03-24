const Discord = require("discord.js");
const client = new Discord.Client({ ws: { intents: new Discord.Intents(Discord.Intents.ALL) }});
const config = require("./config.json");

Array.prototype.remove = function(x){
    return this.filter(function(v){
        return v !== x;
    });
};

client.on("message", async message =>  {
    if(message.author.bot) return; 
    if(!message.guild) return;
    if(!message.content.startsWith(config.prefix)) return;
    var fullmsg = message.content.split(" ")
    var command = fullmsg[0].replace(config.prefix, "");
    var args = fullmsg.remove(fullmsg[0]);
    comandos = ["help", "configs", "bienvenida"];
    if(!command) return;
    if(command) try{await message.delete();} catch (e) {}
    if (command === "ayuda" || command === "help") {
      const embed = new Discord.MessageEmbed()
      .setAuthor(client.user.tag, client.user.displayAvatarURL({format: "png", dynamic: true}))
      .setDescription(`${config.prefix}${comandos.join(`\n${config.prefix}`)}`)
      .setColor("RANDOM")
      .setFooter(message.author.tag)
      .setTimestamp()
      message.channel.send(embed)
    } else if(command === "hola"){
      message.channel.send("Hola, como estas?")
    } else {
      message.reply(new Discord.MessageEmbed()
      .setDescription(`El comando \`${command}\` no lo tengo registrado`)
      .setColor("RANDOM")
      .setTimestamp())
    }
})

client.login(config.token)

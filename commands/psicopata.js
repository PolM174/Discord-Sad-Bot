module.exports = {
    ayuda: `Te dice como es esa persona.`,
    ejemplo: "psicopata @User#0001",
    permiso : "Ninguno",

    run: async (client, message, args) => {
  const Discord = require("discord.js");
  const Weez = require('weez');
  const weez = new Weez.WeezAPI((process.env.API));
  const sqlite3 = require("better-sqlite3");
  const db = new sqlite3('./sadbot.sqlite3');



let usuario = message.mentions.members.first();

const embednotexto = new Discord.MessageEmbed() 
embednotexto.setColor("ORANGE")
embednotexto.setDescription("⚠️ || Menciona a un usuario.")

if(!usuario) return message.channel.send(embednotexto);
let img = await weez.psicopata(usuario.user.displayAvatarURL({ format: "png"}))

var color = db.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
if(!color || color.colorembed == null) {
  var cembed = "#7289D9";
}else{
  var cembed = color.colorembed;
};

const embed = new Discord.MessageEmbed() 
.setColor(cembed)
.attachFiles([{
  attachment: img,
  name: "psicopata.png"
}])
.setImage("attachment://psicopata.png")

return message.channel.send(embed);
}};
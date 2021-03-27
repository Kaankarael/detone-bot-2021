const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    
     let botping = new Date() - message.createdAt;

    let pingembed = new Discord.RichEmbed()
        .setImage("https://cdn.discordapp.com/attachments/741406417172430959/776833618731073566/indir.gif")  
        .setColor("RANDOM")
        .addField(' Botun Pingi ', Math.floor(botping) + 'ping')
        .setFooter(`Detone`);

  return message.channel.send(pingembed);
      

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ping',
  description: 'Botun pingini gösterir.',
  usage: 'ping'
};
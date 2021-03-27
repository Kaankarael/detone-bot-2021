const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
        
        .setTitle(`${client.user.username} Davet Menüsü `)
        .setDescription(`**==================================**
<a:aquamanmaviloading:758033310680219783> **|** **Botun Davet Linki İçin** [TIKLA](https://discord.com/api/oauth2/authorize?client_id=765974008780292106&permissions=8&scope=bot) \n<a:aquamanharaket:727779084343705651> **|** **Destek Sunucusu İçin** [TIKLA](https://discord.gg/VJ8ThFTZPa) \n<a:aquamanharaket:738065255183286381> **|** **Web Sitemizi Ziyaret Etmek İçin** __**(Çok Yakında)**__   \n<a:aquamanloading:728771820781568002> **|** **Moderasyon Botunu Davet Linki İçin** [TIKLA](https://discord.com/api/oauth2/authorize?client_id=771770212981932054&permissions=8&scope=bot) 
:flag_tr: **Yapımıcısı:<@756030608601251893>**
**==================================**`)

        .setThumbnail(client.user.avatarURL)
        .setFooter(`${message.author.username} Başarıyla ${ayarlar.prefix} Davet Sistemi Kullandı`, message.author.avatarURL)
    .setColor(`RANDOM`)
    return message.channel.sendEmbed(embed);
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
};

exports.help = {
  name: 'davet',
  description: '',
  usage: 'davet'
};
//Lord Creative
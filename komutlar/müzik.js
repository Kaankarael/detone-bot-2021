const Discord = require('discord.js');
exports.run = async (client, message, args) => { 
let prefix = '+'
let yardım = new Discord.RichEmbed()  
.setAuthor(`${client.user.username}`, client.user.avatarURL)
.setColor('RANDOM')
.addField('Detone | Müzik Menüsü',`
<a:aquamanharaket:758359203684417579> **|** __**+çal**__ **: Müzik Dinlersiniz**
<a:aquamanharaket:758359203684417579> **|** __**+ses**__ **: Müziğin Sesin Ayarlarsınız**
<a:aquamanharaket:758359203684417579> **|** __**+geç**__ **: Sıradaki Şarkıya Geçersiniz**
<a:aquamanharaket:758359203684417579> **|** __**+çalan**__ **: Özel Eklenti Komutlarını Açar**
<a:aquamanharaket:758359203684417579> **|** __**+duraklat**__ **: Şarkıyı Durdurdurursunuz**
<a:aquamanharaket:758359203684417579> **|** __**+devam**__ **: Şarkıyı Devem Ettirirsiniz**
<a:aquamanharaket:758359203684417579> **|** __**+sıra**__ **: Kuyruğu Görürsünüz**
<a:aquamanharaket:758359203684417579> **|** __**+ayrıl**__ **: Bot Odadan Ayrılır**
<a:aquamanharaket:758359203684417579> **|** __**+istatislik | +i**__ **: Botun istatisliklerini gösterir**
<a:aquamanharaket:758359203684417579> **|** __**+ping**__ **: Botun pingini gösterir**
<a:aquamanharaket:758359203684417579> **|** __**+davet**__ **: Davet Linklerini Görürsünüz**`)
.setFooter(`${message.author.tag} Tarafından İstendi.`, message.author.avatarURL)
.addField('Detone Bot',`[Botu Davet Et](https://discord.com/api/oauth2/authorize?client_id=765974008780292106&permissions=8&scope=bot) **|** [Destek Sunucumuz](https://discord.gg/VJ8ThFTZPa)`)
.setImage(`http://3.bp.blogspot.com/-8gMyGNFEdoE/USwSieK6tbI/AAAAAAAABXU/pjG_1M4fRFg/s1600/SimoneAni322-preview.gif`)
.setThumbnail(client.user.avatarURL)
 message.channel.send(yardım) 
  };
exports.conf = {
  enabled: true,    
  guildOnly: false, 
  aliases: ["help","music","y"], 
  permLevel: 0
};
exports.help = {
  name: 'yardım'
}; 
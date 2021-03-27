  const Discord = require("discord.js");
const moment = require("moment");
const os = require('os');
require("moment-duration-format");
exports.run = async (bot, message, args) => {
  const duration = moment.duration(bot.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
 
  let msg = message
   const bunemq = moment.duration(bot.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
   const annencilermaldır = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setFooter('Detone \'Buyur Benim İstatistiklerim', bot.user.avatarURL)
   
  .addField("<a:Uyar:758033475923083274> __**Botun Sahibi**__", "<@756030608601251893>")
   
  .addField("<a:Uyar:758033475923083274>  __**Geliştirici**__ ","<@756030608601251893>")
   
  .addField("<a:Uyar:758033475923083274> __**Bellek kullanımı**__", (process.memoryUsage().heapUsed / 512 / 512).toFixed(2) + ' MB', true)  
   
  .addField("<a:TikMavi:758033452338642965> __**Çalışma süresi**__", bunemq)
   
  .addField('<a:TikMavi:758033452338642965> __**Müzik Çalınan Sunucu Sayısı**__;', bot.voiceConnections.size)
   
  .addField('<a:TikMavi:758033452338642965> __**Kullanıcılar**__:', bot.guilds.reduce((a, b) => a + b.memberCount, 0))
   
  .addField("<a:partnergif:758359284303134811> __**Sunucular**__", bot.guilds.size.toLocaleString(), true)
   
  .addField("<a:partnergif:758359284303134811> __**Kanallar**__", bot.channels.size.toLocaleString(), true)
   
  .addField("<a:partnergif:758359284303134811> __**Discord.JS sürüm**__", "v"+Discord.version, true)
   
  .addField("<a:B_HypeSquad:758147062272360458> __**Node.JS sürüm**__", `${process.version}`, true)
   
  .addField("<a:B_HypeSquad:758147062272360458> __**Ping**__", bot.ping+" ms", true)
   
  .addField("<a:B_HypeSquad:758147062272360458> __**CPU**__", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
   
  .addField("<a:mavi:766803192801132586>  __**Bit**__", `\`${os.arch()}\``, true)
   
  .addField("<a:mavi:766803192801132586>  __**İşletim Sistemi**__", `\`\`${os.platform()}\`\``)
   
   //devtr
 return message.channel.send(annencilermaldır);
  };
 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [ 'i'],
  permLevel: 0
};
 
exports.help = {
  name: "istatistik",
  description: "Bot i",
  usage: "istatistik"
};
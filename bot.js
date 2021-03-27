  //api keyi değiştirmezseniz iyi olur...
//botun oynuyor kısmı 54. satır
//botun durum kısmı 53. satır:
/*
dnd = rahatsız etmeyin
offline = kapalı
online = müsait
idle = boşta
*/
const { apikey } = require('./ayarlar.json');
const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json')
const YouTube = require('simple-youtube-api');
const queue = new Map();
const ffmpeg = require('ffmpeg');
const express = require('express');
const youtube = new YouTube(apikey);
const ytdl = require('ytdl-core');
const prefix = ayarlar.prefix;
const fs = require('fs');
const moment = require('moment');
const Jimp = require('jimp');
const chalk = require('chalk');
///////Gweep`Cerative

client.on("message", message => {
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(ayarlar.prefix)) return;
  let command = message.content.split(' ')[0].slice(ayarlar.prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.yetkiler(message);
  let cmd;
  if (client.commands.has(command)) {///////Gweep`Cerative
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
})
///////Gweep`Cerative
client.on("ready", () => {
  console.log(`Bütün komutlar başarıyla yüklendi!`);
  client.user.setStatus("idle");
  client.user.setActivity(`${prefix}yardım | ${client.guilds.size} sunucu ${client.users.size} kullanıcı`); //botun oynuyor kısmı
  console.log(`Bot AKTİF! Şu an ` + client.channels.size + ` adet kanala, ` + client.guilds.size + ` adet sunucuya ve ` + client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString() + ` kullanıcıya hizmet veriliyor!`);
})


//////////ÜST SATIRLARI ELLEMEYİN!
///////Gweep`Cerative
client.on('message', async msg => {

	if (msg.author.bot) return false;
	if (!msg.content.startsWith(prefix)) return false;

	const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');///////Gweep`Cerative
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);
	let command = msg.content.split(' ')[0].slice(ayarlar.prefix.length);
	//command = command.slice(prefix.length)

	if (command === 'çal' || command === "p" || command === "play") {
		const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) return msg.channel.send(new Discord.RichEmbed()
      .setColor('#000000')
    .setDescription('<a:aquamanmaviloading:758033310680219783> | Müzik Odalarında Bulunman Gerek'));
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT')) {
			return msg.channel.send(new Discord.RichEmbed()
    .setColor('#000000')
    .setDescription('<a:aquamanmaviloading:758033310680219783> | Müzik Odalarında Bulunman Gerek'));
		}
		if (!permissions.has('SPEAK')) {
			 return msg.channel.send(new Discord.RichEmbed()
      .setColor('#000000')///////Gweep`Cerative
      .setTitle('<a:aquamanmaviloading:758033310680219783> | Şarkı Başlatılamıyor Lütfen Mikrofonumu Açınız'));
        }
///////Gweep`Cerative
		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id);
				await handleVideo(video2, msg, voiceChannel, true);
			}
			 return msg.channel.send(new Discord.RichEmbed)
      .setTitle(`**✅ | Oynatma Listesi: **${playlist.title}** Kuyruğa Eklendi!**`)
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
          
				 msg.channel.send(new Discord.RichEmbed()                  
         .setTitle('<a:aquamantac:766801225474637824> Detone | Şarkı Seçimi')
         .setDescription(`${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}`)
         .setFooter('Detone Müzik | Lütfen 1-10 Arasında Rakam Seçiniz 10 Saniye İçerisinde Seçim İptal Olucaktır')
         .setColor('#000000'));///////Gweep`Cerative
          msg.delete(5000)
					try {
						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']///////Gweep`Cerative
						});
					} catch (err) {
						console.error(err);  
						 return msg.channel.send(new Discord.RichEmbed()
            .setColor('#000000')
            .setDescription('<a:aquamanuyar:758033475923083274> **| Şarkı Değeri Belirtmediğiniz İçin Seçim İptal Edilmiştir**.'));
                    }
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return msg.channel.send(new Discord.RichEmbed()
          .setColor('#FF0000')
          .setDescription(':<a:aquamanuyar:758033475923083274> **| Aradım Fakat Hiç Bir Sonuç Çıkmadı**'));
                }
            }
			return handleVideo(video, msg, voiceChannel);
      
		}///////Gweep`Cerative
	} else if (command === 'geç' || command === "s" || command === "skip") {
		if (!msg.member.voiceChannel) if (!msg.member.voiceChannel) return msg.channel.send(new Discord.RichEmbed()
    .setColor('#000000')
    .setDescription(' <a:aquamanuyar:758033475923083274> **| Müzik Odalarında Bulunman Gerek**'));
		if (!serverQueue) return msg.channel.send(new Discord.RichEmbed()
     .setColor('#000000')
     .setTitle('<a:aquamanmaviloading:758033310680219783> **| Hiç Bir Müzik Çalmamakta**'));                                              
		serverQueue.connection.dispatcher.end('**Müziği Geçtim!**');
		return undefined;
	} else if (command === 'durdur' || command === "stop") {
		if (!msg.member.voiceChannel) if (!msg.member.voiceChannel) return msg.channel.send(new Discord.RichEmbed()
    .setColor('#000000')
    .setDescription(' <a:aquamanuyar:758033475923083274> **| Müzik Odalarında Bulunman Gerek**'));
		if (!serverQueue) return msg.channel.send(new Discord.RichEmbed()
     .setColor('#000000')///////Gweep`Cerative
     .setTitle('<a:aquamanmaviloading:758033310680219783> **| Hiç Bir Müzik Çalmamakta**'));                                              
		msg.channel.send(`:stop_button: **${serverQueue.songs[0].title}** Adlı Müzik Durduruldu`);
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('<a:aquamanuyar:758033475923083274> **| Müzik Bitti**');
		return undefined;
	} else if (command === 'ses' || command === "volume") {
		if (!msg.member.voiceChannel) if (!msg.member.voiceChannel) return msg.channel.send(new Discord.RichEmbed()
    .setColor('#000000')
    .setDescription(' <a:aquamanuyar:758033475923083274>  **| Müzik Odalarında Bulunman Gerek**'));
		if (!serverQueue) return msg.channel.send(new Discord.RichEmbed()
     .setColor('#000000')
     .setTitle(' <a:aquamanuyar:758033475923083274> **| Şuan Müzik Çalmıyor**'));                                              
		if (!args[1]) return msg.channel.send(new Discord.RichEmbed()
   .setTitle(`:warning: Şuanki Ses Seviyesi: **${serverQueue.volume}**`)
    .setColor('#000000'))///////Gweep`Cerative
		serverQueue.volume = args[1];
    if(args[1] > 30) {
      msg.channel.send("**Detone | Ses Sınırı En Fazla 50 Dostum**")
    } else {
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
		return msg.channel.send(new Discord.RichEmbed()
    .setTitle(`<a:aquamanuyar:758033475923083274>  Ses Seviyesi Ayarlanıyor: **${args[1]}**`)
    .setColor('#000000'));     
    }               
	} else if (command === 'çalan' || command === "song" || command === "current" || command === "şarkı") {
		if (!serverQueue) return msg.channel.send(new Discord.RichEmbed()
    .setTitle(" <a:aquamanuyar:758033475923083274> **| Çalan Müzik Bulunmamakta**")
    .setColor('#000000'));///////Gweep`Cerative
		return msg.channel.send(new Discord.RichEmbed()
                            
    .setColor('#000000')
    .setTitle("Detone Müzik | Çalan")                            
    .addField('Başlık', `[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})`, true)
    .addField("Süre", `${serverQueue.songs[0].durationm}:${serverQueue.songs[0].durations}`, true))
	} else if (command === 'sıra' || command === "liste" || command === "queue") {
    
    let index = 0;
		if (!serverQueue) return msg.channel.send(new Discord.RichEmbed()
    .setTitle(" <a:aquamanuyar:758033475923083274> **| Sırada Müzik Bulunmamakta**")
    .setColor('#000000'));
		  return msg.channel.send(new Discord.RichEmbed()
    .setColor('#000000')
    .setTitle('<a:aquamanmaviate:758707783381024769> Detone Müzik | Şarkı Kuyruğu')
  .setDescription(`${serverQueue.songs.map(song => `**${++index} -** ${song.title}`).join('\n')}`))
  .addField('🔊 Şu anda çalınan: ' + `${serverQueue.songs[0].title}`);
	} else if (command === 'duraklat' || command === "pause") {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();///////Gweep`Cerative
			return msg.channel.send(new Discord.RichEmbed()
      .setTitle(" <a:aquamanuyar:758033475923083274> **| Müzik Senin İçin Durduruldu!**")
      .setColor('#000000'));
		}
		return msg.channel.send('<a:aquamanuyar:758033475923083274> **| Çalan Müzik Bulunmamakta**');
	} else if (command === 'devam' || command === "devam-et" || command === "devamet" || command === "resume") {
		if (serverQueue && !serverQueue.playing) {///////Gweep`Cerative
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return msg.channel.send(new Discord.RichEmbed()
      .setTitle(" <a:aquamanuyar:758033475923083274> **| Müzik Senin İçin Devam Etmekte!**")
      .setColor('#000000'));
		}
		return msg.channel.send(new Discord.RichEmbed()
    .setTitle(" <a:aquamanuyar:758033475923083274> **| Çalan Müzik Bulunmamakta.**")
    .setColor('#000000'));
	}
  ///////Gweep`Cerative

	return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
    const serverQueue = queue.get(msg.guild.id);
    console.log(video);
    const song = {
        id: video.id,
        title: video.title,
        url: `https://www.youtube.com/watch?v=${video.id}`,
    durationh: video.duration.hours,
    durationm: video.duration.minutes,
        durations: video.duration.seconds,
    views: video.views,
    };
	if (!serverQueue) {///////Gweep`Cerative
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();///////Gweep`Cerative
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`Detone Müzik | **Şarkı Sisteminde Problem Var Hata Nedeni: ${error}**`);
			queue.delete(msg.guild.id);
			return msg.channel.send(new Discord.RichEmbed()
      .setTitle(`Detone Müzik | **Şarkı Sisteminde Problem Var Hata Nedeni: ${error}**`)
      .setColor('#000000'))
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		return msg.channel.send(new Discord.RichEmbed()
    .setTitle(`Detone Müzik | **${song.title}** **Adlı Müzik Kuyruğa Eklendi!**`)
    .setColor('#000000'))
	}
	return undefined;
}
///////Gweep`Cerative
function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === '**Yayın Akış Hızı Yeterli Değil.**') console.log('**Müzik Bitti**');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	 serverQueue.textChannel.send(new Discord.RichEmbed()                                   
  .setTitle("**Detone Müzik | <a:aquamankraltac:758359375621783623> Müzik Başladı**",`https://cdn.discordapp.com/avatars/473974675194511361/6bb90de9efe9fb80081b185266bb94a6.png?size=2048`)
  .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`)
  .addField('\nBaşlık', `[${song.title}](${song.url})`, true)
  .addField("\nSes Seviyesi", `${serverQueue.volume}%`, true)
  .addField("Süre", `${song.durationm}:${song.durations}`, true)
  .setColor('#000000'));
}


const log = message => {
  console.log(`${message}`);

};


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} adet komut yüklemeye hazırlanılıyor.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut ismi: ${props.help.name.toUpperCase()}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});


client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

  
client.yetkiler = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if(message.member.hasPermission("MANAGE_MESSAGES")) permlvl = 1;
  if(message.member.hasPermission("KICK_MEMBERS")) permlvl = 2;
  if(message.member.hasPermission("BAN_MEMBERS")) permlvl = 3;
  if(message.member.hasPermission("MANAGE_GUILD")) permlvl = 4;
  if(message.member.hasPermission("ADMINISTRATOR")) permlvl = 5;
  if(message.author.id === message.guild.ownerID) permlvl = 6;
  if(message.author.id === ayarlar.sahip) permlvl = 7;
  return permlvl;
};


client.login(process.env.token)

//EKSTRA KODLAR BU TARAFLARA EKLENECEK!

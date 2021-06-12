const { MessageEmbed } = require('discord.js');

module.exports = {
conf: {name: 'rol-denetim', aliases: ["rol-denetle", "rol-bilgi"], help: "Rol bilgisi"},
stg: async(client, message, args, config, embed, nembed, SRol, SKanal, SEmoji) => {
if(!SRol.OwnerPerms.some(rol => message.member.roles.cache.has(rol)) && !SRol.HighStaffPerms.some(rol => message.member.roles.cache.has(rol)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(nembed.setDescription(`Bu komutu kullanmak için gerekli yetkiye sahip değilsiniz.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))

let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
if(!role) return message.channel.send(nembed.setDescription(`Lütfen geçerli bir rol belirtin.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))
let members = role.members.array();
let sesteOlmayanlar = members.filter(member => !member.voice.channelID);  
let sesteOlanlar = members.filter(member => member.voice.channel);

message.channel.send(embed.setDescription(`
${SEmoji.MaviTik} <@&${role.id}> rolünde ${role.members.size} kişi bulunmakta. ${SEmoji.Onayla}

Bu rolden ${sesteOlanlar.length} kişi seste sohbet ediyor. 
Bu rolden ${sesteOlmayanlar.length} kişi seste değil. ${SEmoji.Reddet}`))

message.channel.send(`İşte Seste Olanlar;\n\`\`\`${sesteOlanlar}\`\`\``).catch(strgwszdwxdasdwosojfdklwe => {
let sesteOlanlardosya = new MessageAttachment(Buffer.from(sesteOlanlar.slice().join(`\n`)), `${role.id}-sesteolanlar.txt`);
message.channel.send(`Seste olan kullanıcıların sayısı Discord'un izin verdiği Api sayısını geçtiğinden dolayı metin belgesi olarak atıyorum.`, sesteOlanlardosya)
})

message.channel.send(`İşte Seste Olmayanlar;\n\`\`\`${sesteOlmayanlar}\`\`\``).catch(strgwszdwxdasdwosojfdklwe => {
let sesteOlmayanlardosya = new MessageAttachment(Buffer.from(sesteOlmayanlar.slice().join(`\n`)), `${role.id}-sesteolmayanlar.txt`);
message.channel.send(`Seste olan kullanıcıların sayısı Discord'un izin verdiği Api sayısını geçtiğinden dolayı metin belgesi olarak atıyorum.`, sesteOlmayanlardosya)
})

}}
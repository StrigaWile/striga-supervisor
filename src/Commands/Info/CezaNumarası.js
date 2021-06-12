const {MessageEmbed} = require('discord.js')
const ms = require('ms')
const db = require('quick.db')
const moment = require('moment')
const cdb = new db.table('Cezalar')
const ydb = new db.table('Yetkili')
const kdb = new db.table('Kullanici')
const nodb = new db.table('CezaNumarasi')
//ewt bilinçli düzenli yapıyorum xd
moment.locale("tr");

module.exports = {
conf: {name: 'ceza', aliases: ["cezalar"], help: "!ceza @Striga|ID/bilgi/bitir/"},
stg: async(client, message, args, config, embed, nembed, SRol, SKanal, SEmoji) => {
if(!SRol.BanYetkilisi.some(rol => message.member.roles.cache.has(rol)) && !SRol.JailYetkilisi.some(rol => message.member.roles.cache.has(rol)) && !SRol.MuteYetkilisi.some(rol => message.member.roles.cache.has(rol)) && !SRol.VoiceMuteYetkilisi.some(rol => message.member.roles.cache.has(rol)) && !SRol.OwnerPerms.some(rol => message.member.roles.cache.has(rol)) && !SRol.HighStaffPerms.some(rol => message.member.roles.cache.has(rol)) && !SRol.LowStaffPerms.some(rol => message.member.roles.cache.has(rol)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(nembed.setDescription(`Bu komutu kullanmak için gerekli yetkiye sahip değilsiniz.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))

let belirt = args[0]
if(!belirt) return message.channel.send(nembed.setDescription(`İşlem geçersiz, lütfen geçerli bir seçenek belirtin.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))

if(belirt === "sorgu" || belirt === "bilgi") {
let cezaid = args[1]
if(!cezaid) return message.channel.send(nembed.setDescription(`İşlem geçersiz, lütfen geçerli bir ceza numarası ID'si belirtin.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))
let cezabul = await kdb.get(`cezano.${cezaid}`)
if(!cezabul) {message.channel.send(nembed.setDescription(`İşlem geçersiz, belirtilen ${cezaid} numaralı bir ceza bulunamadı.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))} else {

message.channel.send(embed.setDescription(`
❯ Kullanıcı: <@${cezabul.User}> | \`${cezabul.User}\`
❯ Yetkili: <@${cezabul.Admin}> | \`${cezabul.Admin}\`
──────────────
❯ Süre: **\`${cezabul.Time}\`**
❯ Sebep: **\`${cezabul.Reason}\`**
──────────────
❯ Atılış Tarih: **\`${moment(+cezabul.Date).format(`Do MMMM YYYY | HH:mm`)}\`**
❯ Bitiş Tarih: **\`${moment(+cezabul.FinishDate).format(`Do MMMM YYYY | HH:mm`)}\`**
───────────────────────
`)
.addField(`Ceza Tipi`, `${cezabul.Type}`, true)
.addField(`Ceza Aktif mi ?`, `${cezabul.Status === true ? "`Aktif ✅`":"`Değil ❌`"}`, true).setFooter(`#${cezaid} numaralı cezaya bakıyorsunuz.`))

}}


//─────────────────────────────────────────────────────────────────────────────────────────────────────\\


if(belirt === "bitir" || belirt === "sil") {
let cezaturu = args[1]
let cezaid = args[2]
if(!cezaturu) return message.channel.send(nembed.setDescription(`İşlem geçersiz, lütfen bir ceza türü belirtin.\n\`!ceza bitir ban/jail/mute/vmute ID\` `)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))
if(!cezaid) return message.channel.send(nembed.setDescription(`İşlem geçersiz, lütfen geçerli bir ceza numarası ID'si belirtin.\n\`!ceza bitir ban/jail/mute/vmute ID\``)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))
let cezabul = await kdb.get(`cezano.${cezaid}`, {No: cezaid, Status: true})
if(!cezabul) {message.channel.send(nembed.setDescription(`İşlem geçersiz, belirtilen ${cezaid} numaralı bir ceza bulunamadı.\n\`!ceza bitir ban/jail/mute/vmute ID\``)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))} else {
let cezalı = cezabul.User  
let member = await message.guild.members.cache.get(cezalı);
let bannedMember = cdb.get(`Ban`, {No: cezaid, Status: true, Type: client.Types.Ban}) || [];
let jailedMember = cdb.get(`TempJail`, {No: cezaid, Status: true, Type: client.Types.TempJail}) || [];
let mutedMember = cdb.get(`TempMute`, {No: cezaid, Status: true, Type: client.Types.TempMute}) || [];
let vmutedMember = cdb.get(`TempVMute`, {No: cezaid, Status: true, Type: client.Types.TempVMute}) || []; 


//─────────────────────────────────────────────────────────────────────────────────────────────────────\\


if(cezaturu === "ban") { 
let ban = kdb.get(`cezano.${cezaid}`, {No: cezaid, User: cezalı.id, Status: true, Type: client.Types.Ban}) 
cdb.set(`Ban`, bannedMember.filter(x => x.id !== cezalı.id));
kdb.set(`cezano.${cezaid}.Status`, false); 
kdb.set(`cezano.${cezaid}.FinishDate`, Date.now());
let banlı = await client.users.fetch(ban.User)
if(banlı) { 
message.guild.fetchBans().then(x => {   
let Sorgu = x.find(banned => banned.user.id == ban.User) 
if(!Sorgu) return message.channel.send(embed.setDescription(`İşlem geçersiz, ${cezaid} numaralı hiç bir yasaklama yok. ${SEmoji.Reddet}`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))
message.guild.members.unban(ban.User).catch();
message.channel.send(embed.setDescription(`\`${ban.User}\` Idli kullanıcının ${cezaid} numaralı **Ban** cezası sonlandırıldı. ${SEmoji.Onayla}`)).then(x => x.delete({timeout:15000}), message.react(SEmoji.Onayla)).catch()
})//FETCH BİTİŞ
}//BANLI BİTİŞ
}//BAN BİTİŞ


//─────────────────────────────────────────────────────────────────────────────────────────────────────\\


if(cezaturu === 'jail') { 
let jail = kdb.get(`cezano.${cezaid}`, {No: cezaid, User: cezalı.id, Status: true, Type: client.Types.TempJail})
if(jail) {
if(!member.roles.cache.get(SRol.JailRolü)) return message.channel.send(nembed.setDescription(`İşlem geçersiz, belirtilen kullanıcı **Jail** cezasına sahip görünmüyor.\n\`!ceza bilgi ID\` yazarak cezayı sorgulayın.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))
cdb.set(`TempJail`, jailedMember.filter(x => x.id !== cezalı.id));
kdb.set(`cezano.${cezaid}.Status`, false); 
kdb.set(`cezano.${cezaid}.FinishDate`, Date.now());
message.channel.send(embed.setDescription(`${member} Kullanıcısının ${cezaid} numaralı **Jail** cezası sonlandırıldı. ${SEmoji.Onayla}`)).then(x => x.delete({timeout:15000}), message.react(SEmoji.Onayla)) 
member.roles.add(SRol.KayıtsızRolü); member.roles.remove(SRol.JailRolü); member.setNickname(member.user.username)
}}


//─────────────────────────────────────────────────────────────────────────────────────────────────────\\


if(cezaturu === "mute") { 
let mute = kdb.get(`cezano.${cezaid}`, {No: cezaid, User: cezalı.id, Status: true, Type: client.Types.TempMute}) 
if(mute) {
if(!member.roles.cache.get(SRol.MuteRolü)) return message.channel.send(nembed.setDescription(`İşlem geçersiz, belirtilen kullanıcı **Mute** cezasına sahip görünmüyor.\n\`!ceza bilgi ID\` yazarak cezayı sorgulayın.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))
cdb.set(`TempMute`, mutedMember.filter(x => x.id !== cezalı.id));
kdb.set(`cezano.${cezaid}.Status`, false); 
kdb.set(`cezano.${cezaid}.FinishDate`, Date.now());
message.channel.send(embed.setDescription(`${member} Kullanıcısının ${cezaid} numaralı **Mute** cezası sonlandırıldı. ${SEmoji.Onayla}`)).then(x => x.delete({timeout:15000}), message.react(SEmoji.Onayla))
member.roles.remove(SRol.MuteRolü);
}}


//─────────────────────────────────────────────────────────────────────────────────────────────────────\\


if(cezaturu === "vmute") {
let vmute = kdb.get(`cezano.${cezaid}`, {No: cezaid, User: cezalı.id, Status: true, Type: client.Types.TempVMute})
if(vmute) {
if(!member.roles.cache.get(SRol.VoiceMuteRolü)) return message.channel.send(nembed.setDescription(`İşlem geçersiz, belirtilen kullanıcı **Voice Mute** cezasına sahip görünmüyor.\n\`!ceza bilgi ID\` yazarak cezayı sorgulayın.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))
cdb.set(`TempVMute`, vmutedMember.filter(x => x.id !== cezalı.id));
kdb.set(`cezano.${cezaid}.Status`, false); 
kdb.set(`cezano.${cezaid}.FinishDate`, Date.now());
message.channel.send(embed.setDescription(`${member} Kullanıcısının ${cezaid} numaralı **Voice Mute** cezası sonlandırıldı. ${SEmoji.Onayla}`)).then(x => x.delete({timeout:15000}), message.react(SEmoji.Onayla))
if (member && member.voice.channel && member.voice.serverMute) member.voice.setMute(false); member.roles.remove(SRol.VoiceMuteRolü);
}}
}}
}}
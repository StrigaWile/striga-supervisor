const {MessageEmbed} = require('discord.js')
const ms = require('ms')
const db = require('quick.db')
const moment = require('moment')
const cdb = new db.table('Cezalar')
const ydb = new db.table('Yetkili')
const kdb = new db.table('Kullanici')
const nodb = new db.table('CezaNumarasi')
//ewt bilinçli düzenli yapıyorum xd

module.exports = {
conf: {name: 'mute', aliases: ["sustur", "tempmute", "temp-mute"], help: "!mute @Striga/ID Süre Sebep"},
stg: async(client, message, args, config, embed, nembed, SRol, SKanal, SEmoji) => {
if(!SRol.MuteYetkilisi.some(rol => message.member.roles.cache.has(rol)) && !SRol.OwnerPerms.some(rol => message.member.roles.cache.has(rol)) && !SRol.HighStaffPerms.some(rol => message.member.roles.cache.has(rol))  && !SRol.LowStaffPerms.some(rol => message.member.roles.cache.has(rol))  && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(nembed.setDescription(`Bu komutu kullanmak için gerekli yetkiye sahip değilsiniz.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]); let sure = args[1]; let sebep = args.splice(2).join(" ");
if(!member) return message.channel.send(nembed.setDescription(`İşlem geçersiz, bir kullanıcı belirtmeniz gerekiyor.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))
if(!sure || !sebep) return message.channel.send(nembed.setDescription(`İşlem geçersiz, geçerli bir süre veya sebep belirtmen gerekiyor.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))
if(member.roles.cache.get(SRol.JailRolü)) return message.channel.send(nembed.setDescription(`İşlem geçersiz, kullanıcı Jail rolüne sahip`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))
if(member.id === message.author.id) return message.channel.send(nembed.setDescription(`İşlem geçersiz, kendinize bu işlemi yapamazsınız.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))
if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(nembed.setDescription(`İşlem geçersiz, senden üst/aynı pozisyonda birisine bunu yapamazsın.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))
let zaman = args[1].replace(`d`," Gün").replace(`s`," Saniye").replace(`h`," Saat").replace(`m`," Dakika").replace(`w`," Hafta")
let cezano = nodb.get(`cezano.${message.guild.id}`) + 1;
let cezaData = {No: cezano, User: member.id, Admin: message.author.id, Status: true, Time: zaman, Reason: sebep, FinishDate: Date.now()+ms(sure), Date: Date.now(), Type: client.Types.TempMute}


nodb.add(`cezano.${message.guild.id}`, 1)
let mutedMembers = cdb.get(`TempMute`) || [];
if(!mutedMembers.some(s => s.id == member.id)) {
kdb.set(`cezano.${cezano}`, cezaData)    
ydb.add(`yetkili.${message.author.id}.mute`, 1)
ydb.add(`yetkili.${message.author.id}.toplamceza`, 1)
kdb.push(`kullanici.${member.id}.sicil`, cezaData)
cdb.push(`TempMute`, {No: cezano, User: member.id, FinishDate: Date.now()+ms(sure)})
}

message.channel.send(`${SEmoji.MaviTik} ${member} adlı üye ${message.author} tarafından "${sebep}" gerekçesiyle "${zaman}" süresince metin kanallarından engellenmiş olacak. (\`#${cezano}\`)`).then(x => x.delete({timeout:15000}), message.react(SEmoji.Onayla))

member.roles.add(SRol.MuteRolü)

client.channels.cache.get(SKanal.Mute_Log).send(new MessageEmbed().setTitle(`Bir Kullanıcı Metin Kanallarından Engellendi.`).setDescription(`${member} kullanıcısı sunucumuzdan ${sebep} gerekçesiyle ${zaman} ${message.author} tarafından metin kanallarından engellendi.\n\n❯ Kullanıcı: ${member} | **\`${member.id}\`**\n❯ Yetkili: ${message.author} | **\`${message.author.id}\`**\n❯ Süre: **\`${zaman}\`** \n❯ Sebep: **\`${sebep}\`**\n\n ❯ Tarih: **\`${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}\`**`).setFooter(`Ceza Numarası: #${cezano}`).setColor(`#f9dfdc`))

}}
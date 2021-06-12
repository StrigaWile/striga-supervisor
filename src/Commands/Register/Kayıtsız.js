const {MessageEmbed} = require('discord.js')
const settings = require('../../Config/Striga')
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
conf: {name: 'kayıtsız', aliases: ["unregister"], help: "!kayıtsız @Striga/ID Sebep"},
stg: async(client, message, args, config, embed, nembed, SRol, SKanal, SEmoji) => {
if(!SRol.KayıtYetkilisi.some(rol => message.member.roles.cache.has(rol)) && !SRol.OwnerPerms.some(rol => message.member.roles.cache.has(rol)) && !SRol.HighStaffPerms.some(rol => message.member.roles.cache.has(rol))  && !SRol.LowStaffPerms.some(rol => message.member.roles.cache.has(rol))  && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(nembed.setDescription(`Bu komutu kullanmak için gerekli yetkiye sahip değilsiniz.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
let sebep = args.splice(1).join(" ");
if(!member) return message.channel.send(nembed.setDescription(`İşlem geçersiz, bir kullanıcı belirtmeniz gerekiyor.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))
if(!sebep) return message.channel.send(nembed.setDescription(`İşlem geçersiz, geçerli bir sebep belirtmen gerekiyor.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))
if(member.id === message.author.id) return message.channel.send(nembed.setDescription(`İşlem geçersiz, kendinize bu işlemi yapamazsınız.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))
if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(nembed.setDescription(`İşlem geçersiz, senden üst/aynı pozisyonda birisine bunu yapamazsın.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet)) 

message.channel.send(embed.setDescription(`${member} adlı üyenin kayıtsıza atıldı.`).setColor(client.manColor())).then(x => x.delete({timeout:15000}), message.react(SEmoji.Onayla)) 

let digerroller = [];
if(member.voice.channel) member.voice.kick().catch();
member.roles.cache.filter(r => r.id).map(r => {digerroller.push(r.id)})
member.roles.remove(digerroller).catch()
member.setNickname(member.user.username)
await member.roles.add(SRol.KayıtsızRolü)

client.channels.cache.get(SKanal.Kayıt_Log).send(nembed.setAuthor(`Bir Kullanıcı Kayıtsıza Atıldı.`).setDescription(`
❯ Kullanıcı: ${member} | **\`${member.id}\`**
❯ Yetkili: ${message.author} | **\`${message.author.id}\`**
❯ Sebep: **\`${sebep}\`**
❯ Kanal: **${message.channel.name}** - (<#${message.channel.id}>)
❯ Tarih: **\`${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}\`**
`).setColor())
}}
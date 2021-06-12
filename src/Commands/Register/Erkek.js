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
conf: {name: 'erkek', aliases: ["e", "man", "adam"], help: "!erkek @Striga/ID İsim Yaş"},
stg: async(client, message, args, config, embed, nembed, SRol, SKanal, SEmoji) => {
if(!SRol.KayıtYetkilisi.some(rol => message.member.roles.cache.has(rol)) && !SRol.OwnerPerms.some(rol => message.member.roles.cache.has(rol)) && !SRol.HighStaffPerms.some(rol => message.member.roles.cache.has(rol))  && !SRol.LowStaffPerms.some(rol => message.member.roles.cache.has(rol))  && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(nembed.setDescription(`Bu komutu kullanmak için gerekli yetkiye sahip değilsiniz.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!member) return message.channel.send(nembed.setDescription(`İşlem geçersiz, bir kullanıcı belirtmeniz gerekiyor.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))
if(!args[1]) return message.channel.send(nembed.setDescription(`İşlem geçersiz, bir isim belirtin.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))
if(!args[2]) return message.channel.send(nembed.setDescription(`İşlem geçersiz, bir yaş belirtin.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))
let Name = args[1].charAt(0).toUpperCase() + args[1].slice(1).toLowerCase();
let Age = Number(args[2])
if(!Name || !Age) return message.channel.send(nembed.setDescription(`İşlem geçersiz, lütfen geçerli bir isim veya yaş belirtin`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))
if(member.id === message.author.id) return message.channel.send(nembed.setDescription(`İşlem geçersiz, kendinize bu işlemi yapamazsınız.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))
if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(nembed.setDescription(`İşlem geçersiz, senden üst/aynı pozisyonda birisine bunu yapamazsın.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet)) 
const ServerDisplayName = `${member.user.username.includes(settings.sunucuTag) ? settings.sunucuTag : settings.tagsızTag} ${Name} | ${Age}`
member.setNickname(`${ServerDisplayName}`); member.roles.add(SRol.ErkekRol_1); member.roles.add(SRol.ErkekRol_2); member.roles.remove(SRol.KayıtsızRolü); 

kdb.push(`kullanici.${member.id}.isimler`, {User: member.id, Admin: message.author.id, DisplayName: ServerDisplayName, Role: `<@&${SRol.ErkekRol_1}>`, Date: Date.now()})
ydb.add(`yetkili.${message.author.id}.erkek`, 1)
ydb.add(`yetkili.${message.author.id}.toplam`, 1)

let isimler = kdb.get(`kullanici.${member.id}.isimler`) 
let isimlerData = isimler.reverse().reverse()

if(isimler.length < 2) return message.channel.send(embed.setDescription(`${member} adlı üyenin ismi "${ServerDisplayName}" olarak güncellendi ve **Erkek** rolleri verildi.`).setColor(client.manColor())).then(x => x.delete({timeout:15000}), message.react(SEmoji.Onayla)) 

message.channel.send(embed.setDescription(`
${member} adlı üyenin ismi "${ServerDisplayName}" olarak güncellendi ve **Erkek** rolleri verildi.

Kullanıcının üyenin ${isimlerData.length} farklı ismi bulundu.
\`!isimler @EtiketID\` yazarak kontrol edebilirsiniz.`).setColor(client.manColor())).then(x => x.delete({timeout:15000}), message.react(SEmoji.Onayla)) 

client.channels.cache.get(SKanal.Kayıt_Log).send(nembed.setAuthor(`Bir Kullanıcı Kayıt Edildi.`).setDescription(`
❯ Kullanıcı: ${member} | **\`${member.id}\`**
❯ Yetkili: ${message.author} | **\`${message.author.id}\`**
❯ İsim Yaş: **\`${ServerDisplayName}\`**
❯ Cinsiyet: **Erkek** - (<@&${SRol.ErkekRol_1}>)
❯ Kanal: **${message.channel.name}** - (<#${message.channel.id}>)
❯ Tarih: **\`${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}\`**
`).setColor(client.manColor()))
}}
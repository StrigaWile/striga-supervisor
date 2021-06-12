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
conf: {name: 'ban', aliases: ["yasakla"], help: "!ban @Striga/ID Sebep"},
stg: async(client, message, args, config, embed, nembed, SRol, SKanal, SEmoji) => {
if(!SRol.BanYetkilisi.some(rol => message.member.roles.cache.has(rol)) && !SRol.OwnerPerms.some(rol => message.member.roles.cache.has(rol)) && !SRol.HighStaffPerms.some(rol => message.member.roles.cache.has(rol))  && !SRol.LowStaffPerms.some(rol => message.member.roles.cache.has(rol))  && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(nembed.setDescription(`Bu komutu kullanmak için gerekli yetkiye sahip değilsiniz.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]); let sebep = args.splice(1).join(" ");
if(!member) return message.channel.send(nembed.setDescription(`İşlem geçersiz, bir kullanıcı belirtmeniz gerekiyor.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))
if(!sebep) return message.channel.send(nembed.setDescription(`İşlem geçersiz, geçerli bir sebep belirtmen gerekiyor.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))
if(member.id === message.author.id) return message.channel.send(nembed.setDescription(`İşlem geçersiz, kendinize bu işlemi yapamazsınız.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))
if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(nembed.setDescription(`İşlem geçersiz, senden üst/aynı pozisyonda birisine bunu yapamazsın.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))
if(!member.bannable) return message.channel.send(nembed.setDescription(`İşlem geçersiz, belirtilen kullanıcıya işlem yapamıyorum.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))

let cezano = nodb.get(`cezano.${message.guild.id}`) + 1;
let cezaData = {No: cezano, User: member.id, Admin: message.author.id, Status: true, Time: "Yok", Reason: sebep, FinishDate: "Belirsiz", Date: Date.now(), Type: client.Types.Ban}

nodb.add(`cezano.${message.guild.id}`, 1)
let bannedMembers = cdb.get(`Ban`) || [];
if(!bannedMembers.some(s => s.id == member.id)) {
kdb.set(`cezano.${cezano}`, cezaData)    
ydb.add(`yetkili.${message.author.id}.ban`, 1)
ydb.add(`yetkili.${message.author.id}.toplamceza`, 1)
kdb.push(`kullanici.${member.id}.sicil`, cezaData)
cdb.push(`Ban`, {No: cezano, User: member.id, Status: true, FinishDate: "Belirsiz"})
}
message.channel.send(`${SEmoji.MaviTik} ${member} adlı üye ${message.author} tarafından "${sebep}" gerekçesiyle sunucudan yasaklandı. (\`#${cezano}\`)`).then(x => x.delete({timeout:15000}), message.react(SEmoji.Onayla))
member.ban({reason: sebep})

client.channels.cache.get(SKanal.Ban_Log).send(new MessageEmbed().setTitle(`Bir Kullanıcı Yasaklandı.`).setDescription(`${member} kullanıcısı sunucumuzdan ${sebep} gerekçesiyle ${message.author} tarafından yasaklandı.\n\n❯ Kullanıcı: ${member} | **\`${member.id}\`**\n❯ Yetkili: ${message.author} | **\`${message.author.id}\`**\n❯ Sebep: **\`${sebep}\`**\n\n ❯ Tarih: **\`${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}\`** ❯ Ceza Numarası: **\`#${cezano}\`**`).setColor(`#f9dfdc`))
}}
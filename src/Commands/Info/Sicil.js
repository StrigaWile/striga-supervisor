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
conf: {name: 'sicil', aliases: ["kontrol"], help: "!sicil @Striga/ID"},
stg: async(client, message, args, config, embed, nembed, SRol, SKanal, SEmoji) => {
if(!SRol.BanYetkilisi.some(rol => message.member.roles.cache.has(rol)) && !SRol.JailYetkilisi.some(rol => message.member.roles.cache.has(rol)) && !SRol.MuteYetkilisi.some(rol => message.member.roles.cache.has(rol)) && !SRol.VoiceMuteYetkilisi.some(rol => message.member.roles.cache.has(rol)) && !SRol.OwnerPerms.some(rol => message.member.roles.cache.has(rol)) && !SRol.HighStaffPerms.some(rol => message.member.roles.cache.has(rol)) && !SRol.LowStaffPerms.some(rol => message.member.roles.cache.has(rol)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(nembed.setDescription(`Bu komutu kullanmak için gerekli yetkiye sahip değilsiniz.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!member) return message.channel.send(nembed.setDescription(`İşlem geçersiz, bir kullanıcı belirtmeniz gerekiyor.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))

let sicil = kdb.get(`kullanici.${member.id}.sicil`) || [];
sicil = sicil.reverse().reverse();
let page = 1;
let sicilinformation = sicil.length > 0 ? sicil.map(x => `\`#${x.No}\` **[${x.Type}]** | ${x.Reason} - ${x.Time} - ${moment(+x.Date).format(`Do MMMM YYYY | HH:mm`)}`) : `${member} adlı kullanıcının herhangi bir sicil kayıtı yok.`

if(sicil.length < 1) { 
message.channel.send(embed.setDescription(`${sicilinformation}`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Onayla))}

if(sicil.length > 0) { 
    
var cezaListe = await message.channel.send(embed.setDescription(`
${member} adlı kullanıcının ${sicil.length} tane ceza kayıtı bulundu kullanıcının sicil listesini aşağıya detaylı bir şekilde yazdım.

${sicilinformation.slice(page == 1 ? 0 : page * 10 - 10, page * 10).join("\n")}`)).then(message.react(SEmoji.Onayla))


if(sicilinformation.length > 10) {
await cezaListe.react(`◀`);
await cezaListe.react(`🔴`);
await cezaListe.react(`▶`);

let collector = cezaListe.createReactionCollector((react, user) => ["◀", "🔴", "▶"].some(e => e == react.emoji.name) && user.id == message.member.id, {time: 200000});
collector.on("collect", (react, user) => {
if (react.emoji.name == "▶") {
if (sicilinformation.slice((page + 1) * 10 - 10, (page + 1) * 10).length <= 0) return;
page += 1;
let dataNext = sicilinformation.slice(page == 1 ? 0 : page * 10 - 10, page * 10).join("\n");
cezaListe.edit(embed.setDescription(`
${member} adlı kullanıcının ${sicil.length} tane ceza kayıtı bulundu kullanıcının sicil listesini aşağıya detaylı bir şekilde yazdım.

${dataNext}`))
}


if (react.emoji.name == "◀") {
if (sicilinformation.slice((page - 1) * 10 - 10, (page - 1) * 10).length <= 0) return;
page -= 1;
let dataEx = sicilinformation.slice(page == 1 ? 0 : page * 10 - 10, page * 10).join("\n");
cezaListe.edit(embed.setDescription(`
${member} adlı kullanıcının ${sicil.length} tane ceza kayıtı bulundu kullanıcının sicil listesini aşağıya detaylı bir şekilde yazdım.
    
${dataEx}`))
}
if (react.emoji.name == "🔴") {
cezaListe.delete();
collector.stop();}})
}}}}


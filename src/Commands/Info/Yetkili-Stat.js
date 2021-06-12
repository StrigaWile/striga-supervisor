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
conf: {name: 'yetkili-stat', aliases: ["yetki-stat"], help: "!yetkili-stat"},
stg: async(client, message, args, config, embed, nembed, SRol, SKanal, SEmoji) => {
if(!SRol.KayıtYetkilisi.some(rol => message.member.roles.cache.has(rol)) && !SRol.BanYetkilisi.some(rol => message.member.roles.cache.has(rol)) && !SRol.JailYetkilisi.some(rol => message.member.roles.cache.has(rol)) && !SRol.MuteYetkilisi.some(rol => message.member.roles.cache.has(rol)) && !SRol.VoiceMuteYetkilisi.some(rol => message.member.roles.cache.has(rol)) && !SRol.OwnerPerms.some(rol => message.member.roles.cache.has(rol)) && !SRol.HighStaffPerms.some(rol => message.member.roles.cache.has(rol)) && !SRol.LowStaffPerms.some(rol => message.member.roles.cache.has(rol)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(nembed.setDescription(`Bu komutu kullanmak için gerekli yetkiye sahip değilsiniz.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))

const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!member) {
let erkek = ydb.get(`yetkili.${message.author.id}.erkek`) || "0";
let kadın = ydb.get(`yetkili.${message.author.id}.kadin`) || "0";
let kayıtlar = ydb.get(`yetkili.${message.author.id}.toplam`) || "0";
let cezalar = ydb.get(`yetkili.${message.author.id}.toplamceza`) || "0";
let ban = ydb.get(`yetkili.${message.author.id}.ban`) || "0";
let jail = ydb.get(`yetkili.${message.author.id}.jail`) || "0";
let mute = ydb.get(`yetkili.${message.author.id}.mute`) || "0";
let vmute = ydb.get(`yetkili.${message.author.id}.vmute`) || "0";

let arat = `────────────────────────────
❯ Toplam **\`${kayıtlar}\`** tane kişiye <@&${SRol.ErkekRol_1}> + <@&${SRol.KadınRol_1}> rolü vermiş.
❯ Toplam **\`${erkek}\`** tane kişiye <@&${SRol.ErkekRol_1}> rolü vermiş.
❯ Toplam **\`${kadın}\`** tane kişiye <@&${SRol.KadınRol_1}> rolü vermiş.
────────────────────────────
❯ Genel Olarak **\`${cezalar}\`** tane kişiyi **Ceza Vermiş**.
❯ Toplam **\`${ban}\`** tane kişiyi **Sunucudan Yasaklamış**.
❯ Toplam **\`${jail}\`** tane kişiye <@&${SRol.JailRolü}> rolü vermiş.
❯ Toplam **\`${mute}\`** tane kişiye <@&${SRol.MuteRolü}> rolü vermiş.
❯ Toplam **\`${vmute}\`** tane kişiye <@&${SRol.VoiceMuteRolü}> rolü vermiş.
`

message.channel.send(embed.setDescription(`
${message.guild.name} sunucusunda ${message.author} adlı kullanıcının yaptığı işlemnleri aşağıya listeledim.
❯ Sunucu ismi: **\`${message.member.displayName}\`**
❯ Discord İsmi: **\`${message.author.tag}\`**
❯ Discord Id'si: **\`${message.author.id}\`**
${arat}`)).then(message.react(SEmoji.Onayla))

}

if(member) {
let Eerkek = ydb.get(`yetkili.${member.id}.erkek`) || "0";
let Ekadın = ydb.get(`yetkili.${member.id}.kadin`) || "0";
let Ekayıtlar = ydb.get(`yetkili.${member.id}.toplam`) || "0";
let Ecezalar = ydb.get(`yetkili.${member.id}.toplamceza`) || "0";
let Eban = ydb.get(`yetkili.${member.id}.ban`) || "0";
let Ejail = ydb.get(`yetkili.${member.id}.jail`) || "0";
let Emute = ydb.get(`yetkili.${member.id}.mute`) || "0";
let Evmute = ydb.get(`yetkili.${member.id}.vmute`) || "0";

let arat = `────────────────────────────
❯ Toplam **\`${Ekayıtlar}\`** tane kişiye <@&${SRol.ErkekRol_1}> + <@&${SRol.KadınRol_1}> rolü vermiş.
❯ Toplam **\`${Eerkek}\`** tane kişiye <@&${SRol.ErkekRol_1}> rolü vermiş.
❯ Toplam **\`${Ekadın}\`** tane kişiye <@&${SRol.KadınRol_1}> rolü vermiş.
────────────────────────────
❯ Genel Olarak **\`${Ecezalar}\`** tane kişiyi **Ceza Vermiş**.
❯ Toplam **\`${Eban}\`** tane kişiyi **Sunucudan Yasaklamış**.
❯ Toplam **\`${Ejail}\`** tane kişiye <@&${SRol.JailRolü}> rolü vermiş.
❯ Toplam **\`${Emute}\`** tane kişiye <@&${SRol.MuteRolü}> rolü vermiş.
❯ Toplam **\`${Evmute}\`** tane kişiye <@&${SRol.VoiceMuteRolü}> rolü vermiş.
`

message.channel.send(embed.setDescription(`${message.guild.name} sunucusunda ${member} adlı kullanıcının yaptığı işlemnleri aşağıya listeledim.
❯ Sunucu ismi: **\`${member.displayName}\`**
❯ Discord İsmi: **\`${member.user.tag}\`**
❯ Discord Id'si: **\`${member.id}\`**
${arat}`)).then(message.react(SEmoji.Onayla))

}

}}
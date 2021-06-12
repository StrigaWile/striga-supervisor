const { MessageEmbed } = require('discord.js');

module.exports = {
conf: {name: 'say', aliases: ["info"], help: "sayıyo"},
stg: async(client, message, args, config, embed, nembed, SRol, SKanal, SEmoji) => {
if(!SRol.KayıtYetkilisi.some(rol => message.member.roles.cache.has(rol)) && !SRol.BanYetkilisi.some(rol => message.member.roles.cache.has(rol)) && !SRol.JailYetkilisi.some(rol => message.member.roles.cache.has(rol)) && !SRol.MuteYetkilisi.some(rol => message.member.roles.cache.has(rol)) && !SRol.VoiceMuteYetkilisi.some(rol => message.member.roles.cache.has(rol)) && !SRol.OwnerPerms.some(rol => message.member.roles.cache.has(rol)) && !SRol.HighStaffPerms.some(rol => message.member.roles.cache.has(rol)) && !SRol.LowStaffPerms.some(rol => message.member.roles.cache.has(rol)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(nembed.setDescription(`Bu komutu kullanmak için gerekli yetkiye sahip değilsiniz.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))

let seslisohbet = `${message.guild.channels.cache.filter(channel => channel.type == "voice").map(channel => channel.members.size).reduce((a, b) => a + b)}`
let toplamuye = `${message.guild.memberCount}`
let cevirimici = `${message.guild.members.cache.filter(u => u.presence.status != "offline").size}`
let boostersayi = `${message.guild.roles.cache.get(SRol.BoosterRolü).members.size}`
let taglirolu = `${message.guild.roles.cache.get(SRol.TagRolü).members.size}`

message.channel.send(embed.setAuthor(message.guild.name, message.guild.iconURL({dynamic:true})).setDescription(`
• Sesli Kanallarda **${seslisohbet}** Kişi Sohbet Ediyor.
• Sunucumuzda Toplam **${toplamuye}** Kullanıcı Bulunmakta.
• Sunucumuzda Toplam **${cevirimici}** Kullanıcı Çevirimiçi.
• Sunucumuza Toplam **${boostersayi}** Kullanıcı Takviye Yapmış.
• Sunucumuzda Toplam **${taglirolu}** Kişi Taglı.`).setFooter(`${message.author.tag} tarafından istendi.`))}}
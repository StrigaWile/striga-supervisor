const { MessageEmbed } = require('discord.js');

module.exports = {
conf: {name: 'sponsor', aliases: ["sunucu-sponsoru"], help: "Belirtilen kullanıcıya sponsor rolü verir.\n!sponsor @Striga/ID"},
stg: async(client, message, args, config, embed, nembed, SRol, SKanal, SEmoji) => {
if(!SRol.OwnerPerms.some(rol => message.member.roles.cache.has(rol)) && !SRol.HighStaffPerms.some(rol => message.member.roles.cache.has(rol))  && !SRol.LowStaffPerms.some(rol => message.member.roles.cache.has(rol))  && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(nembed.setDescription(`Bu komutu kullanmak için gerekli yetkiye sahip değilsiniz.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))

const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!member) return message.channel.send(nembed.setDescription(`İşlem için birisini belirtmelisin.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))
if(member.id === message.author.id) return message.channel.send(nembed.setDescription(`Sponsor işlemini kendi üzerinde uygulayamazsın.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))
if(member.id === client.user.id) return message.channel.send(nembed.setDescription(`Sponsor işlemini benim üzerimden uygulayamazsın.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))
if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(nembed.setDescription(`Sponsor işlemini senden üst/aynı pozisyonda birisine uygulayamazsın.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))

if(member.roles.cache.get(SRol.SponsorRolü)) {
member.roles.remove(SRol.SponsorRolü)
message.channel.send(embed.setDescription(`${member} adlı kullanıcıdan <@&${SRol.SponsorRolü}> alındı. ${SEmoji.Onayla}`)).then(x => x.delete({timeout:15000}), message.react(SEmoji.Onayla))
} else {
member.roles.add(SRol.SponsorRolü)
message.channel.send(embed.setDescription(`${member} adlı kullanıcıya <@&${SRol.SponsorRolü}> verildi. ${SEmoji.Onayla}`)).then(x => x.delete({timeout:15000}), message.react(SEmoji.Onayla))
}
}}
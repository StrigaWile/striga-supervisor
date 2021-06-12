const { MessageEmbed } = require('discord.js');
const settings = require('../../Config/Striga')
module.exports = {
conf: {name: 'taglı', aliases: ["taglılar"], help: "Sohbeti 1-100 arası mesajları temizler.\n!sil @Striga"},
stg: async(client, message, args, config, embed, nembed, SRol, SKanal, SEmoji) => {
if(!SRol.OwnerPerms.some(rol => message.member.roles.cache.has(rol)) && !SRol.HighStaffPerms.some(rol => message.member.roles.cache.has(rol))  && !SRol.LowStaffPerms.some(rol => message.member.roles.cache.has(rol))  && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(nembed.setDescription(`Bu komutu kullanmak için gerekli yetkiye sahip değilsiniz.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))

message.channel.send(embed.setDescription(`Sunucumuzda toplam ${message.guild.members.cache.filter(m => m.user.username.toLowerCase().includes(settings.sunucuTag)).size} kişide tag var. ${SEmoji.Onayla} \nSunucuda tag kontrolü yapılıyor.`))
let tagRol = message.guild.roles.cache.get(SRol.TagRolü);
message.guild.members.cache.forEach(x => {
if (x.user.username.includes(settings.sunucuTag)) 
{
x.setNickname(x.displayName.replace(settings.tagsızTag, settings.sunucuTag))
x.roles.add(SRol.TagRolü)
} else if (!x.user.username.includes(settings.sunucuTag) && x.roles.cache.has(SRol.TagRolü)) {
x.setNickname(x.displayName.replace(settings.sunucuTag, settings.tagsızTag))
x.roles.remove(x.roles.cache.filter(rol => tagRol.position <= rol.position));
}})



}}

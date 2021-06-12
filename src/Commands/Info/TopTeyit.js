const dc = require('discord.js')
const db = require('quick.db')
const ydb = new db.table('Yetkili')

module.exports = {
conf: {name: 'top-teyit', aliases: ["topteyit"], help: "!top-teyiT"},
stg: async(client, message, args, config, embed, nembed, SRol, SKanal, SEmoji) => {
if(!SRol.KayıtYetkilisi.some(rol => message.member.roles.cache.has(rol)) && !SRol.OwnerPerms.some(rol => message.member.roles.cache.has(rol)) && !SRol.HighStaffPerms.some(rol => message.member.roles.cache.has(rol)) && !SRol.LowStaffPerms.some(rol => message.member.roles.cache.has(rol)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(nembed.setDescription(`Bu komutu kullanmak için gerekli yetkiye sahip değilsiniz.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))

let uye = message.mentions.users.first() || message.author;
let bilgi = ydb.get(`yetkili.${uye.id}.toplam`);
let yazı = "Top Teyit Listesi"
  
let top = message.guild.members.cache.filter(uye => ydb.get(`yetkili.${uye.id}.toplam`)).array().sort((uye1, uye2) => Number(ydb.get(`yetkili.${uye2.id}.toplam`))-Number(ydb.get(`yetkili.${uye1.id}.toplam`))).slice(0, 15).map((uye, index) => (index+1)+" • <@"+ uye +"> | \`" + ydb.get(`yetkili.${uye.id}.toplam`) +"\` Kayıta Sahip.").join('\n');
message.channel.send(new dc.MessageEmbed().setAuthor(yazı, message.guild.iconURL({dynamic: true})).setTimestamp().setColor("#38ff3d").setFooter(message.member.displayName+" tarafından istendi!", message.author.avatarURL).setDescription(top));
}}
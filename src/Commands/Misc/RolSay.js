const { MessageEmbed } = require('discord.js');

module.exports = {
conf: {name: 'rol-say', aliases: ["rolleri-göster"], help: "Rol bilgisi"},
stg: async(client, message, args, config, embed, nembed, SRol, SKanal, SEmoji) => {
if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(nembed.setDescription(`Bu komutu kullanmak için gerekli yetkiye sahip değilsiniz.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))

let rolsayi = 1;
let roller = message.guild.roles.cache.sort((x, y) => x.position-y.position).array().reverse().map(x =>  `${rolsayi++}. ${x.name} rolünde ${x.members.size} kişi bulunmakta`).join('\n');
message.channel.send(`Rol Dökümanları; \n${message.guild.name} sunucusunda toplamda ${message.guild.roles.cache.size} tane rol bulunmakta. \n\n${roller}`, {code: "xl", split: true});

}}
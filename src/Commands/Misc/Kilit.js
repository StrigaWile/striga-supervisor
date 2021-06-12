const { MessageEmbed } = require('discord.js');

module.exports = {
conf: {name: 'kilit', aliases: ["kanal-kilit"], help: "Kanalı kitler"},
stg: async(client, message, args, config, embed, nembed, SRol, SKanal, SEmoji) => {
if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(nembed.setDescription(`Bu komutu kullanmak için gerekli yetkiye sahip değilsiniz.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))

let everyone = message.guild.roles.cache.find(x => x.name === `@everyone`);
if(message.channel.permissionsFor(everyone).has("SEND_MESSAGES")) {
message.channel.updateOverwrite(everyone, {SEND_MESSAGES: false});
message.channel.send(embed.setDescription("Kanal kilitlendi 🔒")).then(message.react(`🔒`))
} else {
message.channel.updateOverwrite(everyone, {SEND_MESSAGES: null});
message.channel.send(embed.setDescription("Kanal kilidi açıldı 🔓")).then(message.react(`🔓`))}

}}
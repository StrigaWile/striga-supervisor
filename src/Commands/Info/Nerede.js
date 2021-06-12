const { MessageEmbed } = require('discord.js');

module.exports = {
conf: {name: 'nerede', aliases: ["ses-kontrol", "kullanıcı-nerede"], help: "Üyenin nerede olduğunu gösterir.\n!nerede @Etiket/ID"},
stg: async(client, message, args, config, embed, nembed, SRol, SKanal, SEmoji) => {
let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!member) return message.channel.send(nembed.setDescription(`Lütfen geçerli bir kullanıcı belirtin.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))
if(!member.voice.channel) return message.channel.send(nembed.setDescription(`Belirtilen kullanıcı herhangi bir ses kanalında bulunmamakta.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))
let nowchannel = member.voice.channel 
let selfM = member.voice.selfMute ? "kapalı" : "açık";
let selfD = member.voice.selfDeaf ? "kapalı" : "açık";

nowchannel.createInvite().then(invite =>
message.channel.send(embed.setDescription(`${member} adlı üye şu anda \`${message.guild.channels.cache.get(member.voice.channelID).name}\` isimli kanalda sohbet ediyor.

Mikrofonu "${selfM}"
Kulaklığı: "${selfD}"

Eğer kullanıcının yanına gitmek istiyorsan [Tıkla](https://discord.gg/${invite.code})
`)).then(x => x.delete({timeout:15000}), message.react(SEmoji.Onayla)))

}}
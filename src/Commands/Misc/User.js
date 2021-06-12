const { MessageEmbed } = require('discord.js');
const moment = require('moment')
require("moment-duration-format");

module.exports = {
conf: {name: 'user', aliases: ["info", "kullanıcı"], help: "Kullanıcının bilgilerini gösterir.\n!user @Striga/ID"},
stg: async(client, message, args, config, embed, nembed, SRol, SKanal, SEmoji) => {
const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!user) return message.channel.send(nembed.setDescription(`İşlem için birisini belirtmelisin.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.SEmoji.Reddet))

const member = message.guild.member(user);

var emojidurum = {"idle": ""+SEmoji.idle+" **(Boşta)**", "offline": ""+SEmoji.offline+" **(Çevirimdışı)**", "online": ""+SEmoji.online+" **(Çevirimiçi)**", "dnd": ""+SEmoji.dnd+" **(Rahatsız Etme)**"}

require("moment-duration-format");
moment.locale("tr");
const status = emojidurum[user.presence.status]
let yuksek = member.roles.highest
message.channel.send(embed.setThumbnail(member.user.avatarURL({dynamic:true})).setDescription(`
❯ Kullanıcı Adı: **\`${member.user.tag}\`**
❯ Takma Adı: **\`${member.displayName}\`**
❯ Id Numarası: **\`${member.id}\`**
❯ Durumu: ${status}

❯ Hesap Kuruluş Tarihi: \`${moment(user.createdAt).format(`Do MMMM YYYY (HH:mm)`)}\`
❯ Sunucuya Katılma Tarihi: \`${moment(member.joinedAt).format(`Do MMMM YYYY (HH:mm)`)}\`

❯ Rolleri: ${member.roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(' ') ? member.roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(' ') : 'Herhangi bir role sahip değil.'}
`))
}}
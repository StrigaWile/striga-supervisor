const { MessageEmbed } = require('discord.js');

module.exports = {
conf: {name: 'gel', aliases: ["çek"], help: "Belirtilen kullanıcıyı size çeker.\n!gel @Striga/ID"},
stg: async(client, message, args, config, embed, nembed, SRol, SKanal, SEmoji) => {
let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if (!uye) return message.channel.send(nembed.setDescription("Lütfen bir kullanıcı belirt.")).then(x => x.delete({timeout:6500}), message.react(SEmojis.StgNo))  
if (!message.member.voice.channel || !uye.voice.channel) return message.channel.send(nembed.setDescription(`${uye} herhangi bir ses kanalında değil.`)).then(x => x.delete({timeout:6500}), message.react(SEmojis.StgNo)) 
  if (message.member.voice.channelID == uye.voice.channelID) return message.channel.send(nembed.setDescription(`${uye} ile aynı ses kanalındasın.`)).then(x => x.delete({timeout:6500}), message.react(SEmojis.StgNo))   
if (message.member.roles.highest.position < uye.roles.highest.position) { 
  const reactionFilter = (reaction, user) => {
    return ['✅'].includes(reaction.emoji.name) && user.id === uye.id;
  };
  message.channel.send(`${uye}`, {embed: embed.setDescription(`${message.author} seni ses kanalına çekmek istiyor onaylıyor musun ?`)}).then(async msj => {
    await msj.react('✅');
    msj.awaitReactions(reactionFilter, {max: 1, time: 15000, error: ['time']}).then(c => {
    coll => coll.first().catch(err => { mesaj.delete().catch(); return; })
      let cevap = c.first();
  if (cevap) {
    uye.voice.setChannel(message.member.voice.channelID);
        msj.delete();
        message.channel.send(embed.setDescription(`${uye} adlı kullanıcı ${message.member} kullanıcısına çekmesi için izin verdi. ${SEmojis.StgYes}`)).then(x => x.delete({timeout:15000}), message.react(SEmojis.StgYes))
  } else {
         msj.delete();
  message.channel.send(embed.setFooter(ayarlar.embed.altbaşlık).setDescription(`${uye} herhangi bir dönüş yapmadığı için işlem iptal edildi.`)).then(x => x.delete({timeout:6500}), message.react(SEmojis.StgNo))
  };
    });
  });
  } else {
    if (message.member.roles.cache.has(SRol.TasimaYetkilisi) || message.member.hasPermission('ADMINISTRATOR')) {
      await uye.voice.setChannel(message.member.voice.channelID);
      message.channel.send(embed.setDescription(`${message.member} adlı üye ${uye} kullanıcısını odasına çekti. ${SEmojis.StgYes}`)).then(x => x.delete({timeout:15000}), message.react(SEmojis.StgYes))
    } else {
      const reactionFilter = (reaction, user) => {
        return ['✅'].includes(reaction.emoji.name) && user.id === uye.id;
      };
    };
 };  

}};
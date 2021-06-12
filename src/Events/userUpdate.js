const { MessageEmbed } = require("discord.js");
const settings = require('../Config/Striga')
const roller = require('../Config/RolesConfig.json')
const kanallar = require('../Config/ChannelsConfig.json')
module.exports = async (oldUser, newUser) => {
if(oldUser.username == newUser.username || oldUser.bot || newUser.bot) return;
let client = oldUser.client;
let guild = client.guilds.cache.get(settings.serverID);
if(!guild) return;
let user = guild.members.cache.get(oldUser.id);
if(!user) return;

if(newUser.username.includes(settings.sunucuTag) && !user.roles.cache.has(roller.TagRolü)){
user.guild.channels.cache.get(kanallar.Tag_Log).send(new MessageEmbed().setAuthor(`Tag Alındı`).setDescription(`${user} adlı üye \`${settings.sunucuTag}\` tagımızı alarak ailemize katıldı!`).setColor("GREEN").setTimestamp().setFooter(`Developed By Striga.`));
if (roller.JailRolü && user.roles.cache.has(roller.JailRolü)) return;
if (roller.YasaklıTagRolü && user.roles.cache.has(roller.YasaklıTagRolü)) return;
user.roles.add(roller.TagRolü).catch();
if(user.manageable) user.setNickname(user.displayName.replace(settings.sunucuTag, settings.sunucuTag))
} else if(!newUser.username.includes(settings.sunucuTag) && user.roles.cache.has(roller.TagRolü)){
user.setNickname(user.displayName.replace(settings.sunucuTag, settings.tagsızTag))
let tagRol = guild.roles.cache.get(roller.TagRolü);
user.roles.remove(user.roles.cache.filter(rol => tagRol.position <= rol.position));
user.guild.channels.cache.get(kanallar.Tag_Log).send(new MessageEmbed().setAuthor(`Tag Bırakıldı`).setDescription(`${user} adlı üye \`${settings.sunucuTag}\` tagımızı bıraktı.`).setColor("RED").setTimestamp().setFooter(`Developed By Striga.`));
}

}
module.exports.conf = {name: "userUpdate"}
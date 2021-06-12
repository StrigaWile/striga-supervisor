const { Discord, MessageEmbed, Client, Collection } = require('discord.js')
const ms = require('ms')
const db = require('quick.db')
const moment = require('moment')
const cdb = new db.table('Cezalar')
const ydb = new db.table('Yetkili')
const kdb = new db.table('Kullanici')
const nodb = new db.table('CezaNumarasi')
const irole = require('../Config/RolesConfig.json')
const settings = require('../Config/Striga')
module.exports = async(message) => {
setInterval(() => {jailedMember(); mutedMember(); vmutedMember();}, 10000);
}
module.exports.conf = {name: "message"}


function jailedMember() {
let jailedMembers = cdb.get(`TempJail`, {Status: true}) || [];
for (let ceza of jailedMembers) {
let jailedUser = client.guilds.cache.get(settings.serverID).members.cache.get(ceza.User);
if (Date.now() >= ceza.FinishDate) {
cdb.set(`TempJail`, jailedMembers.filter(x => x.User !== ceza.User));
kdb.set(`cezano.${ceza.No}.Status`, false)  
kdb.set(`cezano.${ceza.No}.FinishDate`, Date.now())  
kdb.set(`cezano.${ceza.No}.Status`, false)   
jailedUser.roles.set(jailedUser.roles.cache.has(irole.BoosterRolü) ? [irole.BoosterRolü, irole.KayıtsızRol] : [irole.KayıtsızRol])
} else {
jailedUser.roles.set(jailedUser.roles.cache.has(irole.BoosterRolü) ? [irole.BoosterRolü, irole.JailRolü] : [irole.JailRolü])
}}}

function mutedMember() {
let mutedMembers = cdb.get(`TempMute`) || [];
for (let ceza of mutedMembers) {
let mutedUser = client.guilds.cache.get(settings.serverID).members.cache.get(ceza.User);
if (Date.now() >= ceza.FinishDate) {
cdb.set(`TempMute`, mutedMembers.filter(x => x.User !== ceza.User));
mutedUser.roles.remove(irole.MuteRolü)
} else {
mutedUser.roles.add(irole.MuteRolü)
}}}

function vmutedMember() {
let vmutedMembers = cdb.get(`TempVMute`) || [];
for (let ceza of vmutedMembers) {
let vmutedUser = client.guilds.cache.get(settings.serverID).members.cache.get(ceza.User);
if (Date.now() >= ceza.FinishDate) {
cdb.set(`TempMute`, vmutedMembers.filter(x => x.User !== ceza.User));
vmutedUser.roles.remove(irole.VoiceMuteRolü)
if (vmutedUser && vmutedUser.voice.channel && vmutedUser.voice.serverMute) vmutedUser.voice.setMute(false);
} else {
if (vmutedUser && vmutedUser.voice.channel && vmutedUser.voice.serverMute) vmutedUser.voice.setMute(true);
vmutedUser.roles.add(irole.VoiceMuteRolü)
}}}
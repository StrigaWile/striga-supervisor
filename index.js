const { Discord, MessageEmbed, Client, Collection } = require('discord.js')
const settings = require('./src/Config/Striga')
const client = global.client = new Client();
const db = require('quick.db')
const moment = require('moment')
require("moment-duration-format");
require("moment-timezone");
const ms = require('ms')
const fs = require('fs');

client.commands = new Collection();
client.aliases = new Collection();

fs.readdir('./src/Commands/', (err, files) => {
if (err) console.error(err);
console.log(`Toplam ${files.length} dosya var ve yükleniyor.`);
files.forEach(f => {
fs.readdir("./src/Commands/" + f, (err2, files2) => {
files2.forEach(file => {
let props = require(`./src/Commands/${f}/` + file);
console.log(`Bir dosya yükleniyor "${props.conf.name}".`);
client.commands.set(props.conf.name, props);
props.conf.aliases.forEach((alias) => {
client.aliases.set(alias, props.conf.name);
})})})})});

fs.readdir("./src/Events", (err, files) => {
if(err) return console.error(err);
files.filter(file => file.endsWith(".js")).forEach(file => {
let prop = require(`./src/Events/${file}`);
if(!prop.conf) return;
client.on(prop.conf.name, prop)})})

client.login(settings.token).then(console.log('API Kütüphaneya bağlandı.')).catch(err => console.error('API Kütüphaneye bağlanamadı işte hata sebebi: ' + err));

Array.prototype.random = function () {return this[Math.floor((Math.random()*this.length))]};
client.general = {"color1": "#389e60", "color2": "#ddd0a9", "color3": "#f23e38", "color4": "#344fa1", "color5": "#344fa1", "color6": "#51c2d5", "color7": "#6994f0", "color8": "#159ffd"}; client.generalColor = function () {return client.general[Object.keys(client.general).random()]}
client.man = {"color1": "#77acf1", "color2": "#51c4d3", "color3": "#8fd6e1", "color4": "#8ab6d6"}; client.manColor = function () {return client.man[Object.keys(client.man).random()]}
client.woman = {"color1": "#ff96ad", "color2": "#e798ae", "color3": "#e798ae", "color4": "#e4bad4"}; client.womanColor = function () {return client.woman[Object.keys(client.woman).random()]}
client.warn = {"color1": "#f23e38", "color2": "#d63b3b", "color3": "#bd2121", "color4": "#df0000"}; client.warnColor = function () {return client.warn[Object.keys(client.warn).random()]}
client.Types = {Ban: "BAN", TempJail: "JAIL", TempMute: "MUTE", TempVMute: "VMUTE", Warn: "WARN", Kick: "KICK", Suspect: "SUSPECT", PermaJail: "PERMA-JAIL", PermaMute: "PERMA-MUTE", PermaVMute: "PERMA-VMUTE"}

let aylartoplam = {"01": "Ocak", "02": "Şubat", "03": "Mart", "04": "Nisan", "05": "Mayıs", "06": "Haziran", "07": "Temmuz", "08": "Ağustos", "09": "Eylül", "10": "Ekim", "11": "Kasım", "12": "Aralık"};
global.aylar = aylartoplam;
const tarihsel = global.tarihsel = function(tarih) {
let tarihci = moment(tarih).tz("Europe/Istanbul").format("DD") + " " + global.aylar[moment(tarih).tz("Europe/Istanbul").format("MM")] + " " + moment(tarih).tz("Europe/Istanbul").format("YYYY HH:mm")   
return tarihci};
const sayilariCevir = global.sayilariCevir = function(x) {return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")};
const tarihhesapla = global.tarihHesapla = (date) => {
const startedAt = Date.parse(date);
var msecs = Math.abs(new Date() - startedAt);
const years = Math.floor(msecs / (1000 * 60 * 60 * 24 * 365)); msecs -= years * 1000 * 60 * 60 * 24 * 365; const months = Math.floor(msecs / (1000 * 60 * 60 * 24 * 30)); msecs -= months * 1000 * 60 * 60 * 24 * 30; const weeks = Math.floor(msecs / (1000 * 60 * 60 * 24 * 7)); msecs -= weeks * 1000 * 60 * 60 * 24 * 7; const days = Math.floor(msecs / (1000 * 60 * 60 * 24)); msecs -= days * 1000 * 60 * 60 * 24; const hours = Math.floor(msecs / (1000 * 60 * 60)); msecs -= hours * 1000 * 60 * 60; const mins = Math.floor((msecs / (1000 * 60))); msecs -= mins * 1000 * 60; const secs = Math.floor(msecs / 1000); msecs -= secs * 1000;
var string = ""; if (years > 0) string += `${years} yıl`; else if (months > 0) string += `${months} ay ${weeks > 0 ? weeks+" hafta" : ""}`; else if (weeks > 0) string += `${weeks} hafta ${days > 0 ? days+" gün" : ""}`; else if (days > 0) string += `${days} gün ${hours > 0 ? hours+" saat" : ""}`; else if (hours > 0) string += `${hours} saat ${mins > 0 ? mins+" dakika" : ""}`; else if (mins > 0) string += `${mins} dakika ${secs > 0 ? secs+" saniye" : ""}`; else if (secs > 0) string += `${secs} saniye`; else string += `saniyeler`; string = string.trim(); return `${string} önce`;};


const { Client, Collection } = require('discord.js')
const { token, prefix, color, loading, red, cross, api_token } = require('./config.json')
const Meme = require('memer-api');

const client = new Client({
  restTimeOffset: 0,

  intents: 32767,
  allowedMentions: { parse: ['users', 'roles'], repliedUser: false }
})

module.exports = client;
client.prefix = prefix;
client.memer = new Meme(api_token)  // Memer API Token from - https://discord.gg/emD44ZJaSA

client.commands = new Collection();
client.aliases = new Collection();
client.emoji = { loading , cross };
client.color = { blue: function () { return color[Math.floor(Math.random()*color.length)] }, red }


client.on('ready', async () => {
  console.log(`: ${client.user.tag} is ready!`);
  client.user.setActivity(`memer-api.js.org | ${prefix}help`, { type: 'PLAYING' });
})

client.on('warn', (info) => console.log(info))
client.on('error', console.error);

['command', 'events'].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});


client.login(process.env.token || token);
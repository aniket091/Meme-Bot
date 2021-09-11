const { MessageEmbed, Collection } = require('discord.js')
const client = require('../index');
const cooldowns = new Collection();
const { cross } = require('../config.json')
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");


client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  Prefix = client.prefix;

  //  PREFIX  MENTION !!
  if (message.content.includes(client.user.id) && message.content.trim().split(/ +/).length === 1) {
    message.reply({ embeds: [
      new MessageEmbed().setColor('BLURPLE')
      .setDescription(`**My Prefix is \`${Prefix}\`!**`)
    ]}).catch(e => {})
  }


  //  COMMAND  STUFF !!
  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(Prefix)})\\s*`);
  if (!prefixRegex.test(message.content)) return;

  const [, matchedPrefix] = message.content.match(prefixRegex);
  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = 
    client.commands.get(commandName) ||
    client.commands.get(client.aliases.get(commandName));

  if (!command) return;

  if (!message.channel.permissionsFor(client.user).has('SEND_MESSAGES')) {
    return message.author.send(`I don\'t have \`Send Messages\` permission in ${message.channel.name} channel!`).catch(e => {})
  }

  //  COMMAND  COOLDOWNS !!
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 1) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.channel.send(`**${cross} Please wait \`${Math.round(timeLeft)}\` more second(s) before reusing the \`${command.name}\` command!**`)
    }
  }
  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);


  //  EXECUTE  COMMAND !! 
  try {
    command.execute(client, message, args);
  } catch (error) {
    console.error(error);
    return message.channel.send(`**${cross} There was some problem executing that command!**`).catch(console.error);
  }
})

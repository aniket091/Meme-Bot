const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'ping',
  description: 'Shows the bot Latency!',
  aliases: ['latency'],
  permission: ['EMBED_LINKS'],

  execute(client, message) {

    const embed  = new MessageEmbed()
    .setColor('GREEN')
    .setTitle(`🏓 | Pong!`)
    .addField(`API Latency`, `\`${Math.round(client.ws.ping)} ms\``)
    .addField(`Bot Latency`, `\`${Math.round(Date.now() - message.createdTimestamp)} ms\``)

    message.channel.send('**Pinging...**').then((msg) => {
      msg.edit({ content: null, embeds: [embed] })
    })
  }
}

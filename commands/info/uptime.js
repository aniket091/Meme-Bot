const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'uptime',
  aliases: ['up'],
  description: 'Displays the uptime of the bot!',
  permission: ['EMBED_LINKS'],
  
  async execute(client, message) {

    let seconds = Math.floor(client.uptime / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    seconds %= 60;
    minutes %= 60;
    hours %= 24;
    
    const embed  = new MessageEmbed()
    .setColor('BLURPLE')
    .setTitle(`📈 **I have been online for: **\`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds\``)
    
    return message.channel.send({ embeds: [embed]})
   
  }
}

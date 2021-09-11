const { MessageEmbed, MessageAttachment } = require('discord.js');

module.exports = {
  name: 'fakenews',
  description: 'Memer Api Image Command',
  aliases: [],
  usage: 'fakenews [@user]',
  permission: ['EMBED_LINKS'],

  async execute(client, message, args) {
    
    const meme = 'fakenews.png';

    const emojis = client.emoji.loading;
    const tempMsg = await message.channel.send(`${emojis[Math.floor(Math.random()*emojis.length)]}`)

    const user = message.mentions.users.first() || message.author;
    const avatar = user.displayAvatarURL({ format: 'png' });

    const image = await client.memer.fakenews(avatar);
    const attachment = new MessageAttachment(image, meme);

    const embed = new MessageEmbed()
    .setColor(client.color.blue())
    .setImage('attachment://' + meme)
    .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))


    tempMsg.delete()
    return message.channel.send({ embeds: [embed], files: [attachment] })
  }
}
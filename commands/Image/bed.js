const { MessageEmbed, MessageAttachment } = require('discord.js');

module.exports = {
  name: 'bed',
  description: 'Memer Api Image Command',
  aliases: [],
  usage: 'bed [@user]',
  permission: ['EMBED_LINKS'],

  async execute(client, message, args) {
    
    const user1 = message.mentions.users.first();

    if (!user1) return message.channel.send({ embeds: [
      new MessageEmbed().setColor(client.color.red)
      .setDescription(`**${client.emoji.cross} You need to mention an user!**`)
    ]})

    let user2 = message.mentions.users.last() || message.author;
    if(user2.id == user1.id) user2 = message.author;

    if(user2.id == user1.id) return message.channel.send({ embeds: [
      new MessageEmbed().setColor(client.color.red)
      .setDescription(`**${client.emoji.cross} You need to mention an user!**`)
    ]})

    const meme = 'bed.png';

    const emojis = client.emoji.loading;
    const tempMsg = await message.channel.send(`${emojis[Math.floor(Math.random()*emojis.length)]}`)


    const avatar1 = user1.displayAvatarURL({ format: 'png' });
    const avatar2 = user2.displayAvatarURL({ format: 'png' });

    const image = await client.memer.bed(avatar1, avatar2);
    const attachment = new MessageAttachment(image, meme);

    const embed = new MessageEmbed()
    .setColor(client.color.blue())
    .setImage('attachment://' + meme)
    .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))


    tempMsg.delete()
    return message.channel.send({ embeds: [embed], files: [attachment] })
  }
}
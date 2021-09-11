const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
  name: 'help',
  description: 'Displays the help menu!',
  aliases: ['h', 'commands'],
  cooldown: 3,
  usage: 'help [ Command ]',
  permission: ['EMBED_LINKS'],

  async execute(client, message, args) {

    if (args[0]) {
      const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
      if (!cmd || !cmd.name) {
        return message.channel.send(`**<:error:862374824482963476> It seems like \`${args[0].toLowerCase()}\` is not a valid command! Please try Again!**`)
      }

      const embed = new MessageEmbed()
      .setColor('BLURPLE')
      .setAuthor(`${toTitleCase(cmd.name)} Command!`, client.user.displayAvatarURL({ dynamic: true }))
      .addField('Name', cmd.name)
      .addField('Description', cmd.description || 'No Description provided!')
      .addField('Aliase(s)', cmd.aliases.map((a) => `**\`${a}\`**`).join(", ") || 'No Aliases provided!')
      .setTimestamp()
      .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true}))


      if (cmd.cooldown) embed.addField('Cooldown', `**\`${cmd.cooldown} Seconds\`**`)
      if (cmd.usage) {
        var usage = cmd.usage.split('\n').map(i => { return client.prefix + i})
        embed.addField('Usage', `**\`${usage.join('` \n`')}\`**`)
      }

      return message.channel.send({ embeds: [embed] })
    }


    let embed = new MessageEmbed()
    .setTitle('Meme Bot Help')
    .setColor('BLURPLE')
    .addField('ℹ️  Information', commandsData(client.commands.filter(c => c.category === 'info')))
    .addField('🖼️  Image', commandsData(client.commands.filter(c => c.category === 'Image')))
    .addField('✏️  Meme', commandsData(client.commands.filter(c => c.category === 'text')))
    .setThumbnail('https://cdn.discordapp.com/attachments/818900078077018162/857601168724721684/memer_api.gif')
    .setFooter('Memer-Api.js.org ❤️', message.client.user.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .addField('Important Links', `**[Invite Me](https://discord.com/api/oauth2/authorize?client_id=830476826413498478&permissions=8&scope=bot%20applications.commands) | [Support Server](https://discord.gg/emD44ZJaSA)**`)
    
 
    return message.channel.send({ embeds: [embed], components: [buttons()] })
  }
};


function toTitleCase(text) {
  const content = text[0].toUpperCase() + text.slice(1, text.length)
  return content;
}

function commandsData(commands) {
  const content = commands.map(i => '`' + i.name + '`').join('  ')
  return '**' + content + '**';
}

function buttons() {
  const btn1 = new MessageButton()
  .setStyle('LINK')
  .setLabel('Invite Me')
  .setEmoji('✏️')
  .setURL('https://discord.com/api/oauth2/authorize?client_id=830476826413498478&permissions=8&scope=bot%20applications.commands')

  const btn2 = new MessageButton()
  .setStyle('LINK')
  .setLabel('Support Server!')
  .setEmoji('❔')
  .setURL('https://discord.gg/emD44ZJaSA')


  const row = new MessageActionRow()
  .addComponents(btn1, btn2)

  return row;
}
const { MessageEmbed, MessageAttachment } = require("discord.js");
const { blue } = require("../../botconfig/embed.json");

module.exports = {
  name: "whodidthis",
  aliases: [],
  category: "Memer",
  description: "IMAGE CMD",
  usage: "whodidthis @User",

  run: async (client, message) => {

    var tempmsg = await message.channel.send("<a:loading:856385452868763688>")

    var user = message.mentions.users.first() || message.author;
    var avatar = user.displayAvatarURL({ format: "png" });

    client.memer.whodidthis(avatar).then(image => {

      var attachment = new MessageAttachment(image, "whodidthis.png");

      tempmsg.delete()
      
      const embed = new MessageEmbed()
      .setColor(blue)
      .setImage("attachment://whodidthis.png")
      .attachFiles(attachment)
      .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      
      return message.channel.send(embed).catch()
      
    })
      
  }
}
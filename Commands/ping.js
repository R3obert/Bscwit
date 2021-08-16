const Discord = require('discord.js');

exports.run = async (bot, message, args) => {
    let waiting = await message.channel
     .send('**Pinging :hourglass:...**')
     .catch(console.error);
    let embed = new Discord.MessageEmbed()
   
     .setTitle("Bscwit's & API's Latency")
     .setColor('RANDOM')
     .addField(
      'Bscwit :',
      `${waiting.createdTimestamp - message.createdTimestamp}` + 'ms',
      true
     )
     .addField('API Latency:', Math.round(bot.ws.ping) + 'ms')
     .setImage(bot.user.AvatarURL)
     .setFooter('Bscwit | Requested by ' + message.author.tag);
   
    waiting.edit(embed).catch(console.error);
   };
   
   module.exports.help = {
    name: 'ping',
    description: "Calculate Bscwit's & API's Latency.",
    usage: 'ping',
    example: 'ping',
   };
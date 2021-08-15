const Discord = require("discord.js");
const fs = require("fs");

const client = new Discord.Client();
const config = require("./config.json");
// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!
client.config = config;


fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
});

//Welcome & goodbye messages\\
client.on('guildMemberAdd', member => {
  member.roles.add(member.guild.roles.cache.find(i => i.name === 'New Member'))

  const welcomeEmbed = new Discord.MessageEmbed()

  welcomeEmbed.setColor('RANDOM')
  welcomeEmbed.setTitle('**' + member.user.username + '** is now with us along other **' + member.guild.memberCount + '** people')
  welcomeEmbed.setImage('https://media.tenor.com/images/981d41809048e0a6f482c68af428d30a/tenor.gif')

  member.guild.channels.cache.find(i => i.name === 'greetings').send(welcomeEmbed)
})

client.on('guildMemberRemove', member => {
  const goodbyeEmbed = new Discord.MessageEmbed()

  goodbyeEmbed.setColor('RANDOM')
  goodbyeEmbed.setTitle('**' + member.user.username + '** has left us! :c We are **' + member.guild.memberCount + '** left!')
  goodbyeEmbed.setImage('https://media.tenor.com/images/6ed6c00826f75f1a24921663581576cd/tenor.gif')

  member.guild.channels.cache.find(i => i.name === 'greetings').send(goodbyeEmbed)
})
//Welcome & goodbye messages end\\


client.login(config.token);

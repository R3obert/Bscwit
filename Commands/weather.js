const weather = require('weather-js');
const Discord = require('discord.js')

//Time to end stream
module.exports = {
name: "weather",
description: "Get the weather around the world.",
run: (client, message, args) => {

    if(!args.length) {
        return message.channel.send("**Please give the weather location!**")
    }

weather.find({search: args.join(" "), degreeType: 'F'}, function(err, result) {
    try {
        let embed = new Discord.MessageEmbed()
        .setTitle(`Weather - ${result[0].location.name}`)
        .addField("Temperature", `${result[0].current.temperature} Fahrenheit`, true)
        .addField("Sky Text", result[0].current.skytext, true)
        .addField("Humidity", result[0].current.humidity, true)
        .addField("Wind Speed", result[0].current.windspeed, true)
        .addField("Observation Time", result[0].current.observationtime, true)
        .addField("Wind Display", result[0].current.winddisplay, true)
        .setThumbnail(result[0].current.imageUrl);
        message.channel.send(embed)
    } catch(err) {
        return message.channel.send("Unable to get the data of Given")
    }
})
}    
}
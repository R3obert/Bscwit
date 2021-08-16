exports.run = (client, message, [mention, ...reason]) => {
    const modRole = message.guild.roles.cache.find(role => role.name === "Moderator");
    if (!modRole)
      return message.reply("**❌The Moderator role does not exist! Please create one! ❌**");
  
    if (!message.member.roles.cache.has(modRole.id))
      return message.reply("**❌You can't use this command. ❌**");
  
    if (message.mentions.members.size === 0)
      return message.reply("Please mention a user to kick‼️");
  
    if (!message.guild.me.permissions.has("KICK_MEMBERS"))
      return message.reply("**You don't have this permission!**");
  
    const kickMember = message.mentions.members.first();
  
    kickMember.kick(reason.join(" ")).then(member => {
      message.reply(`**${member.user.username} was succesfully kicked. ✅**`);
    });
  };
  
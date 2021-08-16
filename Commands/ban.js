exports.run = (client, message, [mention, ...reason]) => {
    const adminRole = message.guild.roles.cache.find(role => role.name === "Administrator");
    if (!adminRole)
      return message.reply("**❌The Administrator role does not exist! Please create one! ❌**");
  
    if (!message.member.roles.cache.has(adminRole.id))
      return message.reply("**❌You can't use this command. ❌**");
  
    if (message.mentions.members.size === 0)
      return message.reply("**Please mention a user to ban!**");
  
    if (!message.guild.me.permissions.has("BAN_MEMBERS"))
      return message.reply("**You don't have this permission!**");
  
    const banMember = message.mentions.members.first();
  
    banMember.ban(reason.join(" ")).then(member => {
      message.reply(`**${member.user.username} was succesfully banned. ✅**`);
    });
  };
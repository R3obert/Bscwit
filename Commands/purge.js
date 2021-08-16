exports.run = (client, message) => {
    const args = message.content.split(' ').slice(1); // All arguemnts behind this command name with the prefix
    const amount = args.join(' '); //Amount of messages which should be deleted

    if (!amount) return message.reply("**You havent't given an amount of message for me to delete!**");

    if(isNaN(amount)) return message.reply('**Please type a number senpai! I can\'t delete words!**');

    if (amount > 100) return message.reply("**You can't delete more than 100 messages!**");

    if (amount < 1) return message.reply("**I'm sorry but you need to delete more than 1 message!**");

     message.channel.messages.fetch({ limit: amount }).then(messages => {
        message.channel.bulkDelete(messages) && message.reply("**I deleted **" + amount + "** messages!**")
    });
}
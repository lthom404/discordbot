module.exports = {
    name: 'balance',
    description: 'Display a user\'s balance',
    async run(message) {
        const user = message.mentions.users.first() || client.users.get(args[0]) || message.author;
        let balance = await message.client.balance.get(user.id);
        if (!balance) balance = 0;
        message.channel.send(`${user.tag}'s balance is $${balance}`);
    }
}
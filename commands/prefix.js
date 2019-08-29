module.exports = {
    name: 'prefix',
    description: 'Changes the guild prefix.',
    async run(message, args) {
        if (!args.length) {
            return message.channel.send('Provide the prefix to set guild prefix');
        }
        await message.client.prefixes.set(message.guild.id, args[0]);
        return message.channel.send(`Prefix is now ${await message.client.prefixes.get(message.guild.id) || message.client.prefix}`);
    }
}
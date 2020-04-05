module.exports = {
	name: 'prefix',
	description: 'Changes the guild prefix.',
	category: 'configuration',
	async run({ client, channel, guild }, [...prefix]) {
		if (!prefix.length) {
			return channel.send('Provide the prefix to set guild prefix');
		}

		await client.Guild.set(guild.id, prefix.join(' '), 'prefix');
		channel.send(`Prefix is now \`${prefix.join(' ') || client.prefix}\``);
	},
};

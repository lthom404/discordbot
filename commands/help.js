const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'help',
	description: 'Obtain a list of commands available.',
	category: 'configuration',
	async run({ client, channel, author }, [...prefix]) {
		const embed = new MessageEmbed()
			.setAuthor(author.username, author.displayAvatarURL())
			.setColor('RANDOM');
		const categories = [
			...new Set(client.commands.map((command) => command.category)),
		];

		for (const category of categories) {
			const commands = client.commands.filter(
				(command) => command.category === category
			);
			embed.addField(
				category[0].toUpperCase() + category.slice(1),
				commands.map((command) => command.name).join(', ')
			);
		}

		channel.send(embed);
	},
};

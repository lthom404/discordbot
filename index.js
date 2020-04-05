const { readdirSync } = require('fs');
const { Client, Collection } = require('discord.js');
const { Endb } = require('endb');
const {
	TOKEN,
	PREFIX,
	DATABASE,
	COMMAND_DIR,
	EVENT_DIR,
} = require('./config.json');

// Initialization
const client = new Client();
client.commands = new Collection();
client.events = new Collection();
client.prefix = PREFIX;

// Database
client.Guild = new Endb({
	uri: `sqlite://${DATABASE}`,
	table: 'guild',
});

// Command Handler
const commandFiles = readdirSync(COMMAND_DIR).filter((file) =>
	file.endsWith('.js')
);
for (const file of commandFiles) {
	const command = require(`${COMMAND_DIR}/${file}`);
	client.commands.set(command.name, command);
}

// Event Handler
const eventFiles = readdirSync(EVENT_DIR).filter((file) =>
	file.endsWith('.js')
);
for (const file of eventFiles) {
	const event = require(`${EVENT_DIR}/${file}`);
	client.on(
		event.name ? event.name : file.split('.')[0],
		event.run.bind(null, client)
	);
	delete require.cache[require.resolve(`${EVENT_DIR}/${file}`)];
}

client.login(TOKEN);

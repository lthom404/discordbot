const fs = require('fs');
const Discord = require('discord.js');
const Endb = require('endb');
const { TOKEN, PREFIX, DATABASE, COMMAND_DIR, EVENT_DIR } = require('./config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.prefix = PREFIX;

// Database
const uri = `sqlite://${DATABASE}.sqlite`;
client.prefixes = new Endb(uri, { namespace: 'prefixes' });
client.balance = new Endb(uri, { namespace: 'balance' });

// Command Handler
const commandFiles = fs.readdirSync(COMMAND_DIR).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`${COMMAND_DIR}/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
    if (message.author.bot) return;
    let prefix;
    const data = await client.prefixes.get(message.guild.id);
    if (data) {
        prefix = data;
    } else {
        prefix = PREFIX;
    }
    if (!prefix) return;
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).split(/\s+/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);

    try {
        command.run(message, args);
    } catch (err) {
        throw err;
    }
});

client.login(TOKEN);
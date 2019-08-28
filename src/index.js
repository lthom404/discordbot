const Discord = require('discord.js');
const Endb = require('endb');
const config = require('./config.json');
const client = new Discord.Client();
client.prefixes = new Endb('sqlite://database.sqlite', { namespace: 'prefixes' });

client.on('message', async message => {
    console.log(message.content)
    if (message.author.bot) return;
    let prefix;
    const data = await client.prefixes.get(message.guild.id);
    if (data) {
        prefix = data;
    } else {
        prefix = config.PREFIX;
    }
    if (!prefix) return;
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).split(/\s+/);
    const command = args.shift().toLowerCase();

    if (command === 'prefix') {
        if (!args.length) {
            return message.channel.send('Provide the prefix to set guild prefix');
        }
        await client.prefixes.set(message.guild.id, args[0]);
        return message.channel.send(`Prefix is now ${await client.prefixes.get(message.guild.id)}`);
    }
});

client.login(config.TOKEN);
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();
const prefix = process.env.PREFIX;

client.commands = new Discord.Collection();
const commandFiles = fs
    .readdirSync('./commands')
    .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log(`Bot ${client.user.tag} (${client.user.id}) is ready.`);

    client.setInterval(() => {
        client.user
            .setPresence({
                status: 'online',
                activity: {
                    name: `${client.guilds.cache.size} servers | y!help`,
                    type: 'WATCHING',
                },
            })
            .catch(console.error);
    }, 60000);
});

client.on('message', async (message) => {
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member)
        message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).split(/ +/g);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}.`;

        if (command.usage)
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\`.`;

        return message.channel.send({
            embed: {
                description: ':warning: ' + reply,
                color: 16763981,
                footer: {
                    text: 'Requested by ' + message.author.tag,
                    icon_url: message.author.displayAvatarURL,
                },
                timestamp: new Date(),
            },
        });
    }

    try {
        command.execute(client, message, args);
    } catch (error) {
        console.error(error);
        message.channel.send({
            embed: {
                description: ':sos: An unknown error occurred.',
                color: 14101826,
                footer: {
                    text: 'Requested by ' + message.author.tag,
                    icon_url: message.author.displayAvatarURL,
                },
                timestamp: new Date(),
            },
        });
    }
});

client.login(process.env.TOKEN);

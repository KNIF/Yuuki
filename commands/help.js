if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const prefix = process.env.PREFIX;

module.exports = {
    name: 'help',
    description: 'List all of my commands or info about a specific command.',
    usage: '[command name]',
    execute: async (client, message, args) => {
        const data = [];
        const { commands } = message.client;

        if (!args.length) {
            data.push("Here's a list of all my commands:");
            data.push(
                '`' + commands.map((command) => command.name).join(', ') + '`'
            );
            data.push(
                `\nYou can send \`${prefix}help [command name]\` to get info on a specific command.`
            );

            return message.channel.send({
                embed: {
                    title: ':regional_indicator_h:elp',
                    description: data.join('\n'),
                    color: 3835585,
                    footer: {
                        text: 'Requested by ' + message.author.tag,
                        icon_url: message.author.displayAvatarURL,
                    },
                    timestamp: new Date(),
                },
            });
        }

        const name = args[0].toLowerCase();
        const command =
            commands.get(name) ||
            commands.find((c) => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.channel.send({
                embed: {
                    description: ":warning: That's not a valid command.",
                    color: 16763981,
                    footer: {
                        text: 'Requested by ' + message.author.tag,
                        icon_url: message.author.displayAvatarURL,
                    },
                    timestamp: new Date(),
                },
            });
        }

        data.push(`**Name:** ${command.name}`);

        if (command.aliases)
            data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description)
            data.push(`**Description:** ${command.description}`);
        if (command.usage)
            data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

        message.channel.send({
            embed: {
                title: ':regional_indicator_h:elp',
                description: data.join('\n'),
                color: 3835585,
                footer: {
                    text: 'Requested by ' + message.author.tag,
                    icon_url: message.author.displayAvatarURL,
                },
                timestamp: new Date(),
            },
        });
    },
};

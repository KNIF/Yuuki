module.exports = {
    name: 'info',
    description: 'Shows info about the author.',
    execute: async (client, message, args) => {
        message.channel.send({
            embed: {
                title: ':information_source: Info',
                description: 'Author: `KNIF#0001`.',
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

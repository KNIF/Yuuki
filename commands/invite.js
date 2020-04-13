module.exports = {
    name: 'invite',
    description: 'Shows the invite link.',
    execute: async (client, message, args) => {
        message.channel.send({
            embed: {
                title: ':information_source: Invite',
                description:
                    'https://discordapp.com/api/oauth2/authorize?client_id=699321659194212443&permissions=8&scope=bot',
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

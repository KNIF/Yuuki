module.exports = {
  name: 'say',
  description: 'Says something as the bot.',
  usage: '[message]',
  execute: async (client, message, args) => {
    message.channel.send({
      embed: {
        description: args.join(' '),
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

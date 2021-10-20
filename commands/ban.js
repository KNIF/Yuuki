module.exports = {
  name: 'ban',
  description: 'Bans a member from the server.',
  usage: '[member]',
  execute: async (client, message, args) => {
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        if (!message.member.hasPermission('BAN_MEMBERS')) {
          return message.channel.send({
            embed: {
              description: ":warning: You don't have permission to ban.",
              color: 16763981,
              footer: {
                text: 'Requested by ' + message.author.tag,
                icon_url: message.author.displayAvatarURL,
              },
              timestamp: new Date(),
            },
          });
        }

        member
          .ban()
          .then(() => {
            return message.channel.send({
              embed: {
                description: `:white_check_mark: Successfully banned ${user.tag}.`,
                color: 7778644,
                footer: {
                  text: 'Requested by ' + message.author.tag,
                  icon_url: message.author.displayAvatarURL,
                },
                timestamp: new Date(),
              },
            });
          })
          .catch((err) => {
            return message.channel.send({
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
          });
      } else {
        return message.channel.send({
          embed: {
            description: ":warning: That user isn't in this guild.",
            color: 16763981,
            footer: {
              text: 'Requested by ' + message.author.tag,
              icon_url: message.author.displayAvatarURL,
            },
            timestamp: new Date(),
          },
        });
      }
    } else {
      return message.channel.send({
        embed: {
          description: ":warning: You didn't mention the user to ban.",
          color: 16763981,
          footer: {
            text: 'Requested by ' + message.author.tag,
            icon_url: message.author.displayAvatarURL,
          },
          timestamp: new Date(),
        },
      });
    }
  },
};

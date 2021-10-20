module.exports = {
  name: 'ping',
  description: 'Shows the ping and uptime.',
  execute: async (client, message, args) => {
    let botMsg = await message.channel.send('〽️ Pinging');

    botMsg
      .edit({
        embed: {
          title: ':signal_strength: Ping',
          description: [
            `**Server**: \`${Math.floor(
              botMsg.createdAt - message.createdAt
            )}ms\``,
            `**Uptime**: \`${msToTime(client.uptime)}\``,
          ].join('\n'),
          color: 3835585,
          footer: {
            text: 'Requested by ' + message.author.tag,
            icon_url: message.author.displayAvatarURL,
          },
          timestamp: new Date(),
        },
      })
      .catch(() =>
        botMsg.edit(
          ':sos: An unknown error occurred. Do I have permission to embed links?'
        )
      );
  },
};

function msToTime(ms) {
  days = Math.floor(ms / 86400000);
  daysms = ms % 86400000;
  hours = Math.floor(daysms / 3600000);
  hoursms = ms % 3600000;
  minutes = Math.floor(hoursms / 60000);
  minutesms = ms % 60000;
  sec = Math.floor(minutesms / 1000);

  let str = '';
  if (days) str = str + days + 'd';
  if (hours) str = str + hours + 'h';
  if (minutes) str = str + minutes + 'm';
  if (sec) str = str + sec + 's';

  return str;
}

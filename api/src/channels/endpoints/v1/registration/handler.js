/**
 * Created by leonardo on 12/9/16.
 */

const uuid = require('uuid/v1');
const Chance = require('chance');
const chance = new Chance();


const handler = (client) => {
  return (request, reply) => {
    const channelName = request.params.channel;
    const key = `chat:channels:${channelName}:messages`;

    client.scard(key, (err, total) => {
      const username = chance.name();
      if (total === 0) {
        const channel = {
          id: uuid(),
          name: channelName
        };
        const message = {username, channel, text: 'Created the channel', date: new Date()};
        const response = {channel, username, messages: [message]};
        client.sadd(key, JSON.stringify(message), (err, res) => reply(response).code(201));

      } else {
        client.smembers(key, (err, messages) => {
          const channel = JSON.parse(messages[0]).channel;
          const m = messages.map(JSON.parse);
          const m2 = m.sort((last, next) => last.date < next.date ? -1 : 1);
          const response = {channel, username, messages: m2};
          reply(response).code(200);
        });
      }
    });
  }
};

module.exports = handler;
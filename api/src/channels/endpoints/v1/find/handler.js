/**
 * Created by leonardo on 12/9/16.
 */

const handler = (client) => {
  return (request, reply) => {
    const channel = request.params.channel;
    client.smembers(`chat:channels:${channel}:messages`, (err, messages) => {
      reply(messages).code(200);
    });
  }
};

module.exports = handler;
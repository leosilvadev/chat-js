/**
 * Created by leonardo on 12/10/16.
 */

const keyFor = (channelName) => `chat:channels:${channelName}:messages`;

const MessagePersistor = (client) => {
  return {
    persist: (message, callback) => {
      const key = keyFor(message.channel.name);
      client.sadd(key, JSON.stringify(message), (err, res) => callback(err, res));
    }
  };
};

module.exports = MessagePersistor;
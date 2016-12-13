/**
 * Created by leonardo on 12/10/16.
 */

const keyFor = (channelName) => `chat:channels:${channelName}:messages`;

const MessagePersistor = (client) => {
  const persist = (message, onSuccess, onError) => {
    const key = keyFor(message.channel.name);
    client.sadd(key, JSON.stringify(message), (err, res) => {
      if (err) {
        onError(err);
      } else {
        onSuccess();
      }
    });
  };

  return {
    persist
  }
};

module.exports = MessagePersistor;
/**
 * Created by leonardo on 12/10/16.
 */

const byDateAsc = (last, next) => last.date < next.date ? -1 : 1;

const keyFor = (channelName) => `chat:channels:${channelName}:messages`;

const MessageFinder = (client) => {
  const findAll = (channelName, onSuccess, onError) => {
    const key = keyFor(channelName);
    client.smembers(key, (err, messages) => {
      if (err) {
        onError(err);

      } else if (messages) {
        onSuccess(messages.map(JSON.parse).sort(byDateAsc));

      } else {
        onError(Error(`No messages found for channel: ${channelName}`));

      }
    });
  };

  const exists = (channelName, onExists, onNotFound, onError) => {
    const key = keyFor(channelName);
    client.scard(key, (err, total) => {
      if (err) {
        onError(err);

      } else if (total > 0) {
        onExists();

      } else {
        onNotFound();

      }
    });
  };

  return {
    findAll,
    exists,
  }
};

module.exports = MessageFinder;
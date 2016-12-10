/**
 * Created by leonardo on 12/10/16.
 */

const byDateAsc = (last, next) => last.date < next.date ? -1 : 1;

const MessageFinder = (client) => {
  return {
    findAll: (channelName, onSuccess, onError) => {
      const key = `chat:channels:${channelName}:messages`;
      client.smembers(key, (err, messages) => {
        if (err) {
          onError(err);

        } else if (messages) {
          onSuccess(messages.map(JSON.parse).sort(byDateAsc));

        } else {
          onError(Error(`No messages found for channel: ${channelName}`));

        }
      });
    },

    exists: (channelName, onExists, onNotFound, onError) => {
      const key = `chat:channels:${channelName}:messages`;
      client.scard(key, (err, total) => {
        if (err) {
          onError(err);

        } else if (total > 0){
          onExists();

        } else {
          onNotFound();

        }
      });
    }
  };
};

module.exports = MessageFinder;
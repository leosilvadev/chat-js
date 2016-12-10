/**
 * Created by leonardo on 12/10/16.
 */
const persistor = (client) => {
  return {
    persist: (message, callback) => {
      const key = `chat:channels:${message.channel.name}:messages`;
      client.sadd(key, JSON.stringify(message), (err, res) => callback(err, res));
    }
  };
};

module.exports = persistor;
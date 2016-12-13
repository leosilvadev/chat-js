/**
 * Created by leonardo on 12/11/16.
 */
const socket = require('socket.io'),
  MessagePersistor = require('../services/persistor'),
  wsChannel = 'send-chat-message';

const MessageListener = (listener) => {
  const io = socket(listener);

  const listen = (client) => {
    const messagePersistor = MessagePersistor(client);

    io.on('connection', socket => {
      socket.on(wsChannel, data => {
        const message = JSON.parse(data);
        message.date = new Date();
        messagePersistor.persist(message, () => io.emit(message.channel.id, JSON.stringify(message)), (err) => console.log(err));
      });
    });
  };

  return {
    listen
  };
};

module.exports = MessageListener;
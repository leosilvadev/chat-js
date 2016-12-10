/**
 * Created by leonardo on 12/9/16.
 */

const uuid = require('uuid/v1'),
  chance = require('chance')(),
  MessagePersistor = require('../../../../messages/services/persistor'),
  MessageFinder = require('../../../../messages/services/finder');

const handler = (client) => {
  const messagePersistor = MessagePersistor(client);
  const messageFinder = MessageFinder(client);

  const returnAllChannelMessages = (channelName, reply) => {
    return () => {
      const username = chance.name();
      messageFinder.findAll(channelName, messages => {
        const channel = messages[0].channel;
        const response = {channel, username, messages};
        reply(response).code(200);
      });
    }
  };

  const returnCreatedChannel = (channelName, reply) => {
    return () => {
      const username = chance.name();
      const channel = {
        id: uuid(),
        name: channelName
      };
      const message = {username, channel, text: 'Created the channel', date: new Date()};
      const response = {channel, username, messages: [message]};
      messagePersistor.persist(message, (err, res) => reply(response).code(201));
    }
  };

  const returnError = reply => err => reply({message: err}).code(500);

  return (request, reply) => {
    const channelName = request.params.channel;
    messageFinder.exists(channelName,
      returnAllChannelMessages(channelName, reply),
      returnCreatedChannel(channelName, reply),
      returnError(reply)
    );
  };

};

module.exports = handler;
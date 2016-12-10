/**
 * Created by leonardo on 12/9/16.
 */

const Hapi = require('hapi'),
  redis = require("redis"),
  client = redis.createClient(),
  persistor = require('./channels/services/persistor')(client),
  MessageRouter = require('./channels/router');

client.on("error", (err) => console.error(err));

const server = new Hapi.Server();
server.connection({port: 3000});

const io = require('socket.io')(server.listener);
io.on('connection', socket => {
  socket.on('send-chat-message', data => {
    const message = JSON.parse(data);
    message.date = new Date();
    persistor.persist(message, (err, response) => io.emit(message.channel.id, JSON.stringify(message)));
  });
});

new MessageRouter(server, client).route();

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});
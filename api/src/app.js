/**
 * Created by leonardo on 12/9/16.
 */

const Hapi = require('hapi'),
  client = require("redis").createClient(),
  MessageRouter = require('./channels/router'),
  MessageListener = require('./messages/listeners/listener');

client.on("error", (err) => console.error(err));

const server = new Hapi.Server();
server.connection({port: 3000});

MessageRouter(server, client).route();
MessageListener(server.listener).listen(client);

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});
/**
 * Created by leonardo on 12/9/16.
 */

const registrationHandler = require('./endpoints/v1/registration/handler');

const Router = (server, client) => {
  const route = () => {
    routeRegistration(server, client);
  };

  return {
    route
  }
}

const routeRegistration = (server, client) => {
  server.route({
    method: 'GET',
    path: '/v1/channels/{channel}',
    handler: registrationHandler(client),
    config: {
      cors: {
        origin: ['*']
      }
    },
  });
};

module.exports = Router;
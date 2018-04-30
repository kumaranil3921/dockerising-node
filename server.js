

const hapi = require('hapi');
const Config = require('./config');
const Routes = require('./routes');
const Plugins = require('./plugins');
const Bootstrap = require('./utilityFunctions/bootstrap.js');

const server = new hapi.Server({
  app: {
    name: process.env.PORT || Config.APP_CONSTANTS.SERVER.APP_NAME,
  },
  debug: {
    request: [
      'error',
      'database',
      'read',
    ],
  },

});
server.connection({
  port: Config.APP_CONSTANTS.SERVER.PORT,
  routes: { cors: true },
});
server.register(Plugins, (err) => {
  if (err) {
    server.error(Config.APP_CONSTANTS.SERVER.PLUGINS_LOADING_ERROR);
  } else {
    server.log(Config.APP_CONSTANTS.SERVER.PLUGINS_LOADING_SUCCESS);
  }
});

server.route(Routes);

Bootstrap.bootstrapAdmin((err) => {
  if (err) {
    console.log(Config.APP_CONSTANTS.SERVER.BOOTSTRAP_ERROR);
  } else {
    console.log(Config.APP_CONSTANTS.SERVER.BOOTSTRAP_SUCCESS);
  }
});
server.start(() => {
  console.log(`Server running at: ${server.info.uri}`);
});
server.on('response', (request) => {
  const log = {
    path: request.path,
    requestBody: request.payload || request.query,
    statusCode: request.response.statusCode,
  };
  console.log(`Server Response -- >>${new Date()} --> ${JSON.stringify(log)}\n\n`);
});

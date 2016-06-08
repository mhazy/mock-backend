const config = require('./server/config');
const plugins = require('./server/config/plugins');
const routes = require('./server/routes');
const Hapi = require('hapi');
const server = new Hapi.Server();

// Setup server connection
server.connection({
  host: config.host,
  port: config.port,
  routes: config.hapi.options.routes
});

// Register plugins and start server
server.register(plugins, function(err) {
  if (err) {
    throw err;
  }
  // Start server and register routes
  server.start(() => {
    server.route(routes);
    console.log('Hapi server started @ ' + server.info.uri.replace('0.0.0.0', 'localhost'));
  });
});

module.exports = server;

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
    server.start(function() {
      // Load routes
      server.route(require('./server/routes')(server));
      console.log('Hapi server started @ ' + server.info.uri.replace('0.0.0.0', 'localhost'));
    });
  });

module.exports = server;

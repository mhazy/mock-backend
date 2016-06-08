const config = require('./server/config'); // Default configuration
const createServer = require('./server');
const serverConfig = {
  host: config.host,
  port: config.port,
  routes: config.hapi.routes
};

// Create a server with default configuration
createServer(serverConfig)
  .then(server => {
    console.log('Hapi server started:', server.info.uri.replace('0.0.0.0', 'localhost'));
  })
  .catch(err => {
    console.log('Failed to start server:', err.message);
  });

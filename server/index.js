const plugins = require('./config/plugins');
const routes = require('./routes');
const Hapi = require('hapi');

/**
 * Create server, returns promise when the server is started
 * @param {object} [config] Configuration object
 * @param {string} [config.host] Host to bind server to
 * @param {number} [config.port] Port to bind server to
 * @param {routes} [config.routes] Hapi route options (e.g. CORS)
 * @returns {Promise}
 */
const createServer = (config) => {
  return new Promise((resolve, reject) => {
    const server = new Hapi.Server();
    // Apply server connection
    server.connection(config);
    // Register plugins
    server.register(plugins, (registerErr) => {
      if (registerErr) {
        return reject(registerErr);
      }
      // Start server
      return server.start(startErr => {
        if (startErr) {
          return reject(startErr);
        }
        // Load routes and return server
        server.route(routes);
        return resolve(server);
      });
    });
  });
};

module.exports = createServer;

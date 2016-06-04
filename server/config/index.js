const config = {
  host: process.env.API_HOST || '0.0.0.0',
  port: parseInt(process.env.APP_PORT, 10) || 5000,
  hapi: {
    options: {
      routes: {
        payload: {
          parse: true,
          allow: 'application/json'
        },
        cors: true
      }
    }
  },
  env: (process.env.NODE_ENV) ? process.env.NODE_ENV : 'development',
  debug: false
};

if ('development' === config.env) {
  config.debug = true;
}

module.exports = config;

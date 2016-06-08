const config = {
  host: process.env.API_HOST || '0.0.0.0',
  port: parseInt(process.env.APP_PORT || process.env.PORT, 10) || 5000,
  hapi: {
    options: {
      routes: {
        payload: {
          parse: true,
          allow: 'application/json',
        },
        cors: true,
      },
    },
  },
  env: (process.env.NODE_ENV) ? process.env.NODE_ENV : 'development',
  debug: false,
};

if (config.env === 'development') {
  config.debug = true;
}

module.exports = config;

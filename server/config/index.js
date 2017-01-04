const config = {
  host: process.env.API_HOST || '0.0.0.0',
  port: process.env.PORT || 3000,
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

const lout = require('lout');
const good = require('good');
const vision = require('vision');
const inert = require('inert');

const basePlugins = [];

const devPlugins = [
  vision,
  inert,
  // API Documentation (lout)
  {
    register: lout,
  },
  // Logging (good)
  {
    register: good,
    options: {
      ops: {
        interval: 5000,
      },
      reporters: {
        console: [
          {
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ response: '*', log: '*', request: '*', error: '*' }],
          },
          { module: 'good-console' },
          'stdout',
        ],
      },
    },
  },
];

const plugins = basePlugins
  .concat(process.env.NODE_ENV === 'development' ? devPlugins : []);

module.exports = plugins;

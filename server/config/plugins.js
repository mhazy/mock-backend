const lout = require('lout');
const good = require('good');
const vision = require('vision');
const inert = require('inert');

module.exports = [
  vision,
  inert,
  // API Documentation (lout)
  {
    register: lout
  },
  // Logging (good)
  {
    register: good,
    options: {
      ops: {
        interval: 1000
      },
      reporters: {
        console: [{
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{
            response: '*',
            log: '*',
            request: '*',
            'request-internal': '*',
            error: '*',
            model: '*'
          }]
        }, {
          module: 'good-console'
        }, 'stdout']
      }
    }
  }
];

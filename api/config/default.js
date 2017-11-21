const defer = require('config/defer').deferConfig;
const path = require('path');

module.exports = {
  secret:   'mysecret',
  crypto: {
    hash: {
      length:     128,
      iterations: process.env.NODE_ENV === 'production' ? 12000 : 1
    }
  },
  root:     process.cwd()
};



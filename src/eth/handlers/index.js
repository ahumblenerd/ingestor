const { successHandler } = require('./success.handler');
const { errorHandler } = require('./error.handler');
const { connectionHandler } = require('./connection.handler');

module.exports.web3EventHandler = {
  successHandler,
  errorHandler,
  connectionHandler,
};

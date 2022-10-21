const { INTERNAL_SERVER_ERROR } = require('http-status');
const logger = require('../../config/logger');
const ApiError = require('../../utils/ApiError');

async function errorHandler(err) {
  logger.debug(err);
  throw new ApiError(INTERNAL_SERVER_ERROR, 'error running subscriber', false, err.stack);
}

module.exports = {
  errorHandler,
};

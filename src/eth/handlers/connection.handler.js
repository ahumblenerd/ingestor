const logger = require('../../config/logger');

async function connectionHandler(connectionId) {
  logger.info('Subscription on ERC-20 started with ID %s', connectionId);
}

module.exports = {
  connectionHandler,
};

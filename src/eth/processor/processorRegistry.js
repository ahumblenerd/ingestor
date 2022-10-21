const { router } = require('./router');
const logger = require('../../config/logger');

const registry = async (web3, event) => {
  logger.info(`received event ${event.transactionHash}`);
  event.topics.forEach((topic) => {
    const _router = router.get(topic);
    if (_router === undefined) return;
    router.get(topic)(web3, event);
  });
};

module.exports.processorRegistry = registry;

const eventLoopLag = require('event-loop-lag');
const logger = require('./logger');

const INTERVAL = 1000;

async function init() {
  const lag = eventLoopLag(INTERVAL);
  logger.warn(`lag is ${lag()}`);
}

module.exports = {
  init,
};

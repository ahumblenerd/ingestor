const Web3 = require('web3');
const { INTERNAL_SERVER_ERROR } = require('http-status');
const ApiError = require('../utils/ApiError');
const logger = require('../config/logger');
const { web3EventHandler } = require('./handlers/index');
const { infuraApiKey } = require('../config/config');
const ethListenerConfig = require('../config/ethListenerConfig');

const web3 = new Web3(`wss://mainnet.infura.io/ws/v3/${infuraApiKey}`);

async function registerHandlers(subscription) {
  subscription.on('data', (event) => web3EventHandler.successHandler(web3, event));
  subscription.on('error', (err) => web3EventHandler.errorHandler(err));
  subscription.on('connected', (nr) => web3EventHandler.connectionHandler(nr));
}

const init = async () => {
  try {
    const subscription = web3.eth.subscribe('logs', ethListenerConfig.ethListenerConfig.subscriptionConfigurations);
    registerHandlers(subscription).then(() => {
      logger.info('init listeners');
      return subscription;
    });
  } catch (error) {
    throw new ApiError(INTERNAL_SERVER_ERROR, 'error while starting subscriber', false, error.stack);
  }
};

module.exports = { init };

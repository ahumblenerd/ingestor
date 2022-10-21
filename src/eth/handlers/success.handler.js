const { processorRegistry } = require('../processor/processorRegistry');

/* eslint-disable */
async function sleep(msec) {
  return new Promise((resolve) => setTimeout(resolve, msec));
}

async function successHandler(web3, event) {
  await processorRegistry(web3, event);
}

module.exports = {
  successHandler,
};

const ethListenerConfig = require('../../../config/ethListenerConfig');
const whitelistedToken = require('../../../config/whitelistedTokens');
const logger = require('../../../config/logger');

async function decodeAbi(web3, event) {
  const transaction = web3.eth.abi.decodeLog(
    [
      {
        type: 'address',
        name: 'from',
        indexed: true,
      },
      {
        type: 'address',
        name: 'to',
        indexed: true,
      },
      {
        type: 'uint256',
        name: 'value',
        indexed: false,
      },
    ],
    event.data,
    [event.topics[1], event.topics[2], event.topics[3]]
  );

  return transaction;
}

async function collectData(contract) {
  const [decimals, symbol] = await Promise.all([contract.methods.decimals().call(), contract.methods.symbol().call()]);
  return { decimals, symbol };
}

// eslint-disable-next-line no-unused-vars
async function accountFilter(transaction) {
  // read from config and check if then check if its a target account
  return true;
}

async function tokenFilter(account, symbol) {
  return whitelistedToken.has(symbol);
}

async function unitConverter(web3, decimals) {
  return Object.keys(web3.utils.unitMap).find(
    (key) => web3.utils.unitMap[key] === web3.utils.toBN(10).pow(web3.utils.toBN(decimals)).toString()
  );
}

async function process(web3, event) {
  logger.info(`processing event ${event.transactionHash}`);
  if (event.topics.length !== 3) return;
  try {
    // enrich
    const transaction = await decodeAbi(web3, event);

    // remove accounts that are not being tracked
    if (!(await accountFilter(transaction))) return;

    // enrich contract data
    const contract = new web3.eth.Contract(ethListenerConfig.ethListenerConfig.erc20.abi, event.address);
    const contractData = await collectData(contract);

    // filter out unwanted tokens
    if (!(await tokenFilter(transaction.from, contractData.symbol))) return;
    const unit = await unitConverter(web3, contractData.decimals);

    logger.info(
      `DEBIT,
            amount: ${web3.utils.fromWei(transaction.value, unit)},
            token: ${contractData.symbol},
            from: ${transaction.from},
            to: ${transaction.to}`
    );

    logger.info(
      `CREDIT,
            amount: ${web3.utils.fromWei(transaction.value, unit)},
            token: ${contractData.symbol},
            from: ${transaction.to},
            to: ${transaction.from}`
    );
  } catch (error) {
    logger.error(error);
  }
}

module.exports.erc20TransferProcessor = process;

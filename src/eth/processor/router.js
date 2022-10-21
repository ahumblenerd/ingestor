const { ethListenerConfig } = require('../../config/ethListenerConfig');
const { erc20TransferProcessor } = require('./erc20transfer/erc20TransferProcessor');

const router = new Map();
router.set(ethListenerConfig.transferEventSignature, erc20TransferProcessor);

module.exports.router = router;

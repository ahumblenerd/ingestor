const Web3 = require('web3');

const TRANSFER_EVENT_SIGNATURE = Web3.utils.sha3('Transfer(address,address,uint256)');
const subscriptionConfigurations = { topics: [TRANSFER_EVENT_SIGNATURE] };

const erc20Abi = [
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        name: '',
        type: 'uint8',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];

module.exports.ethListenerConfig = {
  transferEventSignature: TRANSFER_EVENT_SIGNATURE,
  subscriptionConfigurations,
  erc20: {
    abi: erc20Abi,
  },
};

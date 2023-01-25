export const ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32'
      },
      {
        indexed: true,
        internalType: 'string',
        name: 'indexedKey',
        type: 'string'
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'key',
        type: 'string'
      }
    ],
    name: 'TextChanged',
    type: 'event'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32'
      },
      {
        internalType: 'string',
        name: 'key',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'value',
        type: 'string'
      }
    ],
    name: 'setText',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceID',
        type: 'bytes4'
      }
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'pure',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32'
      },
      {
        internalType: 'string',
        name: 'key',
        type: 'string'
      }
    ],
    name: 'text',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32'
      },
      {
        internalType: 'uint256',
        name: 'coinType',
        type: 'uint256'
      }
    ],
    name: 'addr',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
]

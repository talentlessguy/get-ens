export const ABI = [
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
  }
]

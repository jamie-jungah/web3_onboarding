export const TEST_ABI = [
  {
    inputs: [],
    name: 'getString',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_text',
        type: 'string',
      },
    ],
    name: 'setString',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

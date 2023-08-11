import { Chain } from 'wagmi';

export const baobab: Chain = {
  name: 'Klaytn Testnet Baobab',
  id: 1001,
  testnet: true,
  nativeCurrency: {
    name: 'KLAY',
    symbol: 'KLAY',
    decimals: 18,
  },
  network: 'klaytn testnet baobab',
  rpcUrls: {
    default: {
      http: ['https://api.baobab.klaytn.net:8651'],
    },
    public: {
      http: ['https://api.baobab.klaytn.net:8651'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Klaytn Scope',
      url: 'https://baobab.scope.klaytn.com/',
    },
  },
} as const satisfies Chain;

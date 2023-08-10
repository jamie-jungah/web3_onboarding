import { Ethereum } from '@wagmi/connectors';

declare global {
  interface Window {
    ethereum: Ethereum;
  }
}

export const ethereum = window.ethereum;

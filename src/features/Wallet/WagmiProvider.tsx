import { baobab } from '@/features/Wallet/chains/testnet/baobab';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import {
  mainnet,
  goerli,
  sepolia,
  mantleTestnet,
  bscTestnet,
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, goerli, sepolia, baobab, mantleTestnet, bscTestnet],
  [publicProvider()],
);

const config = createConfig({
  autoConnect: false,
  publicClient,
  webSocketPublicClient,
});

const WagmiProvider = ({ children }: React.PropsWithChildren) => {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
};

export default WagmiProvider;

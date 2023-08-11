import Button from '@/components/Button';
import { baobab } from '@/features/Wallet/chains/testnet/baobab';
import { MetaMaskConnector } from '@wagmi/core/connectors/metaMask';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { sepolia, useAccount, useConnect, useEnsName } from 'wagmi';
import { bscTestnet, goerli, mantleTestnet } from 'wagmi/chains';

const ConnectWallet = () => {
  const router = useRouter();
  const { connect, error, isLoading } = useConnect({
    connector: new MetaMaskConnector({
      chains: [goerli, sepolia, baobab, mantleTestnet, bscTestnet],
    }),
  });

  const { connector, isConnected, address } = useAccount();
  const { data: ENS } = useEnsName({ address });

  const handleConnectWallet = useCallback(() => {
    connect();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <p className="text-xl font-bold">
        The MetaMask extension must be installed.
      </p>
      {isConnected && (
        <div className="flex flex-col gap-4 text-2xl">
          <span>Connected to {ENS ? ENS : address}</span>
        </div>
      )}
      {!isConnected && (
        <div>
          <Button size="lg" onClick={handleConnectWallet} key={connector?.id}>
            {!isLoading && 'Connect'}
            {isLoading && 'Connecting...'}
          </Button>
        </div>
      )}
      {isConnected && (
        <div>
          <Button size="lg" onClick={() => router.push('/step/2')}>
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;

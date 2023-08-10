import Button from '@/components/Button';
import { baobab } from '@/features/Wallet/chains/testnet/baobab';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { sepolia, useAccount, useConnect, useEnsName, useNetwork } from 'wagmi';
import { bscTestnet, goerli, mantleTestnet } from 'wagmi/chains';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

const ChangeAddress = () => {
  const router = useRouter();
  const { chain, chains } = useNetwork();
  const { connector, isConnected, address } = useAccount();
  const { data: ENS } = useEnsName({ address });

  const { connect, error, isLoading } = useConnect({
    connector: new MetaMaskConnector({
      chains: [goerli, sepolia, baobab, mantleTestnet, bscTestnet],
    }),
  });

  const [initialAddress, setInitialAddress] = useState<string | undefined>('');
  const [isChanged, setIsChanged] = useState<boolean>(false);

  useEffect(() => {
    if (!isConnected) {
      connect();
    } else {
      setInitialAddress(address);
    }

    if (initialAddress && initialAddress !== address) {
      setIsChanged(true);
    }
  }, [initialAddress, address, isConnected]);

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <span className="text-lg">
        Available Chains : {chains.map((chain) => chain.name).join(', ')}
      </span>
      <div className="flex flex-col text-xl font-bold gap-2">
        <span>Current Chain : {chain?.name}</span>
        <span>Current Address : {ENS ?? address}</span>
      </div>
      {isConnected && isChanged && (
        <div>
          <Button size="lg" onClick={() => router.push('/step/3')}>
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChangeAddress;

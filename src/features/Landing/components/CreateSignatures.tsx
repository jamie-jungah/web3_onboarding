import Button from '@/components/Button';
import { baobab } from '@/features/Wallet/chains/testnet/baobab';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
  sepolia,
  useAccount,
  useConnect,
  useNetwork,
  useSignTypedData,
} from 'wagmi';
import { bscTestnet, goerli, mantleTestnet } from 'wagmi/chains';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

// for creating a signature
const types = {
  Person: [
    { name: 'name', type: 'string' },
    { name: 'wallet', type: 'address' },
  ],
  Mail: [
    { name: 'from', type: 'Person' },
    { name: 'to', type: 'Person' },
    { name: 'contents', type: 'string' },
  ],
} as const;

const CreateSignatures = () => {
  const { chain } = useNetwork();
  const { isConnected } = useAccount();
  const router = useRouter();

  const { connect } = useConnect({
    connector: new MetaMaskConnector({
      chains: [goerli, sepolia, baobab, mantleTestnet, bscTestnet],
    }),
  });

  // for creating a signature
  const domain = {
    name: 'Test for web3 onboarding',
    version: '1',
    chainId: chain?.id,
  } as const;

  const message = {
    from: {
      name: 'Jamie',
      wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
    },
    to: {
      name: 'You',
      wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
    },
    contents: 'Hello, there!',
  } as const;

  // create a signature
  const { data, isError, isLoading, isSuccess, signTypedData } =
    useSignTypedData({
      domain,
      message,
      primaryType: 'Mail',
      types,
    });

  useEffect(() => {
    if (!isConnected) {
      connect();
    }
  }, [isConnected]);

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <span className="font-bold text-2xl">Result</span>
      <span className="w-96 break-words">{data}</span>
      {!isSuccess && (
        <div>
          <Button size="lg" onClick={() => signTypedData()}>
            {!isSuccess && !isLoading && 'Create'}
            {isLoading && 'Loading...'}
          </Button>
        </div>
      )}
      {isSuccess && (
        <div>
          <Button size="lg" onClick={() => router.push('/step/5')}>
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default CreateSignatures;

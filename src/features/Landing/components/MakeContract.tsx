import contractPayload from '@/abi/contractPayload';
import Button from '@/components/Button';
import { baobab } from '@/features/Wallet/chains/testnet/baobab';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  sepolia,
  useAccount,
  useConnect,
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useSwitchNetwork,
} from 'wagmi';
import { bscTestnet, goerli, mantleTestnet } from 'wagmi/chains';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

const MakeContract = () => {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();
  const router = useRouter();

  const [contractReadData, setContractReadData] = useState('');
  const [contractArgs, setContractArgs] = useState('');

  const [isReadSuccess, setIsReadSuccess] = useState(false);
  const [isWriteSuccess, setIsWriteSuccess] = useState(false);

  // connect to MetaMask
  const { connect } = useConnect({
    connector: new MetaMaskConnector({
      chains: [goerli, sepolia, baobab, mantleTestnet, bscTestnet],
    }),
  });

  // Read contract
  const { data: contractRead, isError } = useContractRead({
    ...contractPayload('getString', chain?.id),
    onSuccess(data) {
      //   console.log('Success', data);
      setIsReadSuccess(true);
    },
  });

  // Write contract
  const { config } = usePrepareContractWrite({
    ...contractPayload('setString', chain?.id),
    args: [contractArgs],
    onSuccess(data) {
      //   console.log('Success', data);
      setIsWriteSuccess(true);
    },
  });

  const {
    write: updateString,
    isSuccess: setSuccess,
    data: stringData,
  } = useContractWrite(config);

  useEffect(() => {
    if (!isConnected) {
      connect();
    }
  }, [isConnected]);

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <select
        className="border-2 border-gray-200 rounded-md"
        id="select-address"
        onChange={(e) => switchNetwork?.(Number(e.target.value))}
      >
        {chains.map((_chain) => (
          <option
            value={_chain.id}
            key={_chain.id}
            selected={_chain.id === chain?.id}
          >
            {isLoading && pendingChainId === _chain.id
              ? 'Switching...'
              : _chain.name}
          </option>
        ))}
      </select>
      <div className="flex flex-col gap-5">
        <span className="text-lg">
          Contract Read Result : {contractReadData}
        </span>
        <div>
          <Button
            size="md"
            onClick={() => {
              setContractReadData(contractRead as string);
              console.log('contractRead : ', contractRead);
              console.log('contractReadData : ', contractReadData);
            }}
          >
            &#91;GET&#93; Hello World
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <input
          className="border-2 border-gray-200 rounded-md p-2"
          placeholder="Enter a message to set"
          onChange={(e) => {
            e.preventDefault();
            setContractArgs(e.target.value);
          }}
        />
        <div>
          <Button
            size="md"
            onClick={() => {
              updateString?.();
            }}
          >
            &#91;SET&#93; Hello World
          </Button>
        </div>
      </div>
      <div>
        <Button size="lg" onClick={() => router.push('/finish')}>
          Finish
        </Button>
      </div>
    </div>
  );
};

export default MakeContract;

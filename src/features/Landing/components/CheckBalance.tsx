import Button from '@/components/Button';
import { baobab } from '@/features/Wallet/chains/testnet/baobab';
import useMetaMask from '@/hooks/useMetamask';
import Decimal from 'decimal.js';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { sepolia, useAccount, useBalance, useConnect } from 'wagmi';
import { bscTestnet, goerli, mantleTestnet } from 'wagmi/chains';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

const CheckBalance = () => {
  const { isConnected } = useAccount();
  const router = useRouter();
  const { addresses } = useMetaMask();
  const [selectedAddress, setSelectedAddress] = useState<
    `0x${string}` | undefined
  >(undefined);

  const { connect } = useConnect({
    connector: new MetaMaskConnector({
      chains: [goerli, sepolia, baobab, mantleTestnet, bscTestnet],
    }),
  });

  const {
    data: balance,
    isError,
    isLoading,
  } = useBalance({
    address: selectedAddress ?? undefined,
  });

  const handleSelectAddress = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value as `0x${string}`;
    setSelectedAddress(selectedValue);
  };

  const balanceInWei = new Decimal(Number(balance?.value || 0));
  const balanceInGwei = balanceInWei.dividedBy(new Decimal('1000000000'));
  const balanceInWeiUnit = balanceInWei.toFixed(0);

  useEffect(() => {
    if (!isConnected) {
      connect();
    }
  }, [isConnected, selectedAddress]);

  return (
    <div className="flex flex-col gap-10 justify-center items-center">
      <div>
        <select
          className="border-2 border-gray-200 rounded-md"
          id="select-address"
          value={selectedAddress}
          onChange={handleSelectAddress}
        >
          <option value={''}>Please select an address</option>
          {addresses.map((address) => (
            <option key={address} value={address}>
              {address}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2 justify-center items-center">
        <span className="text-xl">Balance</span>
        <span>{balanceInGwei.toFixed(2)} Gwei</span>
        <span>{balanceInWeiUnit} Wei</span>
        <span>
          {balanceInWei.dividedBy(new Decimal('1e18')).toFixed(6)} ETH
        </span>
      </div>
      {balance && (
        <div>
          <Button size="lg" onClick={() => router.push('/step/4')}>
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default CheckBalance;

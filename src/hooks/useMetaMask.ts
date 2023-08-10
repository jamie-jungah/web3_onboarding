import { useState, useEffect, useCallback } from 'react';

export default function useMetaMask() {
  const [addresses, setAddresses] = useState<`0x${string}`[]>([]);

  const getAddressList = useCallback(async () => {
    if (!window?.ethereum) return;

    const addresses = await window.ethereum.request({ method: 'eth_accounts' });
    setAddresses(addresses);
  }, []);

  useEffect(() => {
    getAddressList();
    window.ethereum.on('accountsChanged', async (accounts: `0x${string}`[]) => {
      setAddresses(accounts as `0x${string}`[]);
    });
  }, [getAddressList]);

  return { addresses };
}

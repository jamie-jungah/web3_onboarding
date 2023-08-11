import { TEST_ABI } from './testABI';

type Method = 'setString' | 'getString';

const CONTRACT_RECORD: Record<number, `0x${string}`> = {
  5: '0xAcDa4bBdb12e9a44E79B655A6Fdf1a63367c0DAa',
  11155111: '0xAcDa4bBdb12e9a44E79B655A6Fdf1a63367c0DAa',
  1001: '0xAcDa4bBdb12e9a44E79B655A6Fdf1a63367c0DAa',
  5001: '0xAcDa4bBdb12e9a44E79B655A6Fdf1a63367c0DAa',
  97: '0xAcDa4bBdb12e9a44E79B655A6Fdf1a63367c0DAa',
};

export default function contractPayload(method: Method, chainId?: number) {
  const address = chainId ? CONTRACT_RECORD[chainId] : '0x';

  return {
    address: address as `0x${string}`,
    abi: TEST_ABI,
    functionName: method as string,
  };
}

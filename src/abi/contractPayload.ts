import { TEST_ABI } from './testABI';

type Method = 'setString' | 'getString';

const CONTRACT_RECORD: Record<number, `0x${string}`> = {
  5: '0xB9552E2eDe4bB427d78E07c72Fa3Fd337bBEe53c',
  11155111: '0xDA4b49bdEaeD7dC381f533f6db377A017BCc2CBe',
  1001: '0xDA4b49bdEaeD7dC381f533f6db377A017BCc2CBe',
  5001: '0xDA4b49bdEaeD7dC381f533f6db377A017BCc2CBe',
  97: '0xf393d20a7490b1FDC38382dd34f28994eDAc15ea',
};

export default function contractPayload(method: Method, chainId?: number) {
  const address = chainId ? CONTRACT_RECORD[chainId] : '0x';

  return {
    address: address as `0x${string}`,
    abi: TEST_ABI,
    functionName: method as string,
  };
}

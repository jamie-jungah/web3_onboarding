import ProgressBar from '@/components/ProgressBar';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ConnectWallet from '../components/ConnectWallet';
import ChangeAddress from '../components/ChangeAddress';
import CheckBalance from '../components/CheckBalance';

const STEPS: Record<number, string> = {
  1: 'Connect MetaMask.',
  2: 'Try selecting another account in MetaMask.',
  3: 'Check your balance.',
  4: '',
  5: '',
};

const StepPage = () => {
  const router = useRouter();
  const id = Number(router.query?.id);

  const [progress, setProgress] = useState(5);

  useEffect(() => {
    if (id === 1) {
      setProgress(20);
    } else if (id === 2) {
      setProgress(40);
    } else if (id === 3) {
      setProgress(60);
    } else if (id === 4) {
      setProgress(80);
    } else if (id === 5) {
      setProgress(100);
    }
  }, [id, progress]);

  return (
    <div className="w-full min-h-screen flex flex-col gap-24">
      <ProgressBar progress={progress} />
      <div className="flex flex-col justify-center items-center gap-4">
        <h1 className="text-5xl">{`Step ${id}`}</h1>
        <p className="text-5xl">{STEPS[id]}</p>
      </div>
      {id === 1 && <ConnectWallet />}
      {id === 2 && <ChangeAddress />}
      {id === 3 && <CheckBalance />}
    </div>
  );
};

export default StepPage;

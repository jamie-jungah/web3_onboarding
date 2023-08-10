import Button from '@/components/Button';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';

const LandingPage: NextPage = () => {
  const router = useRouter();

  return (
    <main className="flex flex-col min-h-screen items-center justify-center gap-20">
      <p className="text-4xl font-bold">
        Complete web3 onboarding mission to enable Yulmu to meet Yulia !
      </p>
      <Image src="/assets/yulmu.png" width="200" height="200" alt="Yulmu" />
      <div>
        <Button size="lg" onClick={() => router.push('/step/1')}>
          Start
        </Button>
      </div>
    </main>
  );
};

export default LandingPage;

import Image from 'next/image';

const FinishPage = () => {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center gap-20">
      <p className="text-4xl font-bold">
        Congratulations on completing the mission !
      </p>
      <Image
        src="/assets/with-yulia.png"
        width="400"
        height="1000"
        alt="with-yulia"
      />
    </main>
  );
};

export default FinishPage;

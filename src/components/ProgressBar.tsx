import Image from 'next/image';

const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className="relative w-full h-6 bg-gray-100 rounded">
      <div
        className="absolute h-6 bg-mint-300 rounded flex justify-end"
        style={{ width: `${progress}%` }}
      >
        <div className="flex justify-end absolute">
          <Image src="/assets/yulmu.png" width="50" height="100" alt="Yulmu" />
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;

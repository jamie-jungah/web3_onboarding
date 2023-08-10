import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { Nunito_Sans } from 'next/font/google';
import WagmiProvider from '@/features/Wallet/WagmiProvider';

const nunito = Nunito_Sans({
  subsets: ['latin'],
  weight: '400',
  style: 'normal',
  variable: '--nunito',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={nunito.className}>
      <RecoilRoot>
        <WagmiProvider>
          <Component {...pageProps} />
        </WagmiProvider>
      </RecoilRoot>
    </div>
  );
}

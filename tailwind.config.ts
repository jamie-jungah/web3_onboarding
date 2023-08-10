import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['var(--font-nunito)', 'sans-serif'],
      },
    },
    colors: {
      mint: {
        50: '#e7faf8',
        100: '#b6f0ea',
        200: '#92e9df',
        300: '#61e0d1',
        400: '#42d9c8',
        500: '#13d0ba',
        600: '#11bda9',
        700: '#0d9484',
        800: '#0a7266',
        900: '#08574e',
      },
      gray: {
        50: '#e6e8eb',
        100: '#b1b7c0',
        200: '#8c94a1',
      },
      black: {
        default: '#000000',
      },
    },
  },
  plugins: [],
};
export default config;

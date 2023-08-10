import { atom } from 'recoil';

import localStorageEffect from './localStorageEffect';

export const stepKey = `web3-onboarding-step`;

export const stepState = atom({
  key: 'stepKey',
  default: 1,
  effects: [localStorageEffect('stepKey')],
});

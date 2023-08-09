import { atom } from "recoil";

import localStorageEffect from "./localStorageEffect";

export const counterState = atom({
  key: "@counter",
  default: 0,
  effects: [localStorageEffect("@counter")],
});

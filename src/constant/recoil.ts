import { atom } from 'recoil';
export const cartState = atom({
  key: 'cartState',
  default: [],
});
export const userState = atom({
  key: 'userState',
  default: [],
});
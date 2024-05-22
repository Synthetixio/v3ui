import Wei from '@synthetixio/wei';
import { atom } from 'recoil';

export const amountState = atom({
  key: 'amount',
  default: new Wei(0),
});

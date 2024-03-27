import Wei from '@synthetixio/wei';
import { atom } from 'recoil';

export const depositState = atom({
  key: 'amountToDeposit',
  default: new Wei(0),
});

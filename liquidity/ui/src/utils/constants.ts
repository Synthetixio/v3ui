import Wei from '@synthetixio/wei';
import { constants } from 'ethers';

export const LOCAL_STORAGE_KEYS = {
  SHOW_TESTNETS: 'SHOW_TESTNETS',
};
export const ZEROWEI = new Wei(0);
export const ONEWEI = new Wei(1);
export const MAXUINT = new Wei(constants.MaxUint256);

import { providers } from 'ethers';

export const motherShipProvider = new providers.JsonRpcProvider(
  process.env.DEV ? 'http://127.0.0.1:57633/' : ''
);

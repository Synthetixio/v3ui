import { providers } from 'ethers';

export const motherShipProvider = new providers.JsonRpcProvider(
  process.env.DEV === 'true'
    ? process.env.DEV_RPC_MOTHERSHIP
    : process.env.CI === 'true'
      ? process.env.CI_RPC_MOTHERSHIP
      : process.env.TESTNET === 'true'
        ? 'https://testnet.snaxchain.io/'
        : 'https://mainnet.snaxchain.io/'
);

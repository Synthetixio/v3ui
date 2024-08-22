import { providers } from 'ethers';

export const motherShipProvider = (networkId?: number) => {
  return new providers.JsonRpcProvider(
    process.env.CI === 'true'
      ? process.env.CI_RPC_MOTHERSHIP
      : networkId === 13001
        ? 'https://testnet.snaxchain.io/'
        : 'https://testnet.snaxchain.io/'
  );
};

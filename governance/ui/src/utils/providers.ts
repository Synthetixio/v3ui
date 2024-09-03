import { providers } from 'ethers';

export const motherShipProvider = (networkId?: number) => {
  return new providers.JsonRpcProvider(
    process.env.CI === 'true'
      ? 'http://127.0.0.1:8545'
      : networkId === 13001
        ? 'https://testnet.snaxchain.io/'
        : 'https://mainnet.snaxchain.io/'
  );
};

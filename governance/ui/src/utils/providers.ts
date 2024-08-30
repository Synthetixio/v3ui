import { providers } from 'ethers';

export const motherShipProvider = (networkId?: number) => {
  return new providers.JsonRpcProvider(
    networkId === 13001 ? 'https://testnet.snaxchain.io/' : 'https://mainnet.snaxchain.io/'
  );
};

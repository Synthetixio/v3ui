import { Wallet, providers } from 'ethers';

export const motherShipProvider = new providers.JsonRpcProvider(
  process.env.DEV === 'true'
    ? process.env.DEV_RPC_MOTHERSHIP
    : process.env.CI === 'true'
      ? process.env.CI_RPC_MOTHERSHIP
      : process.env.TESTNET === 'true'
        ? `https://optimism-sepolia.infura.io/v3/${process.env.INFURA_KEY}`
        : `https://optimism-mainnet.infura.io/v3/${process.env.INFURA_KEY}`
);

export const devSigner = new Wallet(
  '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
  motherShipProvider
);

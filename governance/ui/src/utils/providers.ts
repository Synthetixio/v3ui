import { providers } from 'ethers';

export const motherShipProvider = new providers.JsonRpcProvider(
  process.env.DEV
    ? 'http://127.0.0.1:19000/'
    : process.env.TESTNET
      ? `https://optimism-goerli.infura.io/v3/${process.env.INFURA_KEY}`
      : 'https://mainnet.optimism.io'
);

export const satellite1Provider = new providers.JsonRpcProvider(
  process.env.DEV
    ? 'http://127.0.0.1:19001/'
    : process.env.TESTNET
      ? `https://optimistic-goerli.infura.io/v3/${process.env.INFURA_KEY}`
      : 'https://mainnet.optimism.io'
);

export const satellite2Provider = new providers.JsonRpcProvider(
  process.env.DEV
    ? 'http://127.0.0.1:19002/'
    : process.env.TESTNET
      ? `https://avalanche-fuji.infura.io/v3/${process.env.INFURA_KEY}`
      : 'https://mainnet.optimism.io'
);

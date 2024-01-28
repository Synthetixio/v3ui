import { providers } from 'ethers';

// Sepolia for testnet
export const motherShipProvider = new providers.JsonRpcProvider(
  process.env.DEV
    ? 'https://ethereum-sepolia.publicnode.com'
    : process.env.TESTNET
      ? `https://sepolia.infura.io/v3/${process.env.INFURA_KEY}`
      : 'https://mainnet.optimism.io'
);

// Mumbai for testnet
export const satellite1Provider = new providers.JsonRpcProvider(
  process.env.DEV
    ? 'https://endpoints.omniatech.io/v1/matic/mumbai/public'
    : process.env.TESTNET
      ? `https://polygon-mumbai.infura.io/v3/${process.env.INFURA_KEY}`
      : 'https://mainnet.optimism.io'
);

// OP Goerli for testnet
export const satellite2Provider = new providers.JsonRpcProvider(
  process.env.DEV
    ? 'https://endpoints.omniatech.io/v1/op/goerli/public'
    : process.env.TESTNET
      ? `https://optimistic-goerli.infura.io/v3/${process.env.INFURA_KEY}`
      : 'https://mainnet.optimism.io'
);

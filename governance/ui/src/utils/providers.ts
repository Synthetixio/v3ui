import { Wallet, providers } from 'ethers';

// Sepolia for testnet
export const motherShipProvider = new providers.JsonRpcProvider(
  process.env.DEV === 'true'
    ? process.env.DEV_RPC_MOTHERSHIP
    : process.env.TESTNET === 'true'
      ? 'https://sepolia.base.org'
      : `https://optimism-mainnet.infura.io/v3/${process.env.INFURA_KEY}`
);

export const devSigner = new Wallet(
  '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
  motherShipProvider
);

// // Mumbai for testnet
// export const satellite1Provider = new providers.JsonRpcProvider(
//   process.env.DEV
//     ? 'https://endpoints.omniatech.io/v1/matic/mumbai/public'
//     : process.env.TESTNET
//       ? `https://polygon-mumbai.infura.io/v3/${process.env.INFURA_KEY}`
//       : 'https://mainnet.optimism.io'
// );
//
// // OP Goerli for testnet
// export const satellite2Provider = new providers.JsonRpcProvider(
//   process.env.DEV
//     ? 'https://endpoints.omniatech.io/v1/op/goerli/public'
//     : process.env.TESTNET
//       ? `https://optimistic-goerli.infura.io/v3/${process.env.INFURA_KEY}`
//       : 'https://mainnet.optimism.io'
// );

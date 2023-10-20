import { ethers } from 'ethers';

export async function importCoreProxy() {
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
  const network = await provider.getNetwork();
  switch (network.chainId) {
    case 1:
      return import('@synthetixio/v3-contracts/src/1/CoreProxy');
    case 5:
      return import('@synthetixio/v3-contracts/src/5/CoreProxy');
    case 10:
      return import('@synthetixio/v3-contracts/src/10/CoreProxy');
    case 420:
      return import('@synthetixio/v3-contracts/src/420/CoreProxy');
    default:
      throw new Error(`Unsupported chain ${network.chainId}`);
  }
}

import { ethers } from 'ethers';
import { importCoreProxy as importer } from '@snx-v3/contracts/src/importCoreProxy';

export async function importCoreProxy() {
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
  const network = await provider.getNetwork();
  if (network.chainId === 8453 || network.chainId === 84532) {
    return importer(network.chainId, 'andromeda');
  }
  return importer(network.chainId);
}

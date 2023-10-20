import { ethers } from 'ethers';
import { importCoreProxy as importer } from '@synthetixio/v3-contracts/src/importCoreProxy';

export async function importCoreProxy() {
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
  const network = await provider.getNetwork();
  return importer(network.chainId);
}

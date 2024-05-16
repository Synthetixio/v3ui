import { ethers } from 'ethers';

export async function isBase() {
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
  const network = await provider.getNetwork();
  return network.chainId === 8453 || network.chainId === 84532;
}

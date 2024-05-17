import { ethers } from 'ethers';
import { importCoreProxy } from './importCoreProxy';
import { getCollateralConfig } from './getCollateralConfig';

export async function approveCollateral({ privateKey, symbol }) {
  const CoreProxy = await importCoreProxy();
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
  const wallet = new ethers.Wallet(privateKey, provider);
  const config = await getCollateralConfig(symbol);
  console.log('approveCollateral', { wallet: wallet.address, symbol });

  const contract = new ethers.Contract(
    config.tokenAddress,
    ['function approve(address spender, uint256 amount) returns (bool)'],
    wallet
  );

  const tx = await contract.approve(CoreProxy.address, ethers.constants.MaxUint256);
  await tx.wait();
  return null;
}

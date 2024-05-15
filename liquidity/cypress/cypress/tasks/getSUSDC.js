import { ethers } from 'ethers';
import { getCollateralConfig } from './getCollateralConfig';
import { setEthBalance } from './setEthBalance';
import { importCoreProxy } from './importCoreProxy';

export async function getSUSDC({ address, amount }) {
  const config = await getCollateralConfig('sUSDC');
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');

  const CoreProxy = await importCoreProxy();
  const coreProxy = new ethers.Contract(CoreProxy.address, CoreProxy.abi, provider);
  const owner = await coreProxy.owner();

  await setEthBalance({ address: owner, balance: 1000 });
  await setEthBalance({ address: CoreProxy.address, balance: 1000 });

  console.log({
    tokenAddress: config.tokenAddress,
  });

  const erc20 = new ethers.Contract(
    config.tokenAddress,
    [
      'function balanceOf(address account) view returns (uint256)',
      'function transfer(address to, uint256 value) returns (bool)',
    ],
    provider
  );

  const oldBalance = parseFloat(ethers.utils.formatUnits(await erc20.balanceOf(address)));

  console.log('getSUSD', {
    address,
    oldBalance,
  });

  if (oldBalance > amount) {
    console.log('getSUSD', { result: 'SKIP' });
    return;
  }

  const ownerBalance = parseFloat(
    ethers.utils.formatUnits(await erc20.balanceOf(CoreProxy.address))
  );
  console.log('getSUSD', { CoreProxy: CoreProxy.address, balance: ownerBalance });

  console.log({
    amount: ethers.utils.parseEther(`${amount}`).toString(),
  });
  await provider.send('anvil_impersonateAccount', [CoreProxy.address]);
  const signer = provider.getSigner(CoreProxy.address);

  const transferTx = await erc20
    .connect(signer)
    .transfer(address, ethers.utils.parseEther(`${amount}`));
  await transferTx.wait();
  await provider.send('anvil_stopImpersonatingAccount', [CoreProxy.address]);

  const newBalance = parseFloat(ethers.utils.formatUnits(await erc20.balanceOf(CoreProxy.address)));
  console.log('getSUSD', { address, newBalance });

  return null;
}

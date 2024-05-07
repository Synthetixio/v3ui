import { ethers } from 'ethers';
import { getCollateralConfig } from './getCollateralConfig';
import { setEthBalance } from './setEthBalance';

async function getOwner() {
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
  const network = await provider.getNetwork();
  switch (network.chainId) {
    case 84532:
      return '0xa1ae612e07511a947783c629295678c07748bc7a';
    case 8453:
      return '0x25ca6760fC0936127a6E34c3CBD63064b8A0DE1f';
    default:
      throw new Error(`Unsupported chain ${network.chainId} - getSUSD`);
  }
}

export async function getSUSDC({ address, amount }) {
  const config = await getCollateralConfig('sUSDC');
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');

  const owner = await getOwner();

  //  const coreProxy = new ethers.Contract(CoreProxy.address, CoreProxy.abi, provider);
  //  const owner = await coreProxy.owner();
  //  console.log('getSUSD', { owner });
  await setEthBalance({ address: owner, balance: 1000 });

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

  const ownerBalance = parseFloat(ethers.utils.formatUnits(await erc20.balanceOf(owner)));
  console.log('getSUSD', { owner, ownerBalance });

  console.log({
    amount: ethers.utils.parseEther(`${amount}`).toString(),
  });
  await provider.send('anvil_impersonateAccount', [owner]);
  const signer = provider.getSigner(owner);
  const transferTx = await erc20
    .connect(signer)
    .transfer(address, ethers.utils.parseEther(`${amount}`));
  await transferTx.wait();
  await provider.send('anvil_stopImpersonatingAccount', [owner]);

  const newBalance = parseFloat(ethers.utils.formatUnits(await erc20.balanceOf(address)));
  console.log('getSUSD', { address, newBalance });

  return null;
}

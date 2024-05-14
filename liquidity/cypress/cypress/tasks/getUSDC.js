import { ethers } from 'ethers';

const usdcAddressBase = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
const circleAddressBase = '0xd34ea7278e6bd48defe656bbe263aef11101469c';

export async function getUSDC({ address, amount }) {
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');

  const erc20 = new ethers.Contract(
    usdcAddressBase,
    [
      'function balanceOf(address account) view returns (uint256)',
      'function transfer(address to, uint256 value) returns (bool)',
    ],
    provider
  );

  const oldBalance = parseFloat(ethers.utils.formatUnits(await erc20.balanceOf(address)));

  console.log('getUSDC', {
    address,
    oldBalance,
  });

  if (oldBalance > amount) {
    console.log('getUSDC', { result: 'SKIP' });
    return;
  }

  const circleBalance = parseFloat(
    ethers.utils.formatUnits(await erc20.balanceOf(circleAddressBase), 6)
  );

  console.log('getSUSD', { circleAddressBase, circleBalance });

  const transferAmount = ethers.utils.parseUnits(`${amount}`, 6).toString();

  console.log({
    amount: transferAmount,
  });

  await provider.send('anvil_impersonateAccount', [circleAddressBase]);

  const signer = provider.getSigner(circleAddressBase);

  const transferTx = await erc20.connect(signer).transfer(address, transferAmount);

  await transferTx.wait();

  await provider.send('anvil_stopImpersonatingAccount', [circleAddressBase]);

  const newBalance = parseFloat(ethers.utils.formatUnits(await erc20.balanceOf(address)));
  console.log('getUSDC', { address, newBalance });

  return newBalance;
}

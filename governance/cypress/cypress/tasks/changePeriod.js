import { ethers, Wallet } from 'ethers';
import { getCouncilContract } from '../../../ui/src/utils/contracts';

export async function changePeriod({ council, period }) {
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
  const proxy = getCouncilContract(council);
  const block = await provider.getBlock('latest');
  const signer = new Wallet(
    '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
    provider
  );
  if (period === 'admin') {
    console.log(period);
    await proxy
      .connect(signer)
      .Epoch_setEpochDates(
        0,
        block.timestamp,
        block.timestamp + 10000,
        block.timestamp + 20000,
        block.timestamp + 30000
      );
  } else if (period === 'nomination') {
    await proxy
      .connect(signer)
      .Epoch_setEpochDates(
        0,
        block.timestamp - 10,
        block.timestamp,
        block.timestamp + 10000,
        block.timestamp + 20000
      );
  } else if (period === 'voting') {
    await proxy
      .connect(signer)
      .Epoch_setEpochDates(
        0,
        block.timestamp - 200,
        block.timestamp - 100,
        block.timestamp,
        block.timestamp + 10000
      );
  } else {
    await proxy
      .connect(signer)
      .Epoch_setEpochDates(
        0,
        block.timestamp - 10,
        block.timestamp - 5,
        block.timestamp - 1,
        block.timestamp
      );
  }
  return null;
}

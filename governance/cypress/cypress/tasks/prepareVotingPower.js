import { ethers, Wallet } from 'ethers';
import { getCouncilContract, SnapshotRecordContract } from '../../../ui/src/utils/contracts';

export async function prepareVotingPower({ council }) {
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
  const proxy = getCouncilContract(council);
  const signer = new Wallet(
    '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
    provider
  );
  // already done with current fork
  // await proxy.connect(signer).setSnapshotContract(SnapshotRecordContract(11155420)?.address, true);
  const block = await provider.getBlock('latest');
  await proxy
    .connect(signer)
    .Epoch_setEpochDates(
      0,
      block.timestamp - 200,
      block.timestamp - 100,
      block.timestamp,
      block.timestamp + 10000
    );
  // already done with current fork
  // const id = await proxy
  //   .connect(signer)
  //   .takeVotePowerSnapshot(SnapshotRecordContract(11155420)?.address);
  // console.log('ID', id);
  SnapshotRecordContract(11155420)
    .connect(signer)
    .setBalanceOfOnPeriod(await signer.getAddress(), 100, 1);
  return null;
}

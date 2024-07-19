import { ethers } from 'ethers';
import { devSigner } from '../../../ui/src/utils/providers';
import { getCouncilContract } from '../../../ui/src/utils/contracts';

export async function mineBlock({ council, period }) {
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
  const proxy = getCouncilContract(council);
  provider.getBlock('latest').then((block) => {
    proxy
      .connect(devSigner)
      .Epoch_setEpochDates(
        0,
        block.timestamp - 10,
        block.timestamp,
        block.timestamp + 10000,
        block.timestamp + 20000
      );
  });
  return null;
}

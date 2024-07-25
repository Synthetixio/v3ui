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
        period === 'admin'
          ? (0,
            block.timestamp,
            block.timestamp + 10000,
            block.timestamp + 20000,
            block.timestamp + 30000)
          : period === 'nomination'
            ? (0,
              block.timestamp - 10,
              block.timestamp,
              block.timestamp + 10000,
              block.timestamp + 20000)
            : period === 'voting'
              ? (0,
                block.timestamp - 200,
                block.timestamp - 100,
                block.timestamp,
                block.timestamp + 10000)
              : (0, block.timestamp - 10, block.timestamp - 5, block.timestamp - 1, block.timestamp)
      );
  });
  return null;
}

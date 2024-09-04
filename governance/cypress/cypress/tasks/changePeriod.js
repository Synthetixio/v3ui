import { Contract, ethers, Wallet } from 'ethers';
import { electionModuleABITest } from '../../../ui/src/utils/abi';

export async function changePeriod({ council, period }) {
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
  const proxy = {
    spartan: new Contract('0xBC85F11300A8EF619592fD678418Ec4eF26FBdFD', electionModuleABITest),
    ambassador: new Contract('0xCdbEf5753cE3CEbF361e143117e345ADd7498F80', electionModuleABITest),
    treasury: new Contract('0xe3aB2C6F1C9E46Fb53eD6b297c6fff68e935B161', electionModuleABITest),
  };
  const block = await provider.getBlock('latest');
  const signer = new Wallet(
    '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
    provider
  );
  const electionId = await proxy.spartan.connect(signer).getEpochIndex();

  if (period === 'admin') {
    await proxy[council]
      .connect(signer)
      .Epoch_setEpochDates(
        electionId,
        block.timestamp,
        block.timestamp + 10000,
        block.timestamp + 20000,
        block.timestamp + 30000
      );
  } else if (period === 'nomination') {
    await proxy[council]
      .connect(signer)
      .Epoch_setEpochDates(
        electionId,
        block.timestamp - 10,
        block.timestamp,
        block.timestamp + 10000,
        block.timestamp + 20000
      );
  } else if (period === 'voting') {
    await proxy[council]
      .connect(signer)
      .Epoch_setEpochDates(
        electionId,
        block.timestamp - 200,
        block.timestamp - 100,
        block.timestamp,
        block.timestamp + 10000
      );
  } else {
    await proxy[council]
      .connect(signer)
      .Epoch_setEpochDates(
        electionId,
        block.timestamp - 10,
        block.timestamp - 5,
        block.timestamp - 1,
        block.timestamp
      );
  }
  return null;
}

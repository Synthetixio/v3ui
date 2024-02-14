import { Contract, ethers } from 'ethers';

export async function setToAdminPeriod() {
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
  const wallet = new ethers.Wallet(
    '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
    provider
  );
  const contracts = [
    new Contract('0x62F424908BEaF103d0Dd1e0b230356A3785e409d', electionModuleABITest, wallet),
    new Contract('0x7bcE99fd5B548974a56062EFAc519B11d736D3AA', electionModuleABITest, wallet),
    new Contract('0x14F4d1a2Cc1553d55A86623A468C9Cd452176361', electionModuleABITest, wallet),
    new Contract('0x3e6C2487242DB3Ee685Bf2Bb646420CCa2243c8f', electionModuleABITest, wallet),
  ];
  const nonce = await provider.getTransactionCount(wallet.address);
  await Promise.all(
    contracts.map(async (c, i) => {
      const block = await provider.getBlock('latest');
      return await c.Epoch_setEpochDates(
        0,
        block.timestamp,
        block.timestamp + 10000,
        block.timestamp + 20000,
        block.timestamp + 30000,
        { nonce: nonce + i }
      );
    })
  );
  return null;
}

const electionModuleABITest = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_epochIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint64',
        name: 'startDate',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'nominationPeriodStartDate',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'votingPeriodStartDate',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'endDate',
        type: 'uint64',
      },
    ],
    name: 'Epoch_setEpochDates',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

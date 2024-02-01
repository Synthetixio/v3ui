import { Contract } from 'ethers';

export async function setToAdminPeriod({ signer }) {
  const contracts = [
    new Contract('0x62F424908BEaF103d0Dd1e0b230356A3785e409d', electionModuleABITest, signer),
    new Contract('0x7bcE99fd5B548974a56062EFAc519B11d736D3AA', electionModuleABITest, signer),
    new Contract('0x14F4d1a2Cc1553d55A86623A468C9Cd452176361', electionModuleABITest, signer),
    new Contract('0x3e6C2487242DB3Ee685Bf2Bb646420CCa2243c8f', electionModuleABITest, signer),
  ];
  await Promise.all(
    contracts.map(async (c) => {
      const block = await signer.provider.getBlock('latest');
      return await c.Epoch_setEpochDates(
        0,
        block.timestamp,
        block.timestamp + 10000,
        block.timestamp + 20000,
        block.timestamp + 30000
      );
    })
  );
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

import { Button, Flex, Text } from '@chakra-ui/react';
import { Contract, utils } from 'ethers';
import { useSigner } from '@snx-v3/useBlockchain';

export default function Admin() {
  const signer = useSigner();

  return (
    <Flex flexDir="column" gap="5">
      <Flex>
        <Text>Start Now Admin Period</Text>
        <Button
          onClick={() => {
            if (signer) {
              signer.provider.getBlock('latest').then((block) => {
                proxy
                  .connect(signer)
                  .Epoch_setEpochDates(
                    0,
                    block.timestamp,
                    block.timestamp + 10000,
                    block.timestamp + 20000,
                    block.timestamp + 30000
                  );
              });
            }
          }}
        >
          Now
        </Button>
      </Flex>
      <Flex>
        <Text>Start Now Nomination Period</Text>
        <Button
          onClick={() => {
            if (signer) {
              signer.provider.getBlock('latest').then((block) => {
                proxy
                  .connect(signer)
                  .Epoch_setEpochDates(
                    0,
                    block.timestamp - 10,
                    block.timestamp,
                    block.timestamp + 10000,
                    block.timestamp + 20000
                  );
              });
            }
          }}
        >
          Now
        </Button>
      </Flex>
      <Flex>
        <Text>Start Now Voting Period</Text>
        <Button
          onClick={() => {
            if (signer) {
              signer.provider.getBlock('latest').then((block) => {
                proxy
                  .connect(signer)
                  .Epoch_setEpochDates(
                    0,
                    block.timestamp - 200,
                    block.timestamp - 100,
                    block.timestamp,
                    block.timestamp + 10000
                  );
              });
            }
          }}
        >
          Now
        </Button>
      </Flex>
      <Flex>
        <Text>Start Now Eval Period</Text>
        <Button
          onClick={() => {
            if (signer) {
              signer.provider.getBlock('latest').then((block) => {
                proxy
                  .connect(signer)
                  .Epoch_setEpochDates(
                    0,
                    block.timestamp - 10,
                    block.timestamp - 5,
                    block.timestamp - 1,
                    block.timestamp
                  );
              });
            }
          }}
        >
          Now
        </Button>
      </Flex>

      <Flex>
        <Text>Set Snapshot Record Mock for voting power</Text>
        <Button
          onClick={() => {
            if (signer) {
              proxy
                .connect(signer)
                .setSnapshotContract('0x2f415c16d5527f630398bB4d787cd679726DaCE2', true);
            }
          }}
        >
          0x2f415c16d5527f630398bB4d787cd679726DaCE2
        </Button>
      </Flex>

      <Flex>
        <Text>Set Voting Power to current connected user</Text>
        <Button
          onClick={async () => {
            if (signer) {
              const address = await signer.getAddress();
              const electionId = await proxy.connect(signer).getEpochIndex();
              const snapshotId = await proxy
                .connect(signer)
                .getVotePowerSnapshotId('0x2f415c16d5527f630398bB4d787cd679726DaCE2', electionId);
              new Contract('0x2f415c16d5527f630398bB4d787cd679726DaCE2', [
                'function setBalanceOfOnPeriod(address user, uint balance, uint periodId) external',
              ])
                .connect(signer)
                .setBalanceOfOnPeriod(address, utils.parseEther('100'), snapshotId);
            }
          }}
        >
          set voting power
        </Button>
      </Flex>

      <Flex>
        <Text>Take vote power snapshot</Text>
        <Button
          onClick={async () => {
            if (signer) {
              await proxy
                .connect(signer)
                .takeVotePowerSnapshot('0x2f415c16d5527f630398bB4d787cd679726DaCE2');
            }
          }}
        >
          LFG
        </Button>
      </Flex>
    </Flex>
  );
}

const proxy = new Contract('0x62F424908BEaF103d0Dd1e0b230356A3785e409d', [
  'function takeVotePowerSnapshot(address snapshotContract) external override returns (uint128 snapshotId)',
  'function prepareBallotWithSnapshot(address snapshotContract, address voter) external override returns (uint256 power)',
  'function getVotePowerSnapshotId(address snapshotContract, uint128 electionId) external view returns (uint128)',
  {
    inputs: [
      {
        internalType: 'address',
        name: 'contract',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'enabled',
        type: 'bool',
      },
    ],
    name: 'setSnapshotContract',
    stateMutability: 'external',
    type: 'function',
  },
  {
    inputs: [],
    name: 'OverflowUint256ToUint64',
    type: 'error',
  },
  {
    name: 'getEpochIndex',
    outputs: [
      {
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_epochIndex',
        type: 'uint256',
      },
    ],
    name: 'Epoch_getCurrentPeriod',
    outputs: [
      {
        internalType: 'enum Epoch.ElectionPeriod',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_epochIndex',
        type: 'uint256',
      },
      {
        components: [
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
        internalType: 'struct Epoch.Data',
        name: 'epoch',
        type: 'tuple',
      },
    ],
    name: 'Epoch_getPeriodFor',
    outputs: [
      {
        internalType: 'enum Epoch.ElectionPeriod',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_epochIndex',
        type: 'uint256',
      },
    ],
    name: 'Epoch_get_endDate',
    outputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_epochIndex',
        type: 'uint256',
      },
    ],
    name: 'Epoch_get_nominationPeriodStartDate',
    outputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_epochIndex',
        type: 'uint256',
      },
    ],
    name: 'Epoch_get_startDate',
    outputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_epochIndex',
        type: 'uint256',
      },
    ],
    name: 'Epoch_get_votingPeriodStartDate',
    outputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
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
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_epochIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint64',
        name: 'val',
        type: 'uint64',
      },
    ],
    name: 'Epoch_set_endDate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_epochIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint64',
        name: 'val',
        type: 'uint64',
      },
    ],
    name: 'Epoch_set_nominationPeriodStartDate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_epochIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint64',
        name: 'val',
        type: 'uint64',
      },
    ],
    name: 'Epoch_set_startDate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_load_epochIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint64',
        name: 'val',
        type: 'uint64',
      },
    ],
    name: 'Epoch_set_votingPeriodStartDate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]);

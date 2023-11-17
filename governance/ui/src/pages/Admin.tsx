import { Button, Flex, Text } from '@chakra-ui/react';
import { Contract } from 'ethers';
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
                    block.timestamp + 1000,
                    block.timestamp + 2000,
                    block.timestamp + 3000
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
                    block.timestamp + 1000,
                    block.timestamp + 2000
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
                    block.timestamp + 1000
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
    </Flex>
  );
}

const proxy = new Contract('0x4066a172DD5D21E4f787C07D3118D0876296750B', [
  {
    inputs: [],
    name: 'OverflowUint256ToUint64',
    type: 'error',
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

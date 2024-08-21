import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import { utils } from 'ethers';
import { useSigner } from '../queries/useWallet';
import { getCouncilContract, SnapshotRecordContract } from '../utils/contracts';

export default function Admin() {
  const signer = useSigner();

  const allProxies = [
    getCouncilContract('spartan'),
    getCouncilContract('ambassador'),
    getCouncilContract('treasury'),
  ];

  return (
    <Flex direction="column" p="3" gap={4}>
      <Heading>All Councils</Heading>
      <Heading>One Button Click will trigger always {allProxies.length} Transactions</Heading>
      <Text>
        Currently{' '}
        {allProxies.length === 1
          ? 'only spartan council'
          : allProxies.length === 2
            ? 'spartan and ambassador councils'
            : 'all councils'}{' '}
        is/are active
      </Text>
      <Flex alignItems="center" gap={2}>
        <Text>Start Now Admin Period</Text>
        <Button
          onClick={() => {
            if (signer) {
              signer.provider.getBlock('latest').then((block) => {
                allProxies.map((proxy) =>
                  proxy
                    .connect(signer)
                    .Epoch_setEpochDates(
                      0,
                      block.timestamp,
                      block.timestamp + 10000,
                      block.timestamp + 20000,
                      block.timestamp + 30000,
                      {
                        maxPriorityFeePerGas: utils.parseUnits('1', 'gwei'),
                        maxFeePerGas: utils.parseUnits('2', 'gwei'),
                      }
                    )
                );
              });
            }
          }}
        >
          Now
        </Button>
      </Flex>
      <Flex alignItems="center" gap={2}>
        <Text>Start Now Nomination Period</Text>
        <Button
          onClick={() => {
            signer?.provider.getBlock('latest').then((block) => {
              allProxies.map((proxy) =>
                proxy
                  .connect(signer)
                  .Epoch_setEpochDates(
                    0,
                    block.timestamp - 10,
                    block.timestamp,
                    block.timestamp + 10000,
                    block.timestamp + 20000,
                    {
                      maxPriorityFeePerGas: utils.parseUnits('1', 'gwei'),
                      maxFeePerGas: utils.parseUnits('2', 'gwei'),
                    }
                  )
              );
            });
          }}
        >
          Now
        </Button>
      </Flex>
      <Flex alignItems="center" gap={2}>
        <Text>Start Now Voting Period</Text>
        <Button
          onClick={() => {
            signer?.provider.getBlock('latest').then((block) => {
              allProxies.map((proxy) =>
                proxy
                  .connect(signer)
                  .Epoch_setEpochDates(
                    0,
                    block.timestamp - 200,
                    block.timestamp - 100,
                    block.timestamp,
                    block.timestamp + 10000,
                    {
                      maxPriorityFeePerGas: utils.parseUnits('1', 'gwei'),
                      maxFeePerGas: utils.parseUnits('2', 'gwei'),
                    }
                  )
              );
            });
          }}
        >
          Now
        </Button>
      </Flex>
      <Flex alignItems="center" gap={2}>
        <Text>Start Now Eval Period</Text>
        <Button
          onClick={() => {
            signer?.provider.getBlock('latest').then((block) => {
              allProxies.map((proxy) =>
                proxy
                  .connect(signer)
                  .Epoch_setEpochDates(
                    0,
                    block.timestamp - 10,
                    block.timestamp - 5,
                    block.timestamp - 1,
                    block.timestamp,
                    {
                      maxPriorityFeePerGas: utils.parseUnits('1', 'gwei'),
                      maxFeePerGas: utils.parseUnits('2', 'gwei'),
                    }
                  )
              );
            });
          }}
        >
          Now
        </Button>
      </Flex>

      {/*  <Flex alignItems="center" gap={2}>
        <Text>Set Snapshot Record Mock for voting power</Text>
        <Button
          onClick={() => {
            allProxies.map((proxy, index) =>
              proxy
                .connect(signer!)
                .setSnapshotContract(
                  SnapshotRecordContract(
                    2192,
                    index === 0 ? 'spartan' : index === 1 ? 'ambassador' : 'treasury'
                  )?.address,
                  100,
                  true,
                  {
                    maxPriorityFeePerGas: utils.parseUnits('1', 'gwei'),
                    maxFeePerGas: utils.parseUnits('2', 'gwei'),
                  }
                )
            );
          }}
        >
          LFG (only in Administration)
        </Button>
      </Flex>*/}

      <Flex alignItems="center" gap={2}>
        <Text>Take vote power snapshot</Text>
        <Button
          onClick={async () => {
            allProxies.map((proxy, index) =>
              proxy
                .connect(signer!)
                .takeVotePowerSnapshot(
                  SnapshotRecordContract(
                    13001,
                    index === 0 ? 'spartan' : index === 1 ? 'ambassador' : 'treasury'
                  )?.address,
                  {
                    maxPriorityFeePerGas: utils.parseUnits('1', 'gwei'),
                    maxFeePerGas: utils.parseUnits('2', 'gwei'),
                  }
                )
            );
          }}
        >
          LFG (only in Nomination & Voting)
        </Button>
      </Flex>

      <Flex alignItems="center" gap={2}>
        <Text>Get yourself some voting Power</Text>
        <Button
          onClick={async () => {
            const address = await signer?.getAddress();
            allProxies.map(async (proxy, index) => {
              const electionId = await proxy.connect(signer!).Council_get_currentElectionId();
              const periodId = await proxy
                .connect(signer!)
                .getVotePowerSnapshotId(
                  SnapshotRecordContract(
                    13001,
                    index === 0 ? 'spartan' : index === 1 ? 'ambassador' : 'treasury'
                  )?.address,
                  electionId
                );
              SnapshotRecordContract(
                13001,
                index === 0 ? 'spartan' : index === 1 ? 'ambassador' : 'treasury'
              )
                ?.connect(signer!)
                ?.setBalanceOfOnPeriod(address, 100, periodId, {
                  maxPriorityFeePerGas: utils.parseUnits('1', 'gwei'),
                  maxFeePerGas: utils.parseUnits('2', 'gwei'),
                });
            });
          }}
        >
          LFG
        </Button>
      </Flex>
    </Flex>
  );
}

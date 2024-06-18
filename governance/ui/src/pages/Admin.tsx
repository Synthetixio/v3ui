import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import { Contract, utils } from 'ethers';
import { useSigner } from '../queries/useWallet';
import { SnapshotRecordContractAddress, getCouncilContract } from '../utils/contracts';

export default function Admin() {
  const signer = useSigner();

  return (
    <Flex flexDir="column" gap="5">
      {[
        getCouncilContract('spartan'),
        getCouncilContract('ambassador'),
        getCouncilContract('treasury'),
      ].map((proxy, index) => {
        return (
          <Flex direction="column" key={index} p="3" gap={4}>
            <Heading>
              {index === 0
                ? 'Spartan'
                : index === 1
                  ? 'Ambassador'
                  : index === 2
                    ? 'Grants'
                    : 'Treasury'}
            </Heading>
            <Flex alignItems="center" gap={2}>
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
            <Flex alignItems="center" gap={2}>
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
            <Flex alignItems="center" gap={2}>
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
            <Flex alignItems="center" gap={2}>
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

            <Flex alignItems="center" gap={2}>
              <Text>Set Snapshot Record Mock for voting power</Text>
              <Button
                onClick={() => {
                  if (signer) {
                    proxy.connect(signer).setSnapshotContract(SnapshotRecordContractAddress, true);
                  }
                }}
              >
                LFG (only in Administration)
              </Button>
            </Flex>

            <Flex alignItems="center" gap={2}>
              <Text>Set Voting Power to current connected user</Text>
              <Button
                onClick={async () => {
                  if (signer) {
                    const address = await signer.getAddress();
                    const electionId = await proxy.connect(signer).getEpochIndex();
                    const snapshotId = await proxy
                      .connect(signer)
                      .getVotePowerSnapshotId(SnapshotRecordContractAddress, electionId);
                    await new Contract(SnapshotRecordContractAddress, [
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

            <Flex alignItems="center" gap={2}>
              <Text>Take vote power snapshot</Text>
              <Button
                onClick={async () => {
                  if (signer) {
                    await proxy
                      .connect(signer)
                      .takeVotePowerSnapshot(SnapshotRecordContractAddress);
                  }
                }}
              >
                LFG (only in Nomination)
              </Button>
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
}

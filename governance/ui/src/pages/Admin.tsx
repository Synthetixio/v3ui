import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import { utils, Wallet } from 'ethers';
import { useSigner } from '../queries/useWallet';
import { SnapshotRecordContract, getCouncilContract } from '../utils/contracts';
import { motherShipProvider } from '../utils/providers';

export default function Admin() {
  const signer = useSigner();
  const wallet = new Wallet(
    '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
    motherShipProvider
  );

  return (
    <Flex flexDir="column" gap="5">
      {[
        getCouncilContract('spartan'),
        getCouncilContract('ambassador'),
        getCouncilContract('treasury'),
      ].map((proxy, index) => {
        return (
          <Flex direction="column" key={index} p="3" gap={4}>
            <Heading>{index === 0 ? 'SC' : index === 1 ? 'AM' : 'TC'}</Heading>
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
                          block.timestamp + 30000,
                          {
                            maxPriorityFeePerGas: utils.parseUnits('1', 'gwei'),
                            maxFeePerGas: utils.parseUnits('2', 'gwei'),
                          }
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
                          block.timestamp + 20000,
                          {
                            maxPriorityFeePerGas: utils.parseUnits('1', 'gwei'),
                            maxFeePerGas: utils.parseUnits('2', 'gwei'),
                          }
                        );
                    });
                  } else {
                    try {
                      wallet.provider.getBlock('latest').then((block) => {
                        proxy
                          .connect(wallet)
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
                          );
                      });
                    } catch (error) {
                      console.error(error);
                    }
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
                          block.timestamp + 10000,
                          {
                            maxPriorityFeePerGas: utils.parseUnits('1', 'gwei'),
                            maxFeePerGas: utils.parseUnits('2', 'gwei'),
                          }
                        );
                    });
                  } else {
                    try {
                      wallet.provider.getBlock('latest').then((block) => {
                        proxy
                          .connect(wallet)
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
                          );
                      });
                    } catch (error) {
                      console.error(error);
                    }
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
                          block.timestamp,
                          {
                            maxPriorityFeePerGas: utils.parseUnits('1', 'gwei'),
                            maxFeePerGas: utils.parseUnits('2', 'gwei'),
                          }
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
                    proxy
                      .connect(signer)
                      .setSnapshotContract(SnapshotRecordContract(421614)?.address, true, {
                        maxPriorityFeePerGas: utils.parseUnits('1', 'gwei'),
                        maxFeePerGas: utils.parseUnits('2', 'gwei'),
                      });
                  }
                }}
              >
                LFG (only in Administration)
              </Button>
            </Flex>

            <Flex alignItems="center" gap={2}>
              <Text>Take vote power snapshot</Text>
              <Button
                onClick={async () => {
                  if (signer) {
                    await proxy
                      .connect(signer)
                      .takeVotePowerSnapshot(SnapshotRecordContract(421614)?.address, {
                        maxPriorityFeePerGas: utils.parseUnits('1', 'gwei'),
                        maxFeePerGas: utils.parseUnits('2', 'gwei'),
                      });
                  }
                }}
              >
                LFG (only in Nomination & Voting)
              </Button>
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
}

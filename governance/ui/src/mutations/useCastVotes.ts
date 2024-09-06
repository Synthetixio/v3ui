import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  useGetEpochIndex,
  useGetUserVotingPower,
  useNetwork,
  useSigner,
  useWallet,
} from '../queries';
import { CouncilSlugs } from '../utils/councils';
import { getCouncilContract, isMotherchain, SnapshotRecordContract } from '../utils/contracts';
import { BigNumber, utils } from 'ethers';
import { useVoteContext } from '../context/VoteContext';
import { useMulticall } from '../hooks/useMulticall';
import { useToast } from '@chakra-ui/react';
import { motherShipProvider } from '../utils/providers';

export function useCastVotes(
  councils: CouncilSlugs[],
  candidates: { spartan?: string; ambassador?: string; treasury?: string }
) {
  const toast = useToast();
  const query = useQueryClient();
  const signer = useSigner();
  const { network } = useNetwork();
  const { activeWallet } = useWallet();
  const { dispatch } = useVoteContext();
  const { data: epochId } = useGetEpochIndex('spartan');
  const multicall = useMulticall();
  const { data: spartanVotingPower } = useGetUserVotingPower('spartan');
  const { data: ambassadorVotingPower } = useGetUserVotingPower('ambassador');
  const { data: treasuryVotingPower } = useGetUserVotingPower('treasury');
  const getVotingPowerByCouncil = (council: CouncilSlugs) => {
    switch (council) {
      case 'spartan':
        return spartanVotingPower;
      case 'ambassador':
        return ambassadorVotingPower;
      case 'treasury':
        return treasuryVotingPower;
      default:
        return spartanVotingPower;
    }
  };

  return useMutation({
    mutationKey: ['cast', councils.toString(), JSON.stringify(candidates)],
    mutationFn: async () => {
      if (signer && network && multicall) {
        const isMC = isMotherchain(network.id);
        try {
          const electionModules = councils.map((council) =>
            getCouncilContract(council).connect(signer)
          );
          const nomineesCheck = await Promise.all(
            electionModules.map(async (council, index) => {
              if (utils.isAddress(candidates[councils[index]] || '')) {
                return council
                  .connect(motherShipProvider(network.id))
                  .isNominated(candidates[councils[index]]);
              }
              return true;
            })
          );

          if (nomineesCheck.some((val) => val === false)) {
            throw new Error('Some of the candidates were not nominees');
          }
          const prepareBallotData = councils
            .map((council, index) => {
              if (!getVotingPowerByCouncil(council)?.isDeclared) {
                return isMC
                  ? {
                      target: electionModules[index].address,
                      callData: electionModules[0].interface.encodeFunctionData(
                        'prepareBallotWithSnapshot',
                        [
                          SnapshotRecordContract(network.id, council)?.address,
                          activeWallet?.address,
                        ]
                      ),
                    }
                  : {
                      target: electionModules[index].address,
                      callData: electionModules[0].interface.encodeFunctionData(
                        'prepareBallotWithSnapshot',
                        [
                          SnapshotRecordContract(network.id, council)?.address,
                          activeWallet?.address,
                        ]
                      ),
                      requireSuccess: true,
                      value: 0,
                    };
              }
              return null;
            })
            .filter((call) => !!call);
          let quote: BigNumber = BigNumber.from(0);
          if (!isMC) {
            quote = await electionModules[0].quoteCrossChainDeliveryPrice(43, 0, 2_000_000);
          }
          const castData = councils.map((council, index) => {
            const shouldWithdrawVote = candidates[council] === 'remove';
            return isMC
              ? {
                  target: electionModules[index].address,
                  callData: shouldWithdrawVote
                    ? electionModules[0].interface.encodeFunctionData('withdrawVote', [])
                    : electionModules[0].interface.encodeFunctionData('cast', [
                        [candidates[council]],
                        [getVotingPowerByCouncil(council)?.power],
                      ]),
                }
              : {
                  target: electionModules[index].address,
                  callData: shouldWithdrawVote
                    ? electionModules[0].interface.encodeFunctionData('withdrawVote', [])
                    : electionModules[0].interface.encodeFunctionData('cast', [
                        [candidates[council]],
                        [getVotingPowerByCouncil(council)?.power],
                      ]),
                  requireSuccess: true,
                  value: quote.add(quote.mul(25).div(100)),
                };
          });

          await multicall
            .connect(signer)
            [isMC ? 'aggregate' : 'aggregate3Value']([...prepareBallotData, ...castData], {
              value: isMC ? 0 : quote.add(quote.mul(25).div(100)).mul(councils.length),
            });
        } catch (error: any) {
          console.error(error);
          toast({
            title: 'Could not cast votes.',
            description: 'Check the browser console for more information',
            status: 'error',
            isClosable: true,
          });
        }
      } else {
        console.error('signer not connected');
      }
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: 'Could not cast votes.',
        description: 'Check the browser console for more information',
        status: 'error',
        isClosable: true,
      });
    },
    onSuccess: async () => {
      councils.map((council) => {
        const shouldWithdrawVote = candidates[council] === 'remove';
        shouldWithdrawVote
          ? dispatch({
              type: council.toUpperCase(),
              payload: {
                action: undefined,
                network: network!.id.toString(),
                epochId,
                wallet: activeWallet?.address,
              },
            })
          : dispatch({
              type: council.toUpperCase(),
              payload: {
                action: candidates[council],
                network: network!.id.toString(),
                epochId,
                wallet: activeWallet?.address,
              },
            });
      });
      await Promise.all(
        councils.map(
          async (council) =>
            await query.invalidateQueries({ queryKey: ['userBallot', council, network?.id] })
        )
      );

      await Promise.all(
        councils.map(
          async (council) =>
            await query.refetchQueries({
              queryKey: ['userBallot', council, network?.id],
              exact: false,
            })
        )
      );
    },
  });
}

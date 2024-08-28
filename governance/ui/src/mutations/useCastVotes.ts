import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGetUserVotingPower, useNetwork, useSigner, useWallet } from '../queries';
import { CouncilSlugs } from '../utils/councils';
import { getCouncilContract, isMotherchain, SnapshotRecordContract } from '../utils/contracts';
import { BigNumber } from 'ethers';
import { useVoteContext } from '../context/VoteContext';
import { useMulticall } from '../hooks/useMulticall';
import { useToast } from '@chakra-ui/react';

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
        const isMC = process.env.CI === 'true' ? true : isMotherchain(network.id);
        try {
          const electionModules = councils.map((council) =>
            getCouncilContract(council, network.id).connect(signer)
          );
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
              value: isMC ? 0 : quote.add(quote.mul(25).div(100)),
            });
        } catch (error) {
          console.error(error);
          toast({
            description: 'Could not cast votes.',
            status: 'error',
          });
        }
      } else {
        console.error('signer not connected');
      }
    },
    onError: () => {
      toast({
        description: 'Could not cast votes.',
        status: 'error',
      });
    },
    onSuccess: async () => {
      councils.map((council) => {
        const shouldWithdrawVote = candidates[council] === 'remove';
        shouldWithdrawVote
          ? dispatch({
              type: council.toUpperCase(),
              payload: { action: undefined, network: network!.id.toString() },
            })
          : dispatch({
              type: council.toUpperCase(),
              payload: { action: candidates[council], network: network!.id.toString() },
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

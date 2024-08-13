import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  useGetUserBallot,
  useGetUserVotingPower,
  useNetwork,
  useSigner,
  useWallet,
} from '../queries';
import { CouncilSlugs } from '../utils/councils';
import { getCouncilContract, SnapshotRecordContract } from '../utils/contracts';
import { BigNumber, Contract, utils } from 'ethers';
import { multicallABI } from '../utils/abi';
import { useVoteContext } from '../context/VoteContext';

export function useCastVotes(
  councils: CouncilSlugs[],
  candidates: { spartan?: string; ambassador?: string; treasury?: string }
) {
  const query = useQueryClient();
  const signer = useSigner();
  const { network } = useNetwork();
  const { activeWallet } = useWallet();
  const { dispatch } = useVoteContext();
  const multicall = new Contract('0xE2C5658cC5C448B48141168f3e475dF8f65A1e3e', multicallABI);

  const { data: spartanVotingPower } = useGetUserVotingPower('spartan');
  const { data: ambassadorVotingPower } = useGetUserVotingPower('ambassador');
  const { data: treasuryVotingPower } = useGetUserVotingPower('treasury');

  const { data: spartanBallot } = useGetUserBallot('spartan');
  const { data: ambassadorBallot } = useGetUserBallot('ambassador');
  const { data: treasuryBallot } = useGetUserBallot('treasury');

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

  const getBallotByCouncil = (council: CouncilSlugs) => {
    switch (council) {
      case 'spartan':
        return spartanBallot;
      case 'ambassador':
        return ambassadorBallot;
      case 'treasury':
        return treasuryBallot;
      default:
        return spartanBallot;
    }
  };

  return useMutation({
    mutationKey: ['cast', councils.toString(), JSON.stringify(candidates)],
    mutationFn: async () => {
      if (signer && network && multicall) {
        const isMotherchain = network.id === 2192;
        try {
          const electionModules = councils.map((council) =>
            getCouncilContract(council).connect(signer)
          );
          const prepareBallotData = councils
            .map((council) => {
              if (!getVotingPowerByCouncil(council)?.isDeclared) {
                return isMotherchain
                  ? {
                      target: electionModules[0].address,
                      callData: electionModules[0].interface.encodeFunctionData(
                        'prepareBallotWithSnapshot',
                        [
                          SnapshotRecordContract(network.id, council)?.address,
                          activeWallet?.address,
                        ]
                      ),
                    }
                  : {
                      target: electionModules[0].address,
                      callData: electionModules[0].interface.encodeFunctionData(
                        'prepareBallotWithSnapshot',
                        [
                          SnapshotRecordContract(network.id, council)?.address,
                          activeWallet?.address,
                        ]
                      ),
                      value: 0,
                      requireSuccess: true,
                    };
              }
              return null;
            })
            .filter((call) => !!call);
          let quote: BigNumber = BigNumber.from(0);
          if (!isMotherchain) {
            quote = await electionModules[0].quoteCrossChainDeliveryPrice(10005, 0, 1_000_000);
          }
          const castData = councils.map((council) => {
            const shouldWithdrawVote = candidates[council] === 'remove';
            return isMotherchain
              ? {
                  target: electionModules[0].address,
                  callData: shouldWithdrawVote
                    ? electionModules[0].interface.encodeFunctionData('withdrawVote', [
                        [getBallotByCouncil(council)?.votedCandidates[0]],
                      ])
                    : electionModules[0].interface.encodeFunctionData('cast', [
                        [candidates[council]],
                        [getVotingPowerByCouncil(council)?.power],
                      ]),
                }
              : {
                  target: electionModules[0].address,
                  callData: shouldWithdrawVote
                    ? electionModules[0].interface.encodeFunctionData('withdrawVote', [
                        [getBallotByCouncil(council)?.votedCandidates[0]],
                      ])
                    : electionModules[0].interface.encodeFunctionData('cast', [
                        [candidates[council]],
                        [getVotingPowerByCouncil(council)?.power],
                      ]),
                  value: quote.add(quote.mul(25).div(100)),
                  requireSuccess: true,
                };
          });

          await multicall
            .connect(signer)
            [isMotherchain ? 'aggregate' : 'aggregate3Value']([...prepareBallotData, ...castData], {
              maxPriorityFeePerGas: utils.parseUnits('1', 'gwei'),
              maxFeePerGas: utils.parseUnits('2', 'gwei'),
            });
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error('signer not connected');
      }
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

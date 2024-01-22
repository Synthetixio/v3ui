import { useQuery } from '@tanstack/react-query';
import { getCouncilContract } from '../utils/contracts';
import { CouncilSlugs } from '../utils/councils';
import { useGetVotingCandidates } from './useGetVotingCandidates';
import { motherShipProvider } from '../utils/providers';
import { BigNumber, utils } from 'ethers';
import { useWallet, useNetwork } from './useWallet';

export default function useGetCastVotes() {
  const { network } = useNetwork();
  const { activeWallet } = useWallet();

  const { data: votingCandidates } = useGetVotingCandidates();

  return useQuery({
    queryFn: async () => {
      const councils = Object.keys(votingCandidates ? votingCandidates : {});
      try {
        if (councils.length && votingCandidates && activeWallet?.address) {
          const data = await Promise.all(
            councils.map(async (council) => {
              const electionModuleContract = getCouncilContract(council as CouncilSlugs).connect(
                motherShipProvider
              );
              const addressToVoteForOrWithdraw = utils.getAddress(votingCandidates[council]);
              const epochIndex = await electionModuleContract.getEpochIndex();
              const ballot = (await electionModuleContract.getBallot(
                activeWallet.address,
                network?.id,
                epochIndex
              )) as { amounts: BigNumber[]; votedCandidates: string[]; votingPower: BigNumber };
              if (ballot.votedCandidates.includes(addressToVoteForOrWithdraw)) {
                return {
                  council,
                  data: electionModuleContract.interface.encodeFunctionData('withdrawVote', [
                    addressToVoteForOrWithdraw,
                  ]),
                };
              } else {
                return {
                  council,
                  data: electionModuleContract.interface.encodeFunctionData('cast', [
                    [addressToVoteForOrWithdraw],
                    [ballot.votingPower],
                  ]),
                };
              }
            })
          );
          return data;
        }
        return [];
      } catch (error) {
        console.error(error);
      }
    },
    queryKey: ['castVotes', activeWallet?.address, network?.id],
    enabled: !!activeWallet?.address,
    staleTime: 900000,
  });
}

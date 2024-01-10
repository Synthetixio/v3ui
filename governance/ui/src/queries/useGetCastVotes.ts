import { useQuery } from '@tanstack/react-query';
import { useNetwork, useWallet } from '@snx-v3/useBlockchain';
import { getCouncilContract } from '../utils/contracts';
import { CouncilSlugs } from '../utils/councils';
import { useGetVotingCandidates } from './useGetVotingCandidates';
import { motherShipProvider } from '../utils/providers';
import { BigNumber, utils } from 'ethers';

export default function useGetCastVotes() {
  const network = useNetwork();
  const account = useWallet();
  const { data: votingCandidates } = useGetVotingCandidates();

  return useQuery({
    queryFn: async () => {
      const councils = Object.keys(votingCandidates ? votingCandidates : {});
      try {
        if (councils.length && votingCandidates && account?.address) {
          const data = await Promise.all(
            councils.map(async (council) => {
              const electionModuleContract = getCouncilContract(council as CouncilSlugs).connect(
                motherShipProvider
              );
              const addressToVoteForOrWithdraw = utils.getAddress(votingCandidates[council]);
              const epochIndex = await electionModuleContract.getEpochIndex();
              const ballot = (await electionModuleContract.getBallot(
                account.address,
                network.id,
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
    queryKey: ['castVotes', account?.address, network.id],
    enabled: !!account?.address,
    staleTime: 900000,
  });
}

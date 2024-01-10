import { useQuery } from '@tanstack/react-query';
import { useNetwork, useSigner } from '@snx-v3/useBlockchain';
import { CouncilSlugs } from '../utils/councils';
import { getCouncilContract } from '../utils/contracts';
import { BigNumber } from 'ethers';

export default function useGetUserBallot(council: CouncilSlugs) {
  const network = useNetwork();
  const signer = useSigner();

  return useQuery({
    queryFn: async () => {
      const electionModule = getCouncilContract(council).connect(signer!);
      const voter = await signer!.getAddress();
      const electionId = electionModule.getEpochIndex();
      const ballot: { votingPower: BigNumber; votedCandidates: string[]; amounts: BigNumber[] } =
        await electionModule.getBallot(voter, network.id, electionId);
      return ballot;
    },
    enabled: !!signer,
    queryKey: ['userBallot', council],
    staleTime: 900000,
  });
}

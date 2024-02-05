import { useQuery } from '@tanstack/react-query';
import { useNetwork, useWallet } from '@snx-v3/useBlockchain';
import { CouncilSlugs } from '../utils/councils';
import { SnapshotRecordContractAddress, getCouncilContract } from '../utils/contracts';
import { useProvider } from './';

export function useGetUserVotingPower(council: CouncilSlugs) {
  const network = useNetwork();
  const provider = useProvider();
  const wallet = useWallet();

  return useQuery({
    queryFn: async () => {
      if (!wallet?.address || !provider) return;

      try {
        const electionModule = getCouncilContract(council).connect(provider);
        const electionId = electionModule.connect(provider).getEpochIndex();

        const ballot = await electionModule
          .connect(provider)
          .getBallot(wallet?.address, network.id, electionId);

        if (ballot && ballot.votingPower.gt(0)) {
          return ballot.votingPower.toString();
        }

        const votingPower = await electionModule.callStatic.prepareBallotWithSnapshot(
          SnapshotRecordContractAddress,
          wallet?.address
        );

        return votingPower.toString();
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log({ error });
      }
    },
    enabled: !!provider && !!wallet?.address,
    queryKey: ['userBallot', council.toString(), wallet?.address],
    staleTime: 60000,
  });
}

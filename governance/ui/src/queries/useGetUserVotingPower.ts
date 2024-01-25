import { useQuery } from '@tanstack/react-query';
import { useNetwork, useSigner, useWallet } from '@snx-v3/useBlockchain';
import { CouncilSlugs } from '../utils/councils';
import { SnapshotRecordContractAddress, getCouncilContract } from '../utils/contracts';

export default function useGetUserVotingPower(council: CouncilSlugs) {
  const network = useNetwork();
  const signer = useSigner();
  const wallet = useWallet();

  return useQuery({
    queryFn: async () => {
      if (signer) {
        try {
          const electionModule = getCouncilContract(council).connect(signer!);
          const voter = await signer!.getAddress();
          const electionId = electionModule.connect(signer!).getEpochIndex();
          const ballot = await electionModule
            .connect(signer!)
            .getBallot(voter, network.id, electionId);

          if (ballot && ballot.votingPower.gt(0)) {
            return ballot.votingPower.toString();
          }

          const votingPower = await electionModule.callStatic.prepareBallotWithSnapshot(
            SnapshotRecordContractAddress,
            wallet?.address
          );

          return votingPower.toString();
        } catch (error) {}

        return '0';
      }
    },
    enabled: !!signer,
    queryKey: ['userBallot', council.toString(), wallet?.address],
    staleTime: 60000,
    initialData: '0',
  });
}

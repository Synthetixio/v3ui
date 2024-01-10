import { useMutation } from '@tanstack/react-query';
import { useSigner } from '@snx-v3/useBlockchain';
import { CouncilSlugs } from '../utils/councils';
import { getCouncilContract, SnapshotRecordContractAddress } from '../utils/contracts';

export default function useDeclareVotingPower(council: CouncilSlugs) {
  const signer = useSigner();

  return useMutation({
    mutationFn: async () => {
      if (signer) {
        try {
          const electionModule = getCouncilContract(council).connect(signer);
          const voter = await signer.getAddress();
          await electionModule.prepareBallotWithSnapshot(
            SnapshotRecordContractAddress,
            voter
          );
        } catch (error) {
          console.error(error);
        }
      }
    },
    mutationKey: ['userVotingPower', council],
  });
}

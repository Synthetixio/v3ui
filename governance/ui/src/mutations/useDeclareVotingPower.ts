import { useMutation } from '@tanstack/react-query';
import { CouncilSlugs } from '../utils/councils';
import { getCouncilContract, SnapshotRecordContractAddress } from '../utils/contracts';
import { useSigner } from '../queries/useWallet';

export default function useDeclareVotingPower(council: CouncilSlugs) {
  const signer = useSigner();

  return useMutation({
    mutationFn: async () => {
      if (signer) {
        try {
          const electionModule = getCouncilContract(council).connect(signer);
          const voter = await signer.getAddress();
          await electionModule.prepareBallotWithSnapshot(SnapshotRecordContractAddress, voter);
        } catch (error) {
          console.error(error);
        }
      }
    },
    mutationKey: ['userVotingPower', council],
  });
}

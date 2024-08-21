import { useMutation } from '@tanstack/react-query';
import { CouncilSlugs } from '../utils/councils';
import { getCouncilContract, SnapshotRecordContract } from '../utils/contracts';
import { useNetwork, useSigner } from '../queries/useWallet';

export default function useDeclareVotingPower(council: CouncilSlugs) {
  const signer = useSigner();
  const { network } = useNetwork();

  return useMutation({
    mutationFn: async () => {
      if (signer && network) {
        try {
          const electionModule = getCouncilContract(council).connect(signer);
          const voter = await signer.getAddress();
          await electionModule.prepareBallotWithSnapshot(
            SnapshotRecordContract(network.id, council)?.address,
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

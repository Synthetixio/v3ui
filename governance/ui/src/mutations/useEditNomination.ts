import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSigner } from '@snx-v3/useBlockchain';
import { getCouncilContract } from '../utils/contracts';
import { CouncilSlugs } from '../utils/councils';

export default function useEditNomination({
  currentNomination,
  nextNomination,
}: {
  currentNomination?: CouncilSlugs;
  nextNomination?: CouncilSlugs;
}) {
  const queryClient = useQueryClient();
  const signer = useSigner();
  return useMutation({
    mutationFn: async () => {
      if (signer) {
        if ((nextNomination && currentNomination) || (!nextNomination && currentNomination)) {
          const tx1 = await getCouncilContract(currentNomination)
            .connect(signer)
            .withdrawNomination();
          await tx1.wait();
        }
        if (nextNomination) {
          const tx2 = await getCouncilContract(nextNomination).connect(signer).nominate();
          await tx2.wait();
        }
      }
    },
    mutationKey: ['editNomination', currentNomination, nextNomination],
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ['isNominated'] });
    },
  });
}

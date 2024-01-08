import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSigner } from '@snx-v3/useBlockchain';
import { getCouncilContract } from '../utils/contracts';
import { CouncilSlugs } from '../utils/councils';

export default function useEditNomination(council: CouncilSlugs, address?: string) {
  const queryClient = useQueryClient();
  const signer = useSigner();
  return useMutation({
    mutationFn: async () => {
      if (signer) {
        const tx1 = await getCouncilContract(council).connect(signer).withdrawNomination();
        await tx1.wait();
        const tx2 = await getCouncilContract(council).connect(signer).nominate();
        await tx2.wait();
      }
    },
    mutationKey: ['editNomination', council, address],
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ['isNominated', address] });
    },
  });
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CouncilSlugs } from '../utils/councils';
import { getCouncilContract } from '../utils/contracts';
import { useSigner } from '../queries/useWallet';

export default function useNominateSelf(council: CouncilSlugs, address?: string) {
  const query = useQueryClient();
  const signer = useSigner();
  return useMutation({
    mutationFn: async () => {
      if (signer) {
        const tx = await getCouncilContract(council).connect(signer).nominate();
        await tx.wait();
      }
    },
    mutationKey: ['nomination', council, address],
    onSuccess: async () => {
      await query.refetchQueries({ queryKey: ['isNominated', address], exact: false });
    },
  });
}

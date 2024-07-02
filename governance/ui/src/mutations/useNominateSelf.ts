import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CouncilSlugs } from '../utils/councils';
import { getCouncilContract } from '../utils/contracts';
import { useSigner } from '../queries/useWallet';
import { useToast } from '@chakra-ui/react';
import { CustomToast } from '../components/CustomToast';
import { devSigner } from '../utils/providers';

export default function useNominateSelf(council: CouncilSlugs, address?: string) {
  const query = useQueryClient();
  const signer = useSigner();
  const toast = useToast();

  return useMutation({
    mutationFn: async () => {
      if (signer) {
        const tx = await getCouncilContract(council)
          .connect(process.env.DEV === 'true' ? devSigner : signer)
          .nominate();
        await tx.wait();
      }
    },
    mutationKey: ['nomination', council, address],
    onSuccess: async () => {
      await query.invalidateQueries({
        queryKey: ['isNominated', address],
      });
      await query.invalidateQueries({ queryKey: ['nominees', council], exact: false });
      await query.invalidateQueries({ queryKey: ['nomineesDetails', council], exact: false });
      await query.refetchQueries({ queryKey: ['nominees', council], exact: false });
      await query.refetchQueries({ queryKey: ['nomineesDetails', council], exact: false });
      toast({
        description: 'Successfully nominated yourself.',
        status: 'success',
        render: CustomToast,
      });
    },
  });
}

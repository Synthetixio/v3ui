import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CouncilSlugs } from '../utils/councils';
import { getCouncilContract } from '../utils/contracts';
import { useSigner } from '../queries/useWallet';
import { useToast } from '@chakra-ui/react';
import { utils } from 'ethers';

export default function useNominateSelf(council: CouncilSlugs, address?: string) {
  const query = useQueryClient();
  const signer = useSigner();
  const toast = useToast();

  return useMutation({
    mutationFn: async () => {
      if (signer) {
        try {
          const tx = await getCouncilContract(council)
            .connect(signer)
            .nominate({
              maxPriorityFeePerGas: utils.parseUnits('1', 'gwei'),
              maxFeePerGas: utils.parseUnits('2', 'gwei'),
            });
          await tx.wait();
          return true;
        } catch (err: any) {
          toast({
            description: err?.message ? err.message : 'Something went wrong.',
            status: 'error',
          });
          throw new Error(err);
        }
      }
    },
    mutationKey: ['nomination', council, address],
    onSuccess: async () => {
      await query.invalidateQueries({
        queryKey: ['isNominated', address],
      });
      await query.invalidateQueries({ queryKey: ['nominees', council], exact: false });
      await query.invalidateQueries({
        queryKey: ['nomineesDetails', council, address],
        exact: false,
      });
      await query.refetchQueries({ queryKey: ['nominees', council], exact: false });
      await query.refetchQueries({ queryKey: ['nomineesDetails', council, address], exact: false });
      toast({
        description: 'Successfully nominated yourself.',
        status: 'success',
      });
    },
  });
}

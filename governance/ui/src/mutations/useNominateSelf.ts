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
            isClosable: true,
          });
          throw new Error(err);
        }
      }
    },
    mutationKey: ['nomination', council, address],
    onSuccess: async () => {
      await Promise.all([
        query.invalidateQueries({
          queryKey: ['isNominated'],
        }),
        query.invalidateQueries({ queryKey: ['nominees'], exact: false }),
        query.invalidateQueries({
          queryKey: ['nomineesDetails'],
          exact: false,
        }),
      ]);
      await Promise.all([
        query.refetchQueries({ queryKey: ['isNominated'], exact: false }),
        query.refetchQueries({ queryKey: ['nominees'], exact: false }),
        query.refetchQueries({ queryKey: ['nomineesDetails'], exact: false }),
      ]);
      toast({
        description: 'Successfully nominated yourself.',
        status: 'success',
        isClosable: true,
      });
    },
  });
}

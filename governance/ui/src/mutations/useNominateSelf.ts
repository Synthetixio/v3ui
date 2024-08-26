import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CouncilSlugs } from '../utils/councils';
import { getCouncilContract } from '../utils/contracts';
import { useNetwork, useSigner } from '../queries/useWallet';
import { useToast } from '@chakra-ui/react';
import { utils } from 'ethers';

export default function useNominateSelf(council: CouncilSlugs, address?: string) {
  const query = useQueryClient();
  const signer = useSigner();
  const toast = useToast();
  const { network } = useNetwork();

  return useMutation({
    mutationFn: async () => {
      if (signer) {
        const tx = await getCouncilContract(council)
          .connect(signer)
          .nominate({
            maxPriorityFeePerGas: utils.parseUnits('1', 'gwei'),
            maxFeePerGas: utils.parseUnits('2', 'gwei'),
          });
        await tx.wait();
      }
    },
    mutationKey: ['nomination', council, address],
    onSuccess: async () => {
      await Promise.all([
        query.invalidateQueries({
          queryKey: ['isNominated', address, network?.id],
        }),
        query.invalidateQueries({ queryKey: ['nominees', council], exact: false }),
        query.invalidateQueries({
          queryKey: ['nomineesDetails', council, address],
          exact: false,
        }),
        query.refetchQueries({ queryKey: ['isNominated', address, network?.id], exact: false }),
        query.refetchQueries({ queryKey: ['nominees', council], exact: false }),
        query.refetchQueries({ queryKey: ['nomineesDetails', council, address], exact: false }),
      ]);
      toast({
        description: 'Successfully nominated yourself.',
        status: 'success',
      });
    },
  });
}

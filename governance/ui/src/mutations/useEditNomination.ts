import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSigner } from '../queries/useWallet';
import { getCouncilContract } from '../utils/contracts';
import { CouncilSlugs } from '../utils/councils';
import { CustomToast } from '../components/CustomToast';
import { useToast } from '@chakra-ui/react';

export default function useEditNomination({
  currentNomination,
  nextNomination,
}: {
  currentNomination?: CouncilSlugs;
  nextNomination?: CouncilSlugs;
}) {
  const queryClient = useQueryClient();
  const signer = useSigner();
  const toast = useToast();

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
      toast({
        description: 'Nomination successfully edited.',
        status: 'success',
        render: CustomToast,
      });
    },
  });
}

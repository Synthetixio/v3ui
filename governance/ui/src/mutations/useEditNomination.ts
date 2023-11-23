import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSigner } from '@snx-v3/useBlockchain';
import { ElectionModule } from '../utils/contracts';

export default function useEditNomination(council: any, address?: string) {
  const queryClient = useQueryClient();
  const signer = useSigner();
  return useMutation({
    mutationFn: async () => {
      // TODO @dev implement other councils depending on parameter
      // TODO @dev implement multicall once it s deployed

      if (signer) {
        const tx1 = await ElectionModule.connect(signer).withdrawNomination();
        await tx1.wait();
        if (council !== 'none') {
          const tx2 = await ElectionModule.connect(signer).nominate();
          await tx2.wait();
        }
      }
    },
    mutationKey: ['editNomination', council, address],
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ['useGetIsNominated'] });
    },
  });
}

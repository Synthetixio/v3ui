import { useMutation } from '@tanstack/react-query';
import { CouncilSlugs } from '../utils/councils';
import { useSigner, useWallet } from '@snx-v3/useBlockchain';
import { ElectionModule } from '../utils/contracts';
import { motherShipProvider } from '../utils/providers';

export default function useNominateSelf(council: CouncilSlugs, address?: string) {
  const signer = useSigner();
  return useMutation({
    mutationFn: async () => {
      // TODO @dev implement other councils depending on parameter
      if (signer) {
        const tx = await ElectionModule.connect(signer).nominate();
        await tx.wait();
      }
    },
    mutationKey: ['nomination', council, address],
  });
}

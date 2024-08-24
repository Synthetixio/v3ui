import { useQuery } from '@tanstack/react-query';
import { CouncilSlugs } from '../utils/councils';
import { motherShipProvider } from '../utils/providers';
import { getCouncilContract } from '../utils/contracts';
import { useNetwork } from './useWallet';

export function useGetCurrentPeriod(council?: CouncilSlugs) {
  const { network } = useNetwork();
  return useQuery({
    queryKey: ['period', council, network?.id],
    queryFn: async () => {
      return (
        await getCouncilContract(council!)
          .connect(motherShipProvider(network?.id || 13001))
          .getCurrentPeriod()
      ).toString() as string | undefined;
    },
    enabled: !!council,
    staleTime: 900000,
  });
}

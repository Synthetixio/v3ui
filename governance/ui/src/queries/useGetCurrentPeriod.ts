import { useQuery } from '@tanstack/react-query';
import { CouncilSlugs } from '../utils/councils';
import { motherShipProvider } from '../utils/providers';
import { getCouncilContract } from '../utils/contracts';

export function useGetCurrentPeriod(council?: CouncilSlugs) {
  return useQuery({
    queryKey: ['period', council],
    queryFn: async () => {
      if (council)
        return (
          await getCouncilContract(council).connect(motherShipProvider).getCurrentPeriod()
        ).toString() as string | undefined;
    },
    enabled: !!council,
    staleTime: 900000,
  });
}

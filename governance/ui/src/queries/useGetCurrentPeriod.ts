import { useQuery } from '@tanstack/react-query';
import { CouncilSlugs } from '../utils/councils';
import { ElectionModule } from '../utils/contracts';
import { motherShipProvider } from '../utils/providers';

export function useGetCurrentPeriod(council: CouncilSlugs) {
  return useQuery({
    queryKey: ['period', council],
    queryFn: async () => {
      return (await ElectionModule.connect(motherShipProvider).getCurrentPeriod()).toString() as
        | string
        | undefined;
    },
    enabled: !!council,
    staleTime: 900000,
  });
}

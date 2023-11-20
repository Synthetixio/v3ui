import { useQuery } from '@tanstack/react-query';
import { Council } from '../utils/councils';
import { ElectionModule } from '../utils/contracts';
import { motherShipProvider } from '../utils/providers';

export function useGetCurrentPeriod(council: Council['slug']) {
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

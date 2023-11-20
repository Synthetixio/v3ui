import { useQuery } from '@tanstack/react-query';
import { CouncilSlugs } from '../utils/councils';
import { ElectionModule } from '../utils/contracts';
import { motherShipProvider } from '../utils/providers';

export function useGetCouncilNominees(council: CouncilSlugs) {
  return useQuery({
    queryKey: ['nominees', council],
    queryFn: async () => {
      return (await ElectionModule.connect(motherShipProvider).getNominees()) as
        | string[]
        | undefined;
    },
    enabled: !!council,
    staleTime: 900000,
  });
}

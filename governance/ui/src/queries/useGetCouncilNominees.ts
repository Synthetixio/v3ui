import { useQuery } from '@tanstack/react-query';
import { Council } from '../utils/councils';
import { ElectionModule } from '../utils/Contracts';
import { motherShipProvider } from '../utils/providers';

export function useGetCouncilNominees(council: Council['slug']) {
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

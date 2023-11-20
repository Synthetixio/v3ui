import { useQuery } from '@tanstack/react-query';
import { CouncilSlugs } from '../utils/councils';
import { ElectionModule } from '../utils/contracts';
import { motherShipProvider } from '../utils/providers';

export function useGetCouncilMembers(council: CouncilSlugs) {
  return useQuery({
    queryKey: ['members', council],
    queryFn: async () => {
      return (await ElectionModule.connect(motherShipProvider).getCouncilMembers()) as
        | string[]
        | undefined;
    },
    enabled: !!council,
    staleTime: 900000,
  });
}

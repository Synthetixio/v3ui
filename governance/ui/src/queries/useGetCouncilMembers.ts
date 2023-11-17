import { useQuery } from '@tanstack/react-query';
import { Council } from '../utils/councils';
import { ElectionModule } from '../utils/Contracts';
import { motherShipProvider } from '../utils/providers';

export function useGetCouncilMembers(council: Council['slug']) {
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

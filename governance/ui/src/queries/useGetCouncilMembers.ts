import { useQuery } from '@tanstack/react-query';
import { CouncilSlugs } from '../utils/councils';
import { getCouncilContract } from '../utils/contracts';
import { motherShipProvider } from '../utils/providers';

export function useGetCouncilMembers(council: CouncilSlugs) {
  return useQuery({
    queryKey: ['members', council],
    queryFn: async () => {
      const members = (await getCouncilContract(council)
        .connect(motherShipProvider)
        .getCouncilMembers()) as string[];
      return members;
    },
    enabled: !!council,
    staleTime: 900000,
  });
}

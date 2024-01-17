import { useQuery } from '@tanstack/react-query';
import { CouncilSlugs } from '../utils/councils';
import { motherShipProvider } from '../utils/providers';
import { getCouncilContract } from '../utils/contracts';

export function useGetNextElectionSettings(council: CouncilSlugs) {
  return useQuery({
    queryKey: ['next-epoch-settings', council],
    queryFn: async () => {
      const schedule = await getCouncilContract(council)
        .connect(motherShipProvider)
        .getNextElectionSettings();
      return Number(schedule.epochDuration.toString()) as number | undefined;
    },
    enabled: !!council,
    staleTime: 900000,
  });
}

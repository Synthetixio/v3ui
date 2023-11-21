import { useQuery } from '@tanstack/react-query';
import { CouncilSlugs } from '../utils/councils';
import { ElectionModule } from '../utils/contracts';
import { motherShipProvider } from '../utils/providers';

export function useGetNextElectionSettings(council: CouncilSlugs) {
  return useQuery({
    queryKey: ['next-epoch-settings', council],
    queryFn: async () => {
      const schedule = await ElectionModule.connect(motherShipProvider).getNextElectionSettings();
      return Number(schedule.epochDuration.toString()) as number | undefined;
    },
    enabled: !!council,
    staleTime: 900000,
  });
}

import { useQuery } from '@tanstack/react-query';
import { CouncilSlugs } from '../utils/councils';
import { ElectionModule } from '../utils/contracts';
import { motherShipProvider } from '../utils/providers';

export function useGetEpochSchedule(council: CouncilSlugs) {
  return useQuery({
    queryKey: ['epoch-schedule', council],
    queryFn: async () => {
      const schedule = await ElectionModule.connect(motherShipProvider).getEpochSchedule();
      return {
        startDate: Number(schedule.startDate.toString()),
        nominationPeriodStartDate: Number(schedule.nominationPeriodStartDate.toString()),
        votingPeriodStartDate: Number(schedule.votingPeriodStartDate.toString()),
        endDate: Number(schedule.endDate.toString()),
      } as
        | {
            startDate: number;

            nominationPeriodStartDate: number;

            votingPeriodStartDate: number;

            endDate: number;
          }
        | undefined;
    },
    enabled: !!council,
    staleTime: 900000,
  });
}

import { useQuery } from '@tanstack/react-query';
import { CouncilSlugs } from '../utils/councils';
import { ElectionModule } from '../utils/contracts';
import { motherShipProvider } from '../utils/providers';
import { useIsConnected, useProvider } from '@snx-v3/useBlockchain';

export function useGetEpochSchedule(council: CouncilSlugs) {
  const isConnected = useIsConnected();
  const provider = useProvider();
  return useQuery({
    queryKey: ['epoch-schedule', council],
    queryFn: async () => {
      const schedule = await ElectionModule.connect(
        isConnected ? provider : motherShipProvider
      ).getEpochSchedule();
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

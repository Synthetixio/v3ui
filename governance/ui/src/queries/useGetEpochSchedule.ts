import { useQuery } from '@tanstack/react-query';
import { CouncilSlugs } from '../utils/councils';
import { motherShipProvider } from '../utils/providers';
import { getCouncilContract } from '../utils/contracts';
import { useProvider } from './useWallet';

export function useGetEpochSchedule(council?: CouncilSlugs) {
  const provider = useProvider();

  return useQuery({
    queryKey: ['epoch-schedule', council],
    queryFn: async () => {
      const schedule = await getCouncilContract(council!)
        .connect(provider ? provider : motherShipProvider)
        .getEpochSchedule();
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

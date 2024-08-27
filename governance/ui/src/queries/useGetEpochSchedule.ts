import { useQuery } from '@tanstack/react-query';
import { CouncilSlugs } from '../utils/councils';
import { motherShipProvider } from '../utils/providers';
import { getCouncilContract } from '../utils/contracts';
import { useNetwork } from './useWallet';

export function useGetEpochSchedule(council?: CouncilSlugs) {
  const { network } = useNetwork();

  return useQuery({
    queryKey: ['epoch-schedule', council, network?.id],
    queryFn: async () => {
      const schedule = await getCouncilContract(council!, network?.id)
        .connect(motherShipProvider(network?.id || 13001))
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

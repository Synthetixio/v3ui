import { useQuery } from '@tanstack/react-query';
import { CouncilSlugs } from '../utils/councils';
import { motherShipProvider } from '../utils/providers';
import { getCouncilContract } from '../utils/contracts';
import { useNetwork } from './useWallet';
import { useGetEpochSchedule } from './useGetEpochSchedule';

export function useGetCurrentPeriod(council?: CouncilSlugs) {
  const { network } = useNetwork();
  const { data: schedule } = useGetEpochSchedule(council);
  return useQuery({
    queryKey: ['period', council, network?.id, schedule?.endDate],
    queryFn: async () => {
      return (
        await getCouncilContract(council!)
          .connect(motherShipProvider(network?.id || 2192))
          .getCurrentPeriod()
      ).toString() as string | undefined;
    },
    enabled: !!council,
    staleTime: 900000,
  });
}

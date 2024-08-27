import { useQuery } from '@tanstack/react-query';
import { CouncilSlugs } from '../utils/councils';
import { motherShipProvider } from '../utils/providers';
import { getCouncilContract } from '../utils/contracts';
import { useNetwork } from './useWallet';

export function useGetNextElectionSettings(council: CouncilSlugs) {
  const { network } = useNetwork();
  return useQuery({
    queryKey: ['next-epoch-settings', council],
    queryFn: async () => {
      const schedule = await getCouncilContract(council, network?.id)
        .connect(motherShipProvider(network?.id || 13001))
        .getNextElectionSettings();
      return Number(schedule.epochDuration.toString()) as number | undefined;
    },
    enabled: !!council,
    staleTime: 900000,
  });
}

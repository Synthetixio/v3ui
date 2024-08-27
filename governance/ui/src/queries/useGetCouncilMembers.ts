import { useQuery } from '@tanstack/react-query';
import { CouncilSlugs } from '../utils/councils';
import { getCouncilContract } from '../utils/contracts';
import { motherShipProvider } from '../utils/providers';
import { useNetwork } from './useWallet';

export function useGetCouncilMembers(council: CouncilSlugs) {
  const { network } = useNetwork();
  return useQuery({
    queryKey: ['members', council, network?.id],
    queryFn: async () => {
      const members = (await getCouncilContract(council)
        .connect(motherShipProvider(network?.id || 13001))
        .getCouncilMembers()) as string[];
      return members;
    },
    enabled: !!council,
    staleTime: 900000,
  });
}

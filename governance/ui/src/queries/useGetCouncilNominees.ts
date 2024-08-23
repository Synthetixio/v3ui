import { useQuery } from '@tanstack/react-query';
import { CouncilSlugs } from '../utils/councils';
import { motherShipProvider } from '../utils/providers';
import { getCouncilContract } from '../utils/contracts';
import { useNetwork } from './useWallet';

export function useGetCouncilNominees(council: CouncilSlugs) {
  const { network } = useNetwork();
  return useQuery({
    queryKey: ['nominees', council, network?.id],
    queryFn: async () => {
      return (await getCouncilContract(council)
        .connect(motherShipProvider(network?.id || 13001))
        .getNominees()) as string[];
    },
    enabled: !!council,
    staleTime: 900000,
  });
}

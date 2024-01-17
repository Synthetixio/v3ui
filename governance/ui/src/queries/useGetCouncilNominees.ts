import { useQuery } from '@tanstack/react-query';
import { CouncilSlugs } from '../utils/councils';
import { motherShipProvider } from '../utils/providers';
import { useIsConnected, useProvider } from '@snx-v3/useBlockchain';
import { getCouncilContract } from '../utils/contracts';

export function useGetCouncilNominees(council: CouncilSlugs) {
  const isConnected = useIsConnected();
  const provider = useProvider();
  return useQuery({
    queryKey: ['nominees', council],
    queryFn: async () => {
      return (await getCouncilContract(council)
        .connect(isConnected ? provider : motherShipProvider)
        .getNominees()) as string[] | undefined;
    },
    enabled: !!council,
    staleTime: 900000,
  });
}

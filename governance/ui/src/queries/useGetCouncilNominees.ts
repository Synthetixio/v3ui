import { useQuery } from '@tanstack/react-query';
import { CouncilSlugs } from '../utils/councils';
import { motherShipProvider } from '../utils/providers';
import { getCouncilContract } from '../utils/contracts';
import { useProvider } from './useWallet';

export function useGetCouncilNominees(council: CouncilSlugs) {
  const provider = useProvider();

  return useQuery({
    queryKey: ['nominees', council],
    queryFn: async () => {
      return (await getCouncilContract(council)
        .connect(provider ? provider : motherShipProvider)
        .getNominees()) as string[] | undefined;
    },
    enabled: !!council,
    staleTime: 900000,
  });
}

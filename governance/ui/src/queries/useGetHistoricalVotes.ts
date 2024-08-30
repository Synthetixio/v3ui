import { useQuery } from '@tanstack/react-query';
import { CouncilSlugs } from '../utils/councils';
import { useNetwork } from './useWallet';

const testnetURL = 'https://api.synthetix.io/v3/snax-testnet/votes';

export function useGetHistoricalVotes(council: CouncilSlugs) {
  const { network } = useNetwork();
  return useQuery({
    queryKey: ['historical-votes', council, network?.id],
    queryFn: async () => {
      const res = await fetch(network?.id === 2192 ? testnetURL : testnetURL);
      const votes = await res.json();
      return votes;
    },
    staleTime: 900000,
  });
}

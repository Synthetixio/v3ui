import { useQuery } from '@tanstack/react-query';
import { useNetwork } from './useWallet';

const testnetURL = 'https://api.synthetix.io/v3/snax-testnet/votes';

export function useGetHistoricalVotes() {
  const { network } = useNetwork();
  return useQuery({
    queryKey: ['historical-votes', network?.id],
    queryFn: async () => {
      const res = await fetch(network?.id === 2192 ? testnetURL : testnetURL);
      const votes = await res.json();
      return votes;
    },
    staleTime: 900000,
  });
}

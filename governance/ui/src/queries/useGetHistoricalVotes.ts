import { useQuery } from '@tanstack/react-query';
import { useNetwork } from './useWallet';
import councils, { CouncilSlugs } from '../utils/councils';

const testnetURL = 'https://api.synthetix.io/v3/snax-testnet/votes';
const mainnetURL = 'https://api.synthetix.io/v3/snax/votes';

export interface Vote {
  eventName: string;
  chainId: number;
  epochId: number;
  voter: string;
  blockTimestamp: number;
  id: string;
  transactionHash: string;
  votingPower: string;
  blockNumber: number;
  candidates: string[];
  contract: string;
}

export function useGetHistoricalVotes() {
  const { network } = useNetwork();
  return useQuery({
    queryKey: ['historical-votes', network?.id],
    queryFn: async () => {
      const res = await fetch(network?.id !== 2192 ? mainnetURL : testnetURL);
      let votesRaw: Record<CouncilSlugs, Vote[]> = await res.json();
      if (!('spartan' in votesRaw)) {
        votesRaw = { spartan: votesRaw[0], ambassador: [], treasury: [] };
      }
      return councils.reduce(
        (cur, next) => {
          cur[next.slug] = votesRaw[next.slug].sort((a, b) => {
            if (a.epochId === b.epochId) {
              return a.blockTimestamp - b.blockTimestamp;
            }
            return a.epochId - b.epochId;
          });
          return cur;
        },
        {} as Record<CouncilSlugs, Vote[]>
      );
    },
    staleTime: 900000,
  });
}

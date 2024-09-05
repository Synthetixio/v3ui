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
      const res = await fetch(network?.id === 2192 ? mainnetURL : testnetURL);
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

const fakeData = [
  {
    eventName: 'VoteRecorded',
    chainId: 13001,
    epochId: 0,
    voter: '0x48914229deDd5A9922f44441ffCCfC2Cb7856Ee9',
    blockTimestamp: 1724766356000,
    id: '0000595468-a8656-000000',
    transactionHash: '0x3a995d6f45cd0f00c1a24aa4f9e4c816d39056c9dcb2ab61f9a864d6880b058b',
    votingPower: '10',
    blockNumber: 595468,
    candidates: ['0xc3Cf311e04c1f8C74eCF6a795Ae760dc6312F345'],
    contract: '0xbc85f11300a8ef619592fd678418ec4ef26fbdfd',
  },
  {
    eventName: 'VoteRecorded',
    chainId: 13001,
    epochId: 0,
    voter: '0x47872B16557875850a02C94B28d959515F894913',
    blockTimestamp: 1724766356000,
    id: '0000595468-a8656-000000',
    transactionHash: '0x3a995d6f45cd0f00c1a24aa4f9e4c816d39056c9dcb2ab61f9a864d6880b058b',
    votingPower: '10',
    blockNumber: 595469,
    candidates: ['0xc3Cf311e04c1f8C74eCF6a795Ae760dc6312F345'],
    contract: '0xbc85f11300a8ef619592fd678418ec4ef26fbdfd',
  },
  {
    eventName: 'VoteRecorded',
    chainId: 13001,
    epochId: 0,
    voter: '0x48914229deDd5A9922f44441ffCCfC2Cb7856Ee9',
    blockTimestamp: 1724766356000,
    id: '0000595468-a8656-000000',
    transactionHash: '0x3a995d6f45cd0f00c1a24aa4f9e4c816d39056c9dcb2ab61f9a864d6880b058b',
    votingPower: '10',
    blockNumber: 5954610,
    candidates: ['0x2bFCD2e93e7791d90D547C19bf6B193EcdD096A8'],
    contract: '0xbc85f11300a8ef619592fd678418ec4ef26fbdfd',
  },
  {
    eventName: 'VoteWithdrawn',
    chainId: 13001,
    epochId: 0,
    voter: '0x47872B16557875850a02C94B28d959515F894913',
    blockTimestamp: 1724766356000,
    id: '0000595468-a8656-000000',
    transactionHash: '0x3a995d6f45cd0f00c1a24aa4f9e4c816d39056c9dcb2ab61f9a864d6880b058b',
    votingPower: '10',
    blockNumber: 595469,
    candidates: ['0xc3Cf311e04c1f8C74eCF6a795Ae760dc6312F345'],
    contract: '0xbc85f11300a8ef619592fd678418ec4ef26fbdfd',
  },
];

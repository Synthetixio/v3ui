import { useQuery } from '@tanstack/react-query';
import councils, { CouncilSlugs } from '../utils/councils';
import { BigNumber } from 'ethers';

// const testnetURL = 'https://api.synthetix.io/v3/snax-testnet/votes';
const mainnetURL = 'https://api.synthetix.io/v3/snax/votes';

interface VoteRaw {
  eventName: string;
  chainId: number;
  epochId: number;
  voter: string;
  blockTimestamp: number;
  id: string;
  transactionHash: string;
  votingPower?: string;
  blockNumber: number;
  candidates?: string[];
  contract: string;
}

interface VoteParsed {
  eventName: string;
  chainId: number;
  epochId: number;
  voter: string;
  blockTimestamp: number;
  id: string;
  transactionHash: string;
  votingPower: BigNumber;
  blockNumber: number;
  candidates?: string[];
  contract: string;
}

export interface Candidate {
  votesReceived: number;
  votePower: BigNumber;
  candidate: string;
}

export interface VotesResult {
  spartan: Record<string, Candidate>;
  ambassador: Record<string, Candidate>;
  treasury: Record<string, Candidate>;
  totalVotingPowerSpartan: BigNumber;
  totalVotingPowerAmbassador: BigNumber;
  totalVotingPowerTreasury: BigNumber;
}

export function useGetHistoricalVotes() {
  return useQuery({
    queryKey: ['historical-votes'],
    queryFn: async () => {
      const res = await fetch(mainnetURL);
      const votesRaw: Record<CouncilSlugs, VoteRaw[]> = await res.json();
      const sortedEvents = councils.reduce(
        (cur, next) => {
          cur[next.slug] = votesRaw[next.slug].sort((a, b) => {
            if (a.epochId === b.epochId) {
              return a.blockTimestamp - b.blockTimestamp;
            }
            return a.epochId - b.epochId;
          });
          return cur;
        },
        {} as Record<CouncilSlugs, VoteRaw[]>
      );
      const spartan = parseVotes(sortedEvents.spartan);
      const ambassador = parseVotes(sortedEvents.ambassador);
      const treasury = parseVotes(sortedEvents.treasury);

      return {
        spartan,
        ambassador,
        treasury,
        totalVotingPowerSpartan: Object.keys(spartan).reduce(
          (cur, candidate) => cur.add(spartan[candidate].votePower),
          BigNumber.from(0)
        ),
        totalVotingPowerAmbassador: Object.keys(ambassador).reduce(
          (cur, candidate) => cur.add(ambassador[candidate].votePower),
          BigNumber.from(0)
        ),
        totalVotingPowerTreasury: Object.keys(treasury).reduce(
          (cur, candidate) => cur.add(treasury[candidate].votePower),
          BigNumber.from(0)
        ),
        totalVotesSpartan: Object.keys(spartan).reduce(
          (cur, candidate) => cur.add(spartan[candidate].votesReceived),
          BigNumber.from(0)
        ),
        totalVotesAmbassador: Object.keys(ambassador).reduce(
          (cur, candidate) => cur.add(ambassador[candidate].votesReceived),
          BigNumber.from(0)
        ),
        totalVotesTreasury: Object.keys(treasury).reduce(
          (cur, candidate) => cur.add(treasury[candidate].votesReceived),
          BigNumber.from(0)
        ),
      };
    },
    staleTime: 900000,
  });
}

const parseVotes = (votes: VoteRaw[]) => {
  return votes
    .reduce((cur, next) => {
      if (next.eventName === 'VoteWithdrawn') {
        const previousVoteIndex = cur.findIndex((vote) => {
          return vote.contract === next.contract && vote.voter === next.voter;
        });
        if (previousVoteIndex !== -1) {
          cur.splice(previousVoteIndex, 1);
        } else {
          console.error('Could not find previous vote', cur[next.epochId], next);
        }
      } else {
        const previousVoteIndex = cur.findIndex(
          (vote) => vote.contract === next.contract && vote.voter === next.voter
        );
        if (previousVoteIndex !== -1) {
          cur.splice(previousVoteIndex, 1);
        }
        cur.push({ ...next, votingPower: BigNumber.from(next.votingPower) });
      }

      return cur;
    }, [] as VoteParsed[])
    .reduce(
      (cur, next) => {
        const candidate = next.candidates ? next.candidates[0].toLowerCase() : '';
        if (cur[candidate]) {
          cur[candidate] = {
            ...cur,
            votePower: cur[candidate].votePower.add(next.votingPower),
            votesReceived: cur[candidate].votesReceived + 1,
            candidate,
          };
        } else {
          cur[candidate] = { candidate, votePower: next.votingPower, votesReceived: 1 };
        }

        return cur;
      },
      {} as Record<string, Candidate>
    );
};

import { BigNumber, utils } from 'ethers';
import { Candidate, GetUserDetails } from '../queries';
import { CouncilSlugs } from './councils';

interface Votes {
  spartan: Record<string, Candidate>;
  ambassador: Record<string, Candidate>;
  treasury: Record<string, Candidate>;
  totalVotingPowerSpartan: BigNumber;
  totalVotingPowerAmbassador: BigNumber;
  totalVotingPowerTreasury: BigNumber;
}

export const sortUsers = (
  activeCouncil: CouncilSlugs,
  search: string,
  sortConfig: [boolean, string],
  councilNomineesDetails?: GetUserDetails[],
  votes?: Votes
) => {
  if (councilNomineesDetails?.length && votes) {
    const candidatesByVotePowerRanking = votes
      ? Object.keys(votes[activeCouncil]).sort((a, b) => {
          return votes[activeCouncil][b].votePower.sub(votes[activeCouncil][a].votePower).gt(0)
            ? 1
            : -1;
        })
      : [];
    return councilNomineesDetails
      .map((nominee) => {
        if (votes[activeCouncil][nominee.address.toLowerCase()]) {
          return {
            ...nominee,
            voteResult: votes[activeCouncil][nominee.address.toLowerCase()],
            place:
              candidatesByVotePowerRanking.findIndex(
                (candidate) => candidate.toLowerCase() === nominee.address.toLowerCase()
              ) + 1,
          };
        }
        return nominee;
      })
      .filter((nominee) => {
        if (utils.isAddress(search)) {
          return nominee.address.toLowerCase().includes(search);
        }
        if (search) {
          if (nominee.username) {
            return nominee.username.toLowerCase().includes(search);
          } else {
            return nominee.address.toLowerCase().includes(search);
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortConfig[1] === 'name') {
          if (a.username && b.username) {
            return sortConfig[0]
              ? a.username.localeCompare(b.username)
              : a.username.localeCompare(b.username) * -1;
          }
          if (a.username && !b.username) {
            return -1;
          } else if (b.username && !a.username) {
            return 1;
          }
          return sortConfig[0]
            ? a.address.localeCompare(b.address)
            : a.address.localeCompare(b.address) * -1;
        }
        if (sortConfig[1] === 'votingPower') {
          if (sortConfig[0]) {
            if (!b.voteResult?.votePower) return -1;
            return b.voteResult?.votePower.sub(a.voteResult?.votePower || BigNumber.from(0)).gt(0)
              ? 1
              : -1;
          } else {
            if (!b.voteResult?.votePower) return 1;
            return b.voteResult?.votePower
              .sub(a.voteResult?.votePower || BigNumber.from(0))
              .mul(-1)
              .toString();
          }
        }
        if (sortConfig[1] === 'votes') {
          if (sortConfig[0]) {
            return (b.voteResult?.votesReceived || 0) - (a.voteResult?.votesReceived || 0);
          } else {
            return ((b.voteResult?.votesReceived || 0) - (a.voteResult?.votesReceived || 0)) * -1;
          }
        }
        if (sortConfig[1] === 'ranking') {
          if (!b.voteResult?.votePower) return -1;
          return b.voteResult?.votePower.sub(a.voteResult?.votePower || BigNumber.from(0)).gt(0)
            ? 1
            : -1;
        }
        return 0;
      });
  }
  return [];
};

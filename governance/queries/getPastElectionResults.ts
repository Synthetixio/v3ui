import { useQuery } from '@tanstack/react-query';
import { graphQuery } from '../utils/graph';

export function getPastElectionResults(contractAddress: string, epoch: string) {
  return useQuery(
    ['pastElection', contractAddress, epoch],
    async () => {
      const query = `voteResults(
            where: { contract: "${contractAddress}", epochIndex: "${epoch}" }) {
            id
            ballotId
            epochIndex
            votePower
            contract
            voteCount
    }`;

      const fetchData = await graphQuery(query);
      return fetchData;
    },
    { enabled: !!contractAddress && !!epoch }
  );
}

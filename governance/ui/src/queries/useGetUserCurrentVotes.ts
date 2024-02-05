import { useMemo } from 'react';
import { useGetUserBallot } from './';

export const useGetUserCurrentVotes = () => {
  const { data: ballots, isLoading } = useGetUserBallot([
    'spartan',
    'ambassador',
    'grants',
    'treasury',
  ]);

  const votes = useMemo(
    () => ({
      spartan: ballots ? ballots[0].votedCandidates[0] : '',
      grants: ballots ? ballots[1].votedCandidates[0] : '',
      ambassador: ballots ? ballots[2].votedCandidates[0] : '',
      treasury: ballots ? ballots[3].votedCandidates[0] : '',
    }),
    [ballots]
  );

  return {
    data: votes,
    isLoading,
  };
};

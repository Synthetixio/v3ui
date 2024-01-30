import { useMemo } from 'react';
import { useVoteContext } from '../context/VoteContext';

export const useGetUserSelectedVotes = () => {
  const { state } = useVoteContext();

  return useMemo(
    () => ({
      spartan: state.spartan,
      grants: state.grants,
      ambassador: state.ambassador,
      treasury: state.treasury,
    }),
    [state.ambassador, state.grants, state.spartan, state.treasury]
  );
};

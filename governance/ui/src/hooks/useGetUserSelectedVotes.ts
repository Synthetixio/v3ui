import { useMemo } from 'react';
import { useVoteContext } from '../context/VoteContext';

export const useGetUserSelectedVotes = () => {
  const { state } = useVoteContext();

  const localstorageState = localStorage.getItem('voteSelection');

  return useMemo(() => {
    const parsedLocalstorageState = localstorageState ? JSON.parse(localstorageState) : {};
    return {
      spartan: parsedLocalstorageState['spartan']
        ? parsedLocalstorageState['spartan']
        : state.spartan,
      ambassador: parsedLocalstorageState['ambassador']
        ? parsedLocalstorageState['ambassador']
        : state.ambassador,
      treasury: parsedLocalstorageState['treasury']
        ? parsedLocalstorageState['treasury']
        : state.treasury,
    };
  }, [state.ambassador, state.spartan, state.treasury, localstorageState]);
};

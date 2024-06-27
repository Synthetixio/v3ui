import { useMemo } from 'react';
import { useVoteContext } from '../context/VoteContext';
import { useGetCouncilNominees } from '../queries';
import { CouncilSlugs } from '../utils/councils';

export const useGetUserSelectedVotes = () => {
  const { state } = useVoteContext();
  const { data: spartanNominees } = useGetCouncilNominees('spartan');
  const { data: ambassadorNominees } = useGetCouncilNominees('ambassador');
  const { data: treasuryNominees } = useGetCouncilNominees('treasury');

  const localstorageState = localStorage.getItem('voteSelection');

  return useMemo(() => {
    const parsedLocalstorageState = localstorageState ? JSON.parse(localstorageState) : {};
    const allNominees = spartanNominees
      ?.concat(ambassadorNominees || [])
      .concat(treasuryNominees || []);

    const whichState = (council: CouncilSlugs) => {
      if (
        parsedLocalstorageState[council] &&
        allNominees?.includes(parsedLocalstorageState[council])
      )
        return parsedLocalstorageState[council];
      return state[council];
    };

    return {
      spartan: whichState('spartan'),
      ambassador: whichState('ambassador'),
      treasury: whichState('treasury'),
    };
  }, [localstorageState, spartanNominees, ambassadorNominees, treasuryNominees, state]);
};

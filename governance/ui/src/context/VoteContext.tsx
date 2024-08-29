import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { useGetCurrentPeriod, useGetUserBallot, useNetwork } from '../queries';
import { localStorageKey, removeCandidate, setCandidate } from '../utils/localstorage';

export interface VoteStateForNetwork {
  spartan: string | undefined;
  ambassador: string | undefined;
  treasury: string | undefined;
}

export interface VoteState {
  [key: string]: {
    [key: string]: VoteStateForNetwork;
  };
}

type Action = {
  type: string;
  payload: { action: string | undefined; network: string | undefined; epochId: string | undefined };
};

const initialState = (chainId?: string, epochId?: string) => {
  if (!epochId || !chainId) return {};

  const parsedState = JSON.parse(localStorage.getItem(localStorageKey) || '{}');

  return {
    [epochId]: {
      [chainId]: {
        spartan: parsedState[epochId]?.[chainId]?.spartan || undefined,
        ambassador: parsedState[epochId]?.[chainId]?.ambassador || undefined,
        treasury: parsedState[epochId]?.[chainId]?.treasury || undefined,
      },
    },
  } as VoteState;
};

const VoteContext = createContext<
  | {
      state: VoteState;
      dispatch: React.Dispatch<Action>;
    }
  | undefined
>(undefined);

const voteReducer = (state: VoteState, action: Action): VoteState => {
  switch (action.type) {
    case 'SPARTAN': {
      if (action.payload.action) {
        setCandidate(
          action.payload.action,
          'spartan',
          action.payload.network,
          action.payload.epochId
        );
      } else {
        removeCandidate('spartan', action.payload.network, action.payload.epochId);
      }
      return {
        ...state,
        [action.payload.epochId!]: {
          ...(state[action.payload.epochId!] || {}),
          [action.payload.network!]: {
            ...(state[action.payload.epochId!]?.[action.payload.network!] || {}),
            spartan: action.payload.action,
          },
        },
      };
    }
    case 'AMBASSADOR': {
      if (action.payload.action) {
        setCandidate(
          action.payload.action,
          'ambassador',
          action.payload.network,
          action.payload.epochId
        );
      } else {
        removeCandidate('ambassador', action.payload.network, action.payload.epochId);
      }
      return {
        ...state,
        [action.payload.epochId!]: {
          ...(state[action.payload.epochId!] || {}),
          [action.payload.network!]: {
            ...(state[action.payload.epochId!]?.[action.payload.network!] || {}),
            ambassador: action.payload.action,
          },
        },
      };
    }
    case 'TREASURY': {
      if (action.payload.action) {
        setCandidate(
          action.payload.action,
          'treasury',
          action.payload.network,
          action.payload.epochId
        );
      } else {
        removeCandidate('treasury', action.payload.network, action.payload.epochId);
      }
      return {
        ...state,
        [action.payload.epochId!]: {
          ...(state[action.payload.epochId!] || {}),
          [action.payload.network!]: {
            ...(state[action.payload.epochId!]?.[action.payload.network!] || {}),
            treasury: action.payload.action,
          },
        },
      };
    }
    default:
      return state;
  }
};

const VoteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { network } = useNetwork();
  const { data: epochId } = useGetCurrentPeriod('spartan');
  const [init, setInit] = useState(false);
  const [state, dispatch] = useReducer(
    voteReducer,
    initialState(network?.id.toString(), epochId?.toString())
  );

  const { data: spartanBallot, isFetched: isSpartanBallotFetched } = useGetUserBallot('spartan');
  const { data: ambassadorBallot, isFetched: isAmbassadorBallotFetched } =
    useGetUserBallot('ambassador');
  const { data: treasuryBallot, isFetched: isTreasuryBallotFetched } = useGetUserBallot('treasury');

  useEffect(() => {
    if (
      epochId &&
      network &&
      !init &&
      isSpartanBallotFetched &&
      isAmbassadorBallotFetched &&
      isTreasuryBallotFetched &&
      spartanBallot &&
      ambassadorBallot &&
      treasuryBallot
    ) {
      [spartanBallot, ambassadorBallot, treasuryBallot].forEach((ballot) => {
        dispatch({
          payload: {
            action: ballot?.votedCandidates[0],
            network: network.id.toString(),
            epochId,
          },
          type: ballot.council.toUpperCase(),
        });
      });

      const initState = initialState(network.id.toString(), epochId);
      const voteStateForNetwork = initState[epochId][network.id.toString()];

      Object.keys(initState[epochId][network.id.toString()]).forEach((key) => {
        const candidate = voteStateForNetwork[key as keyof VoteStateForNetwork];
        if (candidate) {
          dispatch({
            payload: {
              action: candidate,
              network: network.id.toString(),
              epochId,
            },
            type: key.toUpperCase(),
          });
        }
      });
      setInit(true);
    }
  }, [
    network,
    epochId,
    init,
    isSpartanBallotFetched,
    isAmbassadorBallotFetched,
    isTreasuryBallotFetched,
    spartanBallot,
    ambassadorBallot,
    treasuryBallot,
  ]);
  return <VoteContext.Provider value={{ state, dispatch }}>{children}</VoteContext.Provider>;
};

const useVoteContext = () => {
  const context = useContext(VoteContext);
  if (!context) {
    throw new Error('useVoteContext must be used within an VoteProvider');
  }
  return context;
};

export { useVoteContext, VoteProvider };

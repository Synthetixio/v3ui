import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { useNetwork } from '../queries';
import { removeCandidate, setCandidate } from '../utils/localstorage';

export interface VoteStateForNetwork {
  spartan: string | undefined;
  ambassador: string | undefined;
  treasury: string | undefined;
}

export interface VoteState {
  [key: string]: VoteStateForNetwork;
}

type Action = {
  type: string;
  payload: { action: string | undefined; network: string | undefined };
};

const parsedState = JSON.parse(localStorage.getItem('voteSelection') || '{}');

const initialState = (chainId?: string) => {
  const customChainId = chainId || Object.keys(parsedState)[0] || '2192';
  return {
    [customChainId]: {
      spartan: parsedState[customChainId]?.spartan || undefined,
      ambassador: parsedState[customChainId]?.ambassador || undefined,
      treasury: parsedState[customChainId]?.treasury || undefined,
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
      if (action.payload.action && action.payload.action !== 'remove') {
        setCandidate(action.payload.action, 'spartan', action.payload.network);
      } else {
        removeCandidate('spartan', action.payload.network);
      }
      return {
        ...state,
        [action.payload.network!]: {
          ...state[action.payload.network!],
          spartan: action.payload.action,
        },
      };
    }
    case 'AMBASSADOR': {
      if (action.payload.action && action.payload.action !== 'remove') {
        setCandidate(action.payload.action, 'ambassador', action.payload.network);
      } else {
        removeCandidate('ambassador', action.payload.network);
      }
      return {
        ...state,
        [action.payload.network!]: {
          ...state[action.payload.network!],
          ambassador: action.payload.action,
        },
      };
    }
    case 'TREASURY': {
      if (action.payload.action && action.payload.action !== 'remove') {
        setCandidate(action.payload.action, 'treasury', action.payload.network);
      } else {
        removeCandidate('treasury', action.payload.network);
      }
      return {
        ...state,
        [action.payload.network!]: {
          ...state[action.payload.network!],
          treasury: action.payload.action,
        },
      };
    }
    default:
      return state;
  }
};

const VoteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { network } = useNetwork();
  const [init, setInit] = useState(false);
  const [state, dispatch] = useReducer(voteReducer, initialState(network?.id.toString()));
  useEffect(() => {
    if (network && !init) {
      const initState = initialState(network.id.toString());
      Object.keys(initState[network.id]).forEach((key) => {
        dispatch({
          payload: {
            action: initState[network.id][key as keyof VoteStateForNetwork],
            network: network.id.toString(),
          },
          type: key.toUpperCase(),
        });
      });
      setInit(true);
    }
  }, [network, init]);
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

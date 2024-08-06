import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { removeCandidate, setCandidate } from '../utils/localstorage';

export interface VoteState {
  spartan: string | undefined;
  ambassador: string | undefined;
  treasury: string | undefined;
}

type Action = { type: string; payload: string | undefined };

const parsedState = JSON.parse(localStorage.getItem('voteSelection') || '{}');

const initialState: VoteState = {
  spartan: parsedState?.spartan || undefined,
  ambassador: parsedState?.ambassador || undefined,
  treasury: parsedState?.treasury || undefined,
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
      if (action.payload) {
        setCandidate(action.payload, 'spartan');
      } else {
        removeCandidate('spartan');
      }
      return {
        ...state,
        spartan: action.payload,
      };
    }
    case 'AMBASSADOR': {
      if (action.payload) {
        setCandidate(action.payload, 'ambassador');
      } else {
        removeCandidate('ambassador');
      }
      return {
        ...state,
        ambassador: action.payload,
      };
    }
    case 'TREASURY': {
      if (action.payload) {
        setCandidate(action.payload, 'treasury');
      } else {
        removeCandidate('treasury');
      }
      return {
        ...state,
        treasury: action.payload,
      };
    }
    default:
      return state;
  }
};

const VoteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(voteReducer, initialState);
  return <VoteContext.Provider value={{ state, dispatch }}>{children}</VoteContext.Provider>;
};

const useVoteContext = () => {
  const context = useContext(VoteContext);
  if (!context) {
    throw new Error('useVoteContext must be used within an VoteProvider');
  }
  return context;
};

export { VoteProvider, useVoteContext };

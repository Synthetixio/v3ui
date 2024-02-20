import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface VoteState {
  spartan: string | undefined;
  grants: string | undefined;
  ambassador: string | undefined;
  treasury: string | undefined;
}

type Action = { type: string; payload: string | undefined };

const initialState: VoteState = {
  spartan: undefined,
  grants: undefined,
  ambassador: undefined,
  treasury: undefined,
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
    case 'SPARTAN':
      return {
        ...state,
        spartan: action.payload,
      };
    case 'GRANTS':
      return {
        ...state,
        grants: action.payload,
      };
    case 'AMBASSADOR':
      return {
        ...state,
        ambassador: action.payload,
      };
    case 'TREASURY':
      return {
        ...state,
        treasury: action.payload,
      };
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

import Wei, { wei } from '@synthetixio/wei';
import { FC, createContext, PropsWithChildren, Dispatch, useReducer } from 'react';

export interface DebtChange {
  type: 'burnMax' | 'mintMax' | 'custom';
  amount: Wei;
}

export interface CollateralChange {
  type: 'depositMax' | 'withdrawMax' | 'custom';
  amount: Wei;
}

interface State {
  debtChange: DebtChange;
  collateralChange: CollateralChange;
}

export interface Action {
  type: 'setDebtChange' | 'setCollateralChange' | 'setBurnMax' | 'mintMax' | 'reset';
  payload?: Wei;
}

const initialState: State = {
  debtChange: {
    type: 'custom',
    amount: wei(0),
  },
  collateralChange: {
    type: 'custom',
    amount: wei(0),
  },
};

export const ManagePositionContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: () => {},
});

const reducerFn = (state: State, action: Action): State => {
  switch (action.type) {
    // Debt management
    case 'setDebtChange':
      return {
        ...state,
        debtChange:
          {
            type: 'custom',
            amount: action?.payload || wei(0),
          } || wei(0),
      };

    case 'setBurnMax':
      return {
        ...state,
        debtChange: {
          type: 'burnMax',
          amount: action?.payload || wei(0),
        },
      };

    case 'mintMax':
      return {
        ...state,
        debtChange: {
          type: 'burnMax',
          amount: action?.payload || wei(0),
        },
      };

    case 'setCollateralChange':
      return {
        ...state,
        collateralChange: {
          type: 'custom',
          amount: action?.payload || wei(0),
        },
      };

    // Global reset
    case 'reset':
      return {
        ...state,
        debtChange: {
          type: 'custom',
          amount: wei(0),
        },
        collateralChange: {
          type: 'custom',
          amount: wei(0),
        },
      };

    default:
      return state;
  }
};

export const ManagePositionProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducerFn, initialState);

  return (
    <ManagePositionContext.Provider value={{ state, dispatch }}>
      {children}
    </ManagePositionContext.Provider>
  );
};

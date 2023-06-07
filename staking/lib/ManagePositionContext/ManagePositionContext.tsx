import Wei, { wei } from '@synthetixio/wei';
import { FC, createContext, PropsWithChildren, Dispatch, useReducer } from 'react';

interface State {
  debtChange: Wei;
  collateralChange: Wei;
}

export interface Action {
  type: 'setDebtChange' | 'setCollateralChange' | 'setBurnMax' | 'reset';
  payload?: Wei;
}

const initialState: State = {
  debtChange: wei(0),
  collateralChange: wei(0),
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
    case 'setDebtChange':
      return { ...state, debtChange: action?.payload || wei(0) };
    case 'setCollateralChange':
      return { ...state, collateralChange: action?.payload || wei(0) };
    case 'reset':
      return {
        ...state,
        debtChange: wei(0),
        collateralChange: wei(0),
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

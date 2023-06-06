import Wei, { wei } from '@synthetixio/wei';
import { FC, createContext, PropsWithChildren, Dispatch, useReducer } from 'react';

export const ManagePositionContext = createContext<{
  collateralChange: Wei;
  debtChange: Wei;
  dispatch: Dispatch<Action>;
}>({
  collateralChange: wei(0),
  debtChange: wei(0),
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: () => {},
});

interface State {
  debtChange: Wei;
  collateralChange: Wei;
}

export interface Action {
  type: 'setDebtChange' | 'setCollateralChange' | 'reset';
  payload?: Wei;
}

const reducerFn = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setDebtChange':
      return { ...state, debtChange: action?.payload || wei(0) };
    case 'setCollateralChange':
      return { ...state, collateralChange: action?.payload || wei(0) };
    case 'reset':
      return { ...state, debtChange: wei(0), collateralChange: wei(0) };
    default:
      return state;
  }
};

export const ManagePositionProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducerFn, { debtChange: wei(0), collateralChange: wei(0) });

  const { debtChange, collateralChange } = state;

  return (
    <ManagePositionContext.Provider value={{ debtChange, collateralChange, dispatch }}>
      {children}
    </ManagePositionContext.Provider>
  );
};

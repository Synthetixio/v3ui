import Wei, { wei } from '@synthetixio/wei';
import React, { createContext, useState, PropsWithChildren, Dispatch, SetStateAction } from 'react';

export const ManagePositionContext = createContext<{
  collateralChange: Wei;
  debtChange: Wei;
  withdrawAmount: Wei;
  setDebtChange: Dispatch<SetStateAction<Wei>>;
  setCollateralChange: Dispatch<SetStateAction<Wei>>;
  setWithdrawAmount: Dispatch<SetStateAction<Wei>>;
}>({
  collateralChange: wei(0),
  debtChange: wei(0),
  withdrawAmount: wei(0),
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setDebtChange: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCollateralChange: () => {},
  setWithdrawAmount: () => {},
});

export const ManagePositionProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [debtChange, setDebtChange] = useState(wei(0));
  const [collateralChange, setCollateralChange] = useState(wei(0));
  const [withdrawAmount, setWithdrawAmount] = useState(wei(0));

  return (
    <ManagePositionContext.Provider
      value={{
        debtChange,
        setDebtChange,
        collateralChange,
        setCollateralChange,
        withdrawAmount,
        setWithdrawAmount,
      }}
    >
      {children}
    </ManagePositionContext.Provider>
  );
};

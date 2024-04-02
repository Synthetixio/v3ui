import { useParams } from '@snx-v3/useParams';
import { useLiquidityPositions } from '@snx-v3/useLiquidityPositions';
import { usePool } from '@snx-v3/usePools';
import { PositionOverview } from '../../components/PositionOverview';
import { useState } from 'react';
import Wei from '@synthetixio/wei';
import { useCollateralPrices } from '@snx-v3/useCollateralPrices';
import { useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { LiquidityPositionInput } from '../../components/LiquidityPositionInput';
import { useAccountCollateral } from '@snx-v3/useAccountCollateral';
import { useTokenBalances } from '@snx-v3/useTokenBalance';
import { useAccounts, useCreateAccount } from '@snx-v3/useAccounts';
import { useRecoilState } from 'recoil';
import { amountState } from '../../state/amount';
import { constants, utils } from 'ethers';
import { useApprove } from '@snx-v3/useApprove';
import { PositionHeader } from '../../components/PositionHeader';
import { useDeposit } from '@snx-v3/useDeposit';
import { TransactionSteps } from './DepositBaseAndromeda';
import { useEthBalance } from '@snx-v3/useEthBalance';

export function Deposit() {
  const [currentStep, setCurrentStep] = useState<TransactionSteps>('openPosition');
  const { poolId, accountId, collateralSymbol, collateralAddress } = useParams();
  const [amountToDeposit, setAmountToDeposit] = useRecoilState(amountState);

  const { data: pool, isLoading: isPoolLoading } = usePool(poolId);
  const { data: userAccounts, isLoading: userAccountsIsLoading } = useAccounts();
  const { data: liquidityPosition, isLoading: liquidityPositionsIsLoading } = useLiquidityPositions(
    { accountId }
  );
  const { data: accountCollaterals, isLoading: accountCollateralIsLoading } = useAccountCollateral({
    accountId,
  });
  const userTokenAddresses = accountCollaterals
    ?.filter((collateral) => collateral.symbol === collateralSymbol)
    .map((collateral) => collateral.tokenAddress) || [''];
  const { data: userTokenBalances, isLoading: tokenBalancesIsLoading } =
    useTokenBalances(userTokenAddresses);
  const { data: ethBalance, isLoading: ethBalanceIsLoading } = useEthBalance();
  const { data: collateralTypes, isLoading: collateralTypesIsLoading } = useCollateralTypes();
  const { data: collateralPrices, isLoading: collateralPricesIsLoading } = useCollateralPrices();
  const collateralType = collateralTypes?.find(
    (collateral) => collateral.symbol === collateralSymbol
  );

  const zeroWei = new Wei(0);
  const position = liquidityPosition && liquidityPosition[`${poolId}-${collateralSymbol}`];
  const priceForCollateral =
    !!collateralPrices && !!collateralType
      ? collateralPrices[collateralType.tokenAddress]!
      : zeroWei;
  const maxUInt = new Wei(constants.MaxUint256);
  const debt = position ? position.debt : zeroWei;
  const debt$ = debt.mul(priceForCollateral);
  const userTokeBalance =
    userTokenBalances && ethBalance
      ? userTokenBalances
          .concat(collateralSymbol === 'WETH' ? ethBalance : zeroWei)
          .reduce((cur, next) => {
            if (next.p === 6) {
              return cur.add(next.toBN());
            }
            return cur.add(next);
          }, new Wei(0))
      : zeroWei;
  const balance$ = accountCollaterals
    ? {
        deposited:
          accountCollaterals.find((collateral) => collateral.symbol === collateralSymbol)
            ?.availableCollateral || zeroWei,
        wallet: userTokeBalance,
      }
    : { deposited: userTokeBalance, wallet: zeroWei };
  const {
    mutation: { mutateAsync: createAccount, isPending: createAccountIsLoading },
    getTransactionCost: { data: accountTransactionCost },
  } = useCreateAccount();

  const {
    approve,
    requireApproval,
    isLoading: approveIsLoading,
  } = useApprove({
    contractAddress: collateralAddress,
    amount: amountToDeposit.toBN(),
    spender: collateralAddress,
  });
  const { exec: deposit, isLoading: depositIsLoading } = useDeposit({
    accountId,
    newAccountId: '1337',
    poolId,
    collateralTypeAddress: collateralAddress,
    collateralChange: amountToDeposit,
    currentCollateral: position ? position.debt : zeroWei,
    availableCollateral: balance$.deposited,
  });

  const handleCreateAccount = async () => {
    await createAccount();
    setCurrentStep('accountCreated');
  };

  const handleButtonClick = async (action: string) => {
    if (action === 'createPosition') {
      if (requireApproval) {
        await approve(false);
      }
      try {
        await deposit();
        setCurrentStep('positionCreated');
      } catch {
        setAmountToDeposit(zeroWei);
        setCurrentStep('openPosition');
      }
    }
  };

  const isLoading =
    isPoolLoading &&
    liquidityPositionsIsLoading &&
    collateralPricesIsLoading &&
    collateralTypesIsLoading &&
    accountCollateralIsLoading &&
    tokenBalancesIsLoading &&
    userAccountsIsLoading &&
    ethBalanceIsLoading;

  return (
    <PositionHeader
      title={
        !position
          ? 'Open ' + collateralSymbol + ' Liquidity Position'
          : collateralSymbol + ' Liquidity Position'
      }
      isLoading={isLoading}
      collateralSymbol={collateralSymbol}
      poolName={pool?.name}
      LiquidityPositionInput={
        <LiquidityPositionInput
          collateralSymbol={collateralSymbol || ''}
          balance={balance$}
          price={priceForCollateral}
          userHasAccount={!!userAccounts?.length}
          currentCRatio="Infinite"
          currentCollateral={position?.collateralAmount}
          signTransaction={handleButtonClick}
          depositIsLoading={depositIsLoading}
          approveIsLoading={approveIsLoading}
          requireApprove={requireApproval}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          createAccount={handleCreateAccount}
          createAccountIsLoading={createAccountIsLoading}
          createAccountTransactionCost={accountTransactionCost}
        />
      }
      PositionOverview={
        <PositionOverview
          collateralType={collateralSymbol || '?'}
          debt={debt$}
          collateralValue={
            position
              ? position.collateralValue.mul(priceForCollateral).toNumber().toFixed(2)
              : '0.00'
          }
          poolPnl="$00.00"
          currentCollateral={position ? position.collateralAmount : zeroWei}
          cRatio={maxUInt.toNumber()}
          liquidationCratioPercentage={collateralType?.liquidationRatioD18.toNumber()}
          targetCratioPercentage={collateralType?.issuanceRatioD18.toNumber()}
          isLoading={isLoading}
          priceOfToDeposit={priceForCollateral}
        />
      }
    />
  );
}

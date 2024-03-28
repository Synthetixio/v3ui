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
import { useDepositBaseAndromeda } from '@snx-v3/useDepositBaseAndromeda';
import { useSpotMarketProxy } from '@snx-v3/useSpotMarketProxy';
import { useApprove } from '@snx-v3/useApprove';
import { getUSDCAddress } from '@snx-v3/isBaseAndromeda';
import { useNetwork } from '@snx-v3/useBlockchain';
import { PositionHeader } from '../../components/PositionHeader';

export type TransactionSteps =
  | 'openPosition'
  | 'createAccount'
  | 'signTransactions'
  | 'accountCreated'
  | 'positionCreated'
  | null;

export function DepositBaseAndromeda() {
  const [currentStep, setCurrentStep] = useState<TransactionSteps>('openPosition');
  const { poolId, accountId, collateralSymbol, collateralAddress } = useParams();
  const [amountToDeposit, setAmountToDeposit] = useRecoilState(amountState);
  const { network } = useNetwork();

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
    .map((collateral) => collateral.tokenAddress)
    .concat(getUSDCAddress(network?.id)) || [''];

  const { data: userTokenBalances, isLoading: tokenBalancesIsLoading } =
    useTokenBalances(userTokenAddresses);

  const { data: SpotProxy } = useSpotMarketProxy();

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

  const userTokeBalance = userTokenBalances
    ? userTokenBalances.reduce((cur, next) => {
        if (next.p === 6) {
          return cur.add(new Wei(next.toString(), 18));
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
    amount: amountToDeposit.gt(0)
      ? //Base USDC is 6 decimals
        utils.parseUnits(amountToDeposit.toNumber().toFixed(2), 6)
      : 0,
    spender: SpotProxy?.address,
  });
  const { exec: depositBaseAndromeda, isLoading: depositBaseAndromedaIsLoading } =
    useDepositBaseAndromeda({
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

  const handleButtonClick = async (action: 'createPosition' | 'createAccount') => {
    if (action === 'createPosition') {
      if (requireApproval) {
        await approve(false);
      }
      try {
        await depositBaseAndromeda();
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
    userAccountsIsLoading;

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
          depositIsLoading={depositBaseAndromedaIsLoading}
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
          debt={debt$.toNumber().toFixed(2)}
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

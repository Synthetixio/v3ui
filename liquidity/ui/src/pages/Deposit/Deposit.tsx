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
import { useApprove } from '@snx-v3/useApprove';
import { PositionHeader } from '../../components/PositionHeader';
import { useDeposit } from '@snx-v3/useDeposit';
import { TransactionSteps } from './DepositBaseAndromeda';
import { useEthBalance } from '@snx-v3/useEthBalance';
import { useWrapEth } from '@snx-v3/useWrapEth';

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
  const debt = position ? position.debt : zeroWei;
  const debt$ = debt.mul(priceForCollateral);
  const userTokeBalanceCombined =
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
        wallet: userTokeBalanceCombined,
      }
    : { deposited: userTokeBalanceCombined, wallet: zeroWei };
  const {
    mutation: { mutateAsync: createAccount, isPending: createAccountIsLoading },
    getTransactionCost: { data: accountTransactionCost },
  } = useCreateAccount();

  const { exec: wrapEth, isLoading: wrapEthIsLoading, wethBalance } = useWrapEth();
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
    currentCollateral: position ? position.collateralAmount : zeroWei,
    availableCollateral: balance$.deposited,
  });

  const handleCreateAccount = async () => {
    await createAccount();
    setCurrentStep('accountCreated');
  };

  const handleButtonClick = async (action: string) => {
    try {
      if (action === 'createPosition') {
        if (requireWrapping) {
          await wrapEth(amountToDeposit);
        }
        if (requireApproval) {
          await approve(false);
        }

        await deposit();
        setCurrentStep('positionCreated');
      }
    } catch {
      setAmountToDeposit(zeroWei);
      setCurrentStep('openPosition');
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
    ethBalanceIsLoading &&
    wrapEthIsLoading;
  const requireWrapping = amountToDeposit.gt(wethBalance || zeroWei);
  const basicTransactions = [
    {
      done: !requireApproval,
      loading: approveIsLoading,
      subline: `You must approve your ${collateralSymbol} transfer before depositing.`,
      title: `Approve ${collateralSymbol} transfer`,
    },
    {
      done: false,
      loading: depositIsLoading,
      subline: `This step will transfer your ${collateralSymbol} to Synthetix as well as delegating to the selected Pool.`,
      title: `Delegate ${collateralSymbol} transfer`,
    },
  ];

  const transactions = requireWrapping
    ? [
        {
          done: false,
          loading: wrapEthIsLoading,
          title: 'Wrapping your ETH',
          subline:
            'This will wrap your ETH to WETH and will allow us to deposit it into the Synthetix v3 protocol',
        },
      ].concat(basicTransactions)
    : basicTransactions;
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
          currentCRatio={position?.cRatio.toString() || 'N/A'}
          currentCollateral={position?.collateralAmount}
          signTransaction={handleButtonClick}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          createAccount={handleCreateAccount}
          createAccountIsLoading={createAccountIsLoading}
          createAccountTransactionCost={accountTransactionCost}
          transactions={transactions}
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
          cRatio={position?.cRatio.toNumber()}
          liquidationCratioPercentage={collateralType?.liquidationRatioD18.toNumber()}
          targetCratioPercentage={collateralType?.issuanceRatioD18.toNumber()}
          isLoading={isLoading}
          priceOfToDeposit={priceForCollateral}
        />
      }
    />
  );
}

import { ArrowBackIcon } from '@chakra-ui/icons';
import { Button, Divider, Flex, Link, Skeleton, Text, useToast } from '@chakra-ui/react';
import { Amount } from '@snx-v3/Amount';
import { ContractError } from '@snx-v3/ContractError';
import { parseUnits } from '@snx-v3/format';
import { getRepayerContract, getSpotMarketId, isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { ManagePositionContext } from '@snx-v3/ManagePositionContext';
import { Multistep } from '@snx-v3/Multistep';
import { useApprove } from '@snx-v3/useApprove';
import { useNetwork } from '@snx-v3/useBlockchain';
import { useBorrow } from '@snx-v3/useBorrow';
import { CollateralType } from '@snx-v3/useCollateralTypes';
import { useContractErrorParser } from '@snx-v3/useContractErrorParser';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useGetWrapperToken } from '@snx-v3/useGetUSDTokens';
import { LiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { useRepay } from '@snx-v3/useRepay';
import { useSystemToken } from '@snx-v3/useSystemToken';
import { useTokenBalance } from '@snx-v3/useTokenBalance';
import { useUndelegate } from '@snx-v3/useUndelegate';
import { useUndelegateBaseAndromeda } from '@snx-v3/useUndelegateBaseAndromeda';
import { useQueryClient } from '@tanstack/react-query';
import { FC, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { ZEROWEI } from '@snx-v3/constants';
import { LiquidityPositionUpdated } from '../Manage/LiquidityPositionUpdated';

export const ClosePositionTransactions: FC<{
  onClose: () => void;
  onBack: () => void;
  poolId: string | undefined;
  liquidityPosition: LiquidityPosition | undefined;
  collateralType: CollateralType;
}> = ({ collateralType, liquidityPosition, poolId, onClose, onBack }) => {
  const [steps, setSteps] = useState<
    {
      title: ReactNode;
      subtitle?: ReactNode;
      cb: () => Promise<any>;
    }[]
  >([]);
  const { setCollateralChange, setDebtChange } = useContext(ManagePositionContext);
  const { data: systemToken } = useSystemToken();
  const { data: balance } = useTokenBalance(systemToken?.address);
  const { data: CoreProxy } = useCoreProxy();
  const { network } = useNetwork();
  const toast = useToast({ isClosable: true, duration: 9000 });
  const isBase = isBaseAndromeda(network?.id, network?.preset);

  const debtSymbol = isBase ? collateralType.symbol : systemToken?.symbol;
  const collateralSymbol = collateralType.displaySymbol;

  const [txState, setTxState] = useState({
    step: 0,
    status: 'idle',
  });

  const { data: wrapperToken } = useGetWrapperToken(
    getSpotMarketId(liquidityPosition?.accountCollateral.symbol)
  );

  const collateralAddress = isBaseAndromeda(network?.id, network?.preset)
    ? wrapperToken
    : systemToken?.address;
  const queryClient = useQueryClient();
  const availableUSDCollateral = liquidityPosition?.usdCollateral.availableCollateral || ZEROWEI;
  const amountToDeposit = (liquidityPosition?.debt || ZEROWEI).abs().sub(availableUSDCollateral);
  const errorParserCoreProxy = useContractErrorParser(CoreProxy);

  //repay approval
  const { approve, requireApproval } = useApprove({
    contractAddress: collateralAddress,
    amount: amountToDeposit.gt(0) ? amountToDeposit.toBN() : '0',
    spender: CoreProxy?.address,
  });
  const { exec: execRepay } = useRepay({
    accountId: liquidityPosition?.accountId,
    poolId: poolId,
    collateralTypeAddress: collateralType?.tokenAddress,
    debtChange: liquidityPosition?.debt.mul(-1) || ZEROWEI,
    availableUSDCollateral,
    balance,
  });
  const { exec: undelegate } = useUndelegate({
    accountId: liquidityPosition?.accountId,
    poolId: poolId,
    collateralTypeAddress: liquidityPosition?.tokenAddress,
    collateralChange: liquidityPosition?.collateralAmount.mul(-1) || ZEROWEI,
    currentCollateral: liquidityPosition?.collateralAmount || ZEROWEI,
  });

  //repay approval for base
  const {
    approve: approveUSDC,
    requireApproval: requireApprovalUSDC,
    isLoading,
  } = useApprove({
    contractAddress: wrapperToken,
    //slippage for approval
    amount: parseUnits(liquidityPosition?.debt.abs().toString(), 6)
      .mul(110)
      .div(100),
    spender: getRepayerContract(network?.id),
  });
  const { exec: undelegateBaseAndromeda } = useUndelegateBaseAndromeda({
    accountId: liquidityPosition?.accountId,
    poolId: poolId,
    collateralTypeAddress: liquidityPosition?.tokenAddress,
    collateralChange: liquidityPosition?.collateralAmount.mul(-1) || ZEROWEI,
    currentCollateral: liquidityPosition?.collateralAmount || ZEROWEI,
    liquidityPosition,
  });

  //claim
  const { exec: execBorrow } = useBorrow({
    accountId: liquidityPosition?.accountId,
    poolId: poolId,
    collateralTypeAddress: collateralType?.tokenAddress,
    debtChange: liquidityPosition?.debt.mul(-1) || ZEROWEI,
  });

  const getSteps = useCallback(() => {
    const transactions: {
      title: ReactNode;
      subtitle?: ReactNode;
      cb: () => Promise<any>;
    }[] = [];
    if (!isBase) {
      if (liquidityPosition?.debt.gt(0)) {
        if (requireApproval) {
          transactions.push({
            title: `Approve ${systemToken?.symbol} transfer`,
            cb: () => approve(false),
          });
        }
        transactions.push({
          title: 'Repay',
          subtitle: (
            <Text>
              Repay{' '}
              <Amount value={liquidityPosition?.debt.abs()} suffix={` ${systemToken?.symbol}`} />
            </Text>
          ),
          cb: () => execRepay(),
        });
      } else if (liquidityPosition?.debt.lt(0)) {
        transactions.push({
          title: 'Claim',
          subtitle: (
            <Text>
              Claim{' '}
              <Amount value={liquidityPosition?.debt.abs()} suffix={` ${systemToken?.symbol}`} />
            </Text>
          ),
          cb: () => execBorrow(),
        });
      }

      transactions.push({
        title: 'Unlock collateral',
        subtitle: (
          <Text as="div">
            <Amount
              value={liquidityPosition?.collateralAmount || ZEROWEI}
              suffix={` ${collateralSymbol}`}
            />{' '}
            will be unlocked from the pool.
          </Text>
        ),
        cb: () => undelegate(),
      });
    } else {
      if (liquidityPosition?.debt.gt(-0.00001)) {
        if (requireApprovalUSDC) {
          transactions.push({
            title: `Approve ${debtSymbol} transfer`,
            cb: () => approveUSDC(false),
          });
        }
      }

      transactions.push({
        title: 'Unlock collateral',
        subtitle: (
          <Text as="div">
            <Amount
              value={liquidityPosition?.collateralAmount || ZEROWEI}
              suffix={` ${collateralSymbol}`}
            />{' '}
            will be unlocked from the pool.
          </Text>
        ),
        cb: () => undelegateBaseAndromeda(),
      });

      if (liquidityPosition?.debt.lt(0)) {
        transactions.push({
          title: 'Claim',
          subtitle: (
            <Text>
              Claim <Amount value={liquidityPosition?.debt.abs()} suffix={` ${debtSymbol}`} />
            </Text>
          ),
          cb: () => execBorrow(),
        });
      }
    }

    return transactions;
  }, [
    approve,
    approveUSDC,
    collateralSymbol,
    debtSymbol,
    execBorrow,
    execRepay,
    isBase,
    liquidityPosition?.collateralAmount,
    liquidityPosition?.debt,
    requireApproval,
    requireApprovalUSDC,
    systemToken?.symbol,
    undelegate,
    undelegateBaseAndromeda,
  ]);

  useEffect(() => {
    if (!steps.length && !isLoading) {
      setTxState({
        step: 0,
        status: 'idle',
      });
      setSteps(getSteps());
    }
  }, [getSteps, isLoading, steps.length]);

  const isSuccess = txState.step >= steps.length;

  const handleSubmit = useCallback(async () => {
    try {
      let i = txState.step > -1 ? txState.step : 0;

      for (; i < steps.length; i++) {
        setTxState({
          step: i,
          status: 'pending',
        });

        await steps[i].cb();
      }

      setTxState({
        step: steps.length,
        status: 'success',
      });

      queryClient.invalidateQueries({
        queryKey: [`${network?.id}-${network?.preset}`, 'LiquidityPosition'],
      });
      queryClient.invalidateQueries({
        queryKey: [`${network?.id}-${network?.preset}`, 'LiquidityPositions'],
      });
      queryClient.invalidateQueries({
        queryKey: [`${network?.id}-${network?.preset}`, 'Allowance'],
      });
      queryClient.invalidateQueries({
        queryKey: [`${network?.id}-${network?.preset}`, 'AccountSpecificCollateral'],
      });
      queryClient.invalidateQueries({
        queryKey: [`${network?.id}-${network?.preset}`, 'TokenBalance'],
      });
      queryClient.invalidateQueries({
        queryKey: [`${network?.id}-${network?.preset}`, 'AccountCollateralUnlockDate'],
      });

      setCollateralChange(ZEROWEI);
      setDebtChange(ZEROWEI);
    } catch (error) {
      setTxState((state) => ({
        step: state.step,
        status: 'error',
      }));

      const contractError = errorParserCoreProxy(error);

      if (contractError) {
        console.error(new Error(contractError.name), contractError);
      }
      toast.closeAll();
      toast({
        title: 'Transaction failed',
        variant: 'left-accent',
        description: contractError ? (
          <ContractError contractError={contractError} />
        ) : (
          'Please try again.'
        ),
        status: 'error',
      });
      throw Error('Transaction failed', { cause: error });
    }
  }, [
    txState.step,
    steps,
    queryClient,
    network?.id,
    network?.preset,
    setCollateralChange,
    setDebtChange,
    errorParserCoreProxy,
    toast,
  ]);

  if (isSuccess) {
    return (
      <LiquidityPositionUpdated
        onClose={onClose}
        title="Position successfully Closed"
        subline={
          <>
            Your position has been successfully closed, read more about it in the{' '}
            <Link
              href="https://docs.synthetix.io/v/synthetix-v3-user-documentation"
              target="_blank"
              color="cyan.500"
            >
              Synthetix V3 Documentation
            </Link>
          </>
        }
        alertText={<>Position successfully Closed</>}
      />
    );
  }

  return (
    <Flex flexDirection="column">
      <Text color="gray.50" fontSize="sm" fontWeight="700">
        <ArrowBackIcon cursor="pointer" onClick={onBack} mr={2} />
        Close Position
      </Text>

      <Divider mt={6} bg="gray.900" />

      {isLoading && !steps.length && <Skeleton width="100%" height="78px" mt="6" />}
      {steps.map((step, i) => (
        <Multistep
          key={i}
          step={i + 1}
          title={step.title}
          subtitle={step.subtitle}
          status={{
            failed: txState.step === i && txState.status === 'error',
            success: txState.step > i,
            loading: txState.step === i && txState.status === 'pending',
          }}
        />
      ))}

      <Button isLoading={txState.status === 'pending'} onClick={handleSubmit} mt="6">
        {(() => {
          switch (true) {
            case txState.status === 'error':
              return 'Retry';
            case txState.status === 'pending':
              return 'Processing...';
            default:
              return 'Execute Transaction';
          }
        })()}
      </Button>
    </Flex>
  );
};

import { Button, Divider, Flex, Skeleton, Text, useToast, Link } from '@chakra-ui/react';
import { FC, ReactNode, useCallback, useEffect, useState, useContext } from 'react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { LiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { CollateralType } from '@snx-v3/useCollateralTypes';
import { useRepay } from '@snx-v3/useRepay';
import { ZEROWEI } from '../../utils/constants';
import { useSystemToken } from '@snx-v3/useSystemToken';
import { useTokenBalance } from '@snx-v3/useTokenBalance';
import { useNetwork } from '@snx-v3/useBlockchain';
import { getRepayerContract, isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { useBorrow } from '@snx-v3/useBorrow';
import { Amount } from '@snx-v3/Amount';
import { useApprove } from '@snx-v3/useApprove';
import { useGetUSDTokens } from '@snx-v3/useGetUSDTokens';
import { parseUnits } from '@snx-v3/format';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useUndelegate } from '@snx-v3/useUndelegate';
import { useUndelegateBaseAndromeda } from '@snx-v3/useUndelegateBaseAndromeda';
import { Multistep } from '@snx-v3/Multistep';
import { useContractErrorParser } from '@snx-v3/useContractErrorParser';
import { ContractError } from '@snx-v3/ContractError';
import { LiquidityPositionUpdated } from '../Manage/LiquidityPositionUpdated';
import { useQueryClient } from '@tanstack/react-query';
import { ManagePositionContext } from '@snx-v3/ManagePositionContext';

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
  const { data: usdTokens } = useGetUSDTokens();
  const { data: CoreProxy } = useCoreProxy();
  const { network } = useNetwork();
  const toast = useToast({ isClosable: true, duration: 9000 });

  const [txState, setTxState] = useState({
    step: 0,
    status: 'idle',
  });

  const isBase = isBaseAndromeda(network?.id, network?.preset);

  const collateralAddress = isBaseAndromeda(network?.id, network?.preset)
    ? usdTokens?.USDC
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
    contractAddress: usdTokens?.USDC,
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
              suffix={` ${collateralType?.displaySymbol}`}
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
            title: 'Approve USDC transfer',
            cb: () => approveUSDC(false),
          });
        }
      }

      transactions.push({
        title: 'Unlock collateral',
        subtitle: (
          <Text as="div">
            <Amount value={liquidityPosition?.collateralAmount || ZEROWEI} suffix={` USDC`} /> will
            be unlocked from the pool.
          </Text>
        ),
        cb: () => undelegateBaseAndromeda(),
      });

      if (liquidityPosition?.debt.lt(0)) {
        transactions.push({
          title: 'Claim',
          subtitle: (
            <Text>
              Claim <Amount value={liquidityPosition?.debt.abs()} suffix={` USDC`} />
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
    collateralType?.displaySymbol,
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
        description: contractError ? (
          <ContractError contractError={contractError} />
        ) : (
          'Please try again.'
        ),
        status: 'error',
      });
      throw Error('Transaction failed', { cause: error });
    }
  }, [txState.step, steps, setCollateralChange, setDebtChange, errorParserCoreProxy, toast]);

  if (isSuccess) {
    return (
      <LiquidityPositionUpdated
        onClose={() => {
          queryClient.invalidateQueries({
            queryKey: [`${network?.id}-${network?.preset}`, 'LiquidityPosition'],
          });
          queryClient.invalidateQueries({
            queryKey: [`${network?.id}-${network?.preset}`, 'LiquidityPositions'],
          });
          onClose();
        }}
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

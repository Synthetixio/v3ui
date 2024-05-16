import { Button, Flex, Text } from '@chakra-ui/react';
import { Amount } from '@snx-v3/Amount';
import { LiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { wei } from '@synthetixio/wei';
import { getRepayerContract, getUSDCAddress, isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { useNetwork } from '@snx-v3/useBlockchain';
import { useParams, useSearchParams } from 'react-router-dom';
import { useCallback, useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useApprove } from '@snx-v3/useApprove';
import { parseUnits } from '@snx-v3/format';
import { useTokenBalance } from '@snx-v3/useTokenBalance';
import { useClearDebt } from '@snx-v3/useClearDebt';

export const RepayAllDebt = ({ liquidityPosition }: { liquidityPosition: LiquidityPosition }) => {
  const { network } = useNetwork();
  const isBase = isBaseAndromeda(network?.id, network?.preset);
  const params = useParams();
  const [searchParams] = useSearchParams();

  const queryClient = useQueryClient();

  const debtExists = liquidityPosition.debt.gt(0.01);
  const currentDebt = debtExists ? liquidityPosition.debt : wei(0);

  const { data: tokenBalance } = useTokenBalance(
    isBase ? getUSDCAddress(network?.id) : liquidityPosition.tokenAddress
  );

  const sufficientBalance = useMemo(
    () => Number(tokenBalance?.toString()) >= currentDebt.toNumber(),
    [currentDebt, tokenBalance]
  );

  const {
    exec: execRepay,
    settle: settleRepay,
    isLoading,
  } = useClearDebt({
    accountId: searchParams.get('accountId') || '',
    poolId: params.poolId,
    collateralTypeAddress: liquidityPosition?.tokenAddress,
    availableUSDCollateral: liquidityPosition.accountCollateral.availableCollateral,
    debt: currentDebt,
  });

  const {
    approve,
    requireApproval,
    isLoading: approvalLoading,
  } = useApprove({
    contractAddress: getUSDCAddress(network?.id),
    //slippage for approval
    amount: parseUnits(currentDebt.toString(), 6).mul(110).div(100),
    spender: getRepayerContract(network?.id),
  });

  const submit = useCallback(async () => {
    try {
      if (requireApproval) {
        await approve(false);
      }
      await execRepay();

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [`${network?.id}-${network?.preset}`, 'TokenBalance'],
        }),
        queryClient.invalidateQueries({
          queryKey: [`${network?.id}-${network?.preset}`, 'Allowance'],
        }),
        queryClient.invalidateQueries({
          queryKey: [`${network?.id}-${network?.preset}`, 'LiquidityPosition'],
        }),
        queryClient.invalidateQueries({
          queryKey: [`${network?.id}-${network?.preset}`, 'AccountCollateralUnlockDate'],
        }),
      ]);

      settleRepay();
    } catch (error) {}
  }, [approve, execRepay, network?.id, network?.preset, queryClient, requireApproval, settleRepay]);

  return (
    <Flex flexDirection="column">
      <Text fontSize="md" fontWeight="700" mb="0.5">
        Repay {isBase ? 'USDC' : 'snxUSD'}
      </Text>
      <Text fontSize="sm" color="gray.400" mb="4">
        Your account currently has a positive debt. This amount must be paid to initiate collateral
        withdrawal.
      </Text>
      <Button
        isDisabled={!sufficientBalance}
        isLoading={isLoading || approvalLoading}
        onClick={submit}
        data-testid="repay"
      >
        Repay USDC $<Amount value={currentDebt} data-testid="current debt" />
        {sufficientBalance ? '' : '(Insufficient Balance)'}
      </Button>
    </Flex>
  );
};

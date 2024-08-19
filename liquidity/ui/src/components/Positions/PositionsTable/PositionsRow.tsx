import { Box, Button, Collapse, Fade, Flex, Td, Text, Tooltip, Tr } from '@chakra-ui/react';
import { TokenIcon } from '../../TokenIcon';
import { LiquidityPositionType } from '@snx-v3/useLiquidityPositions';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CRatioBadge } from '../../CRatioBar/CRatioBadge';
import { Amount } from '@snx-v3/Amount';
import { TimeIcon } from '@chakra-ui/icons';
import { useWithdrawTimer } from '../../../../../lib/useWithdrawTimer';
import { useTokenPrice } from '../../../../../lib/useTokenPrice';
import { DebtAmount } from './DebtAmount';
import { useRewards } from '@snx-v3/useRewards';
import { useMemo } from 'react';
interface PositionRow extends LiquidityPositionType {
  final: boolean;
  isBase: boolean;
  apr?: number;
  systemTokenSymbol?: string;
}

export function PositionRow({
  poolId,
  collateralType,
  debt,
  final,
  cRatio,
  isBase,
  apr,
  collateralAmount,
  availableCollateral,
  accountId,
}: PositionRow) {
  const { data: rewardsData } = useRewards(poolId, collateralType?.tokenAddress, accountId);
  const collateralPrice = useTokenPrice(collateralType.symbol);
  const [queryParams] = useSearchParams();
  const navigate = useNavigate();
  const { minutes, hours, isRunning } = useWithdrawTimer(accountId);

  const handleNavigate = (actions: string) => {
    queryParams.set('manageAction', actions);
    navigate({
      pathname: `/positions/${collateralType.symbol}/${poolId}`,
      search: queryParams.toString(),
    });
  };

  const hasRewards = useMemo(
    () => (rewardsData || []).reduce((curr, acc) => curr + acc.claimableAmount.toNumber(), 0) > 0,
    [rewardsData]
  );

  return (
    <Tr borderBottomWidth={final ? 'none' : '1px'}>
      <Td border="none">
        <Fade in>
          <Flex
            alignItems="center"
            _hover={{ textDecoration: 'underline', cursor: 'pointer' }}
            onClick={() => handleNavigate(debt.gt(0) ? 'repay' : 'claim')}
          >
            <TokenIcon symbol={collateralType.symbol} />
            <Flex flexDirection="column" ml={3}>
              <Text
                color="white"
                fontWeight={700}
                lineHeight="1.25rem"
                fontFamily="heading"
                fontSize="sm"
              >
                {collateralType.symbol}
              </Text>
              <Text color="gray.500" fontFamily="heading" fontSize="0.75rem" lineHeight="1rem">
                {collateralType.displaySymbol}
              </Text>
            </Flex>
          </Flex>
        </Fade>
      </Td>
      <Td border="none">
        <Flex flexDirection="column" alignItems="flex-end">
          <Text color="white" lineHeight="1.25rem" fontFamily="heading" fontSize="sm">
            {collateralPrice.gt(0) && (
              <Amount prefix="$" value={collateralAmount.mul(collateralPrice)} />
            )}
          </Text>
          <Text color="gray.500" fontFamily="heading" fontSize="0.75rem" lineHeight="1rem">
            <Amount value={collateralAmount} suffix={` ${collateralType.symbol.toString()}`} />
          </Text>
        </Flex>
      </Td>
      <Td border="none">
        <Flex flexDirection="column" alignItems="flex-end">
          <Text
            display="flex"
            alignItems="center"
            color="white"
            lineHeight="1.25rem"
            fontFamily="heading"
            fontSize="sm"
            gap={1.5}
          >
            {collateralPrice.gt(0) && (
              <Amount prefix="$" value={availableCollateral.mul(collateralPrice)} />
            )}

            {availableCollateral.gt(0) && isRunning && (
              <Tooltip label={`Withdrawal available in ${hours}H${minutes}M`}>
                <TimeIcon />
              </Tooltip>
            )}
          </Text>
          <Box color="gray.500" fontFamily="heading" fontSize="0.75rem" lineHeight="1rem">
            {availableCollateral.gt(0) && !isRunning ? (
              <Text
                color="cyan.500"
                fontFamily="heading"
                fontSize="0.75rem"
                lineHeight="1rem"
                cursor="pointer"
                onClick={() => handleNavigate('withdraw')}
              >
                Withdraw
              </Text>
            ) : (
              <Amount value={availableCollateral} suffix={` ${collateralType.symbol.toString()}`} />
            )}
          </Box>
        </Flex>
      </Td>
      <Td border="none">
        <Fade in>
          <Flex flexDirection="column" alignItems="flex-end">
            <Text color="white" lineHeight="1.25rem" fontFamily="heading" fontSize="sm">
              {!!apr ? apr.toFixed(2).concat('%') : '-'}
            </Text>
            {hasRewards && (
              <Text
                color="cyan.500"
                fontFamily="heading"
                fontSize="0.75rem"
                lineHeight="1rem"
                cursor="pointer"
                onClick={() => handleNavigate('deposit')}
              >
                Claim Rewards
              </Text>
            )}
          </Flex>
        </Fade>
      </Td>

      <Td border="none">
        <Flex flexDirection="column" alignItems="flex-end">
          <DebtAmount debt={debt} showPNL={isBase} />
          <Collapse in={!debt.eq(0)}>
            <Text
              color="cyan.500"
              fontFamily="heading"
              fontSize="0.75rem"
              lineHeight="1rem"
              cursor="pointer"
              onClick={() => handleNavigate(debt.gt(0) ? 'repay' : 'claim')}
            >
              {debt.gt(0) ? 'Repay Debt' : 'Claim Credit'}
            </Text>
          </Collapse>
        </Flex>
      </Td>
      {!isBase && (
        <Td border="none">
          <Fade in>
            <Flex flexDirection="column" alignItems="flex-end">
              <Text color="white" fontSize="sm" lineHeight="1.25rem" fontFamily="heading">
                {debt.gt(0) ? (cRatio.toNumber() * 100).toFixed(2) + '%' : 'Infinite'}
              </Text>
              <CRatioBadge
                cRatio={cRatio.toNumber() * 100}
                liquidationCratio={(collateralType?.liquidationRatioD18?.toNumber() || 0) * 100}
                targetCratio={(collateralType?.issuanceRatioD18.toNumber() || 0) * 100}
              />
            </Flex>
          </Fade>
        </Td>
      )}
      <Td border="none" pr={0}>
        <Flex justifyContent="flex-end">
          <Button
            fontSize="sm"
            lineHeight="1.25rem"
            height="2rem"
            fontWeight={700}
            pt="5px"
            pb="5px"
            pl="12px"
            pr="12px"
            borderWidth="1px"
            borderColor="gray.900"
            borderRadius="4px"
            onClick={() => handleNavigate('deposit')}
            data-cy="manage-position-row-button"
          >
            Manage
          </Button>
        </Flex>
      </Td>
    </Tr>
  );
}

import { useParams } from '@snx-v3/useParams';
import { useLiquidityPositions } from '@snx-v3/useLiquidityPositions';
import { Fade, Flex, Heading, Skeleton, Text, Tooltip } from '@chakra-ui/react';
import { usePool } from '@snx-v3/usePools';
import { TokenIcon } from '../../components/TokenIcon';
import { InfoIcon } from '@chakra-ui/icons';
import PositionOverview from '../../components/PositionOverview/PositionOverview';
import { ReactNode } from 'react';

function DepositUi({
  isFirstDeposit,
  isLoading,
  collateralSymbol,
  poolName,
  PositionOverview,
}: {
  isFirstDeposit: boolean;
  isLoading: boolean;
  collateralSymbol?: string;
  poolName?: string;
  PositionOverview: ReactNode;
}) {
  return (
    <Flex height="100%" flexDirection="column" w="100%" p="6">
      <Flex gap="4" alignItems="center" mb="6">
        <TokenIcon symbol={collateralSymbol || ''} width={42} height={42} />
        <Flex justifyContent="space-between" w="100%">
          <Skeleton
            isLoaded={!isLoading}
            height="48px"
            minWidth={isLoading ? '40%' : 'initial'}
            startColor="gray.700"
            endColor="navy.800"
          >
            <Fade in>
              <Heading fontSize="24px" color="white">
                {isFirstDeposit ? 'Open ' + collateralSymbol + ' Liquidity Position' : 'TODO'}
              </Heading>
              <Text fontWeight={700} color="white">
                {poolName}
              </Text>
            </Fade>
          </Skeleton>
          <Flex flexDir="column" alignItems="flex-end">
            <Text fontSize="14px" color="gray.500" fontWeight={500}>
              Estimated APY{' '}
              <Tooltip label="TODO" p="3">
                <InfoIcon w="12px" h="12px" />
              </Tooltip>
            </Text>
            <Text fontSize="24px" fontWeight={800}>
              TODO%
            </Text>
          </Flex>
        </Flex>
      </Flex>
      {PositionOverview}
    </Flex>
  );
}

export function Deposit() {
  const { poolId, accountId, collateralSymbol } = useParams();

  const { data: pool, isLoading: isPoolLoading } = usePool(poolId);

  const { data: liquidityPosition, isLoading: isLiquidityPositionsLoading } = useLiquidityPositions(
    { accountId }
  );

  const isLoading = isPoolLoading && isLiquidityPositionsLoading;

  return (
    <DepositUi
      isLoading={isLoading}
      isFirstDeposit={!liquidityPosition}
      collateralSymbol={collateralSymbol}
      poolName={pool?.name}
      PositionOverview={
        <PositionOverview
          collateralType={collateralSymbol || ''}
          currentCollateral={
            liquidityPosition
              ? liquidityPosition[`${poolId}-${collateralSymbol}`].collateralAmount.toString()
              : '00.00'
          }
        />
      }
    />
  );
}

import { Helmet } from 'react-helmet';
import { Flex } from '@chakra-ui/react';
import React from 'react';
import { CollateralType, useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { PoolsType, usePools } from '@snx-v3/usePools';
import { useParams } from '@snx-v3/useParams';
import { LiquidityPositionsById, useLiquidityPositions } from '@snx-v3/useLiquidityPositions';
import { Welcome } from '../../components/Shared/Welcome';
import { AvailableCollateral } from './AvailableCollateral';
import { PoolsList, Stats } from '../../components/Pools';

export function HomeUi({
  collateralTypes,
  pools,
  liquidityPositionsById,
  isLoading,
}: {
  collateralTypes?: CollateralType[];
  pools?: PoolsType;
  liquidityPositionsById?: LiquidityPositionsById;
  isLoading: boolean;
}) {
  const { totalCollateral, totalDebt } =
    Object.values(liquidityPositionsById || []).reduce(
      (acc, val) => {
        acc.totalCollateral = acc.totalCollateral + val.collateralValue.toNumber();
        acc.totalDebt = acc.totalDebt + val.debt.toNumber();
        return acc;
      },
      { totalCollateral: 0, totalDebt: 0 }
    ) || {};

  return (
    <Flex height="100%" flexDirection="column">
      <Welcome />
      <Stats totalDebt={totalDebt} totalCollateral={totalCollateral} isLoading={isLoading} />
      <PoolsList
        pools={pools}
        isLoading={isLoading}
        collateralTypes={collateralTypes}
        liquidityPositionsById={liquidityPositionsById}
      />
      <AvailableCollateral />
    </Flex>
  );
}

export function Home() {
  const { accountId } = useParams();

  const { data: collateralTypes = [], isLoading: collateralTypesLoading } = useCollateralTypes();
  const { data: pools, isLoading: isPoolsLoading } = usePools();

  const {
    data: liquidityPositionsById,
    isLoading: liquidityPositionLoading,
    isInitialLoading: liquidityInitialLoading,
  } = useLiquidityPositions({ accountId });

  const isLoading =
    collateralTypesLoading ||
    isPoolsLoading ||
    (liquidityPositionLoading && liquidityInitialLoading);

  return (
    <>
      <Helmet>
        <title>Synthetix V3</title>
        <meta name="description" content="Synthetix V3" />
      </Helmet>
      <HomeUi
        isLoading={isLoading}
        liquidityPositionsById={liquidityPositionsById}
        collateralTypes={collateralTypes}
        pools={pools}
      />
    </>
  );
}

import React from 'react';
import { Helmet } from 'react-helmet';
import { Flex } from '@chakra-ui/react';
import { useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { usePools } from '@snx-v3/usePools';
import { useParams } from '@snx-v3/useParams';
import { useLiquidityPositions } from '@snx-v3/useLiquidityPositions';
import { Welcome } from '../../components/Shared/Welcome';
import { PoolsList, Stats, AvailableCollateral } from '@snx-v3/Pools';
import { useApr } from '@snx-v3/useApr';

export function Home() {
  const { accountId } = useParams();

  const { data: collateralTypes = [], isLoading: collateralTypesLoading } = useCollateralTypes();
  const { data: pools, isLoading: isPoolsLoading } = usePools();
  const { data: aprData, isLoading: isAprLoading } = useApr();

  console.log('APR', aprData);

  const { data: liquidityPositionsById, isLoading: liquidityPositionLoading } =
    useLiquidityPositions({ accountId });

  const isLoading =
    collateralTypesLoading || isPoolsLoading || liquidityPositionLoading || isAprLoading;

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
    <>
      <Helmet>
        <title>Synthetix V3</title>
        <meta name="description" content="Synthetix V3" />
      </Helmet>
      <Flex height="100%" flexDirection="column">
        <Welcome />
        <Stats totalDebt={totalDebt} totalCollateral={totalCollateral} isLoading={isLoading} />
        <PoolsList
          pools={pools}
          isLoading={isLoading}
          collateralTypes={collateralTypes}
          liquidityPositionsById={liquidityPositionsById}
          apr={aprData?.combinedApr}
        />
        <AvailableCollateral />
      </Flex>
    </>
  );
}

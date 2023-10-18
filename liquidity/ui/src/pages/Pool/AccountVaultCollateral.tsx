import { useLiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { CollateralType } from '@snx-v3/useCollateralTypes';
import { FC } from 'react';
import { Button, Skeleton, Text } from '@chakra-ui/react';
import { generatePath, Link, useLocation } from 'react-router-dom';
import { formatNumber, formatNumberToUsd } from '@snx-v3/formatters';
import { useParams } from '@snx-v3/useParams';

const AccountVaultCollateralUi: FC<{
  collateralValue: number;
  collateralAmount: number;
  collateralSymbol: string;
  poolId: string;
  isLoading: boolean;
}> = ({ collateralValue, collateralAmount, collateralSymbol, isLoading, poolId }) => {
  const location = useLocation();
  return (
    <>
      <Text mt={2} fontSize="sm" fontWeight="700" color="gray.500">
        MY TOTAL
      </Text>
      {isLoading ? (
        <Skeleton h={6} w="full" />
      ) : (
        <Text fontSize="xl" fontWeight={700} color="white">
          {formatNumber(collateralAmount)} {collateralSymbol}
        </Text>
      )}
      {isLoading ? (
        <Skeleton my={1} h={4} w="full" />
      ) : (
        <Text fontSize="sm" color="gray.500" fontWeight="400">
          {formatNumberToUsd(collateralValue)}
        </Text>
      )}
      <Button
        as={Link}
        to={{
          pathname: generatePath('/positions/:collateral/:poolId', {
            collateral: collateralSymbol,
            poolId,
          }),
          search: location.search,
        }}
        mt={1}
      >
        Deposit
      </Button>
    </>
  );
};

export const AccountVaultCollateral: FC<{ collateral: CollateralType }> = ({ collateral }) => {
  const params = useParams();

  const { data, isLoading } = useLiquidityPosition({
    accountId: params.accountId,
    poolId: params.poolId,
    tokenAddress: collateral?.tokenAddress,
  });

  if (!params.poolId || !params.accountId) return null;

  return (
    <AccountVaultCollateralUi
      collateralAmount={data?.collateralAmount.toNumber() || 0}
      collateralValue={data?.collateralPrice?.toNumber() || 0}
      collateralSymbol={collateral.symbol}
      isLoading={isLoading}
      poolId={params.poolId}
    />
  );
};

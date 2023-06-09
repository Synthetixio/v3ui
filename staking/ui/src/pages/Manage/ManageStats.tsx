import { FC, useContext } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { BorderBox } from '@snx-v3/BorderBox';

import { currency } from '@snx-v3/format';
import { LiquidityPosition, useLiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { CollateralType, useCollateralType } from '@snx-v3/useCollateralTypes';
import { useParams } from '@snx-v3/useParams';
import { validatePosition } from '@snx-v3/validatePosition';
import { ManagePositionContext } from '@snx-v3/ManagePositionContext';
import Wei, { wei } from '@synthetixio/wei';
import { ArrowForwardIcon } from '@chakra-ui/icons';

const ChangeStat: FC<{
  value: Wei;
  newValue: Wei;
  hasChanges: boolean;
  formatFn: (val: Wei) => string;
}> = ({ formatFn, value, newValue, hasChanges }) => {
  return (
    <Flex gap={1} color="gray.50" fontSize="2xl" fontWeight="800" alignItems="center">
      <Text>{formatFn(value)}</Text>
      {hasChanges && !value.eq(newValue) ? (
        <Text>
          <ArrowForwardIcon /> {formatFn(newValue)}
        </Text>
      ) : null}
    </Flex>
  );
};

export const ManageStatsUi: FC<{
  liquidityPosition: LiquidityPosition;
  collateralType: CollateralType;
  newCratio: Wei;
  newCollateralAmount: Wei;
  newDebt: Wei;
  hasChanges: boolean;
}> = ({
  liquidityPosition,
  collateralType,
  newCollateralAmount,
  newCratio,
  newDebt,
  hasChanges,
}) => {
  return (
    <Flex direction="column" gap={2}>
      <BorderBox px={4} py={2} flexDirection="column">
        <Text color="gray.500" fontSize="sm">
          COLLATERAL
        </Text>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          data-testid="manage stats collateral"
        >
          <ChangeStat
            value={liquidityPosition.collateralAmount}
            newValue={newCollateralAmount}
            formatFn={(val: Wei) => `${currency(val)} ${collateralType.displaySymbol}`}
            hasChanges={hasChanges}
          />
        </Flex>
        <Text fontWeight="400" color="gray.500" fontSize="xs">
          Current Value:{' '}
          {currency(liquidityPosition.collateralValue, {
            currency: 'USD',
            style: 'currency',
          })}
        </Text>
      </BorderBox>
      <BorderBox px={4} py={2} flexDirection="column">
        <Text color="gray.500" fontSize="sm">
          DEBT
        </Text>
        <Flex justifyContent="space-between" alignItems="center" data-testid="manage stats debt">
          <ChangeStat
            // TODO, need a function to burn to target so dust debt not left over
            value={liquidityPosition.debt.lt(0.01) ? wei(0) : liquidityPosition.debt}
            newValue={newDebt}
            formatFn={(val: Wei) => currency(val, { currency: 'USD', style: 'currency' })}
            hasChanges={hasChanges}
          />
        </Flex>
      </BorderBox>
      <BorderBox px={4} py={2} flexDirection="column">
        <Text color="gray.500" fontSize="sm" data-testid="manage stats c-ratio">
          C-RATIO
        </Text>
        <Flex justifyContent="space-between" alignItems="center">
          <ChangeStat
            // TODO, need a function to burn to target so dust debt not left over
            value={
              liquidityPosition.cRatio.lt(0.01) || liquidityPosition.cRatio.gt(50000)
                ? wei(0)
                : liquidityPosition.cRatio
            }
            newValue={newCratio}
            formatFn={(val: Wei) => currency(val, { style: 'percent' })}
            hasChanges={hasChanges}
          />
        </Flex>
        <Text fontWeight="400" color="gray.500" fontSize="xs">
          Liquidation C-Ratio: {currency(collateralType.liquidationRatioD18, { style: 'percent' })}
        </Text>
      </BorderBox>
    </Flex>
  );
};

export const ManageStats = () => {
  const params = useParams();
  const { debtChange, collateralChange } = useContext(ManagePositionContext);

  const collateralType = useCollateralType(params.collateralSymbol);

  const { data: liquidityPosition } = useLiquidityPosition({
    tokenAddress: collateralType?.tokenAddress,
    accountId: params.accountId,
    poolId: params.poolId,
  });

  const { newCRatio, newCollateralAmount, newDebt, hasChanges } = validatePosition({
    issuanceRatioD18: collateralType?.issuanceRatioD18,
    collateralAmount: liquidityPosition?.collateralAmount,
    collateralValue: liquidityPosition?.collateralValue,
    debt: liquidityPosition?.debt,
    collateralChange: collateralChange,
    debtChange: debtChange,
  });

  if (!liquidityPosition || !collateralType) return null; // TODO skeleton

  return (
    <ManageStatsUi
      hasChanges={hasChanges}
      newCratio={newCRatio}
      newDebt={newDebt}
      newCollateralAmount={newCollateralAmount}
      liquidityPosition={liquidityPosition}
      collateralType={collateralType}
    />
  );
};

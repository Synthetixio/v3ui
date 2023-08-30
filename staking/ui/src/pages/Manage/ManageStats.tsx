import { FC, useContext } from 'react';
import { Flex, Text, Tooltip } from '@chakra-ui/react';
import { BorderBox } from '@snx-v3/BorderBox';
import { currency } from '@snx-v3/format';
import { LiquidityPosition, useLiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { CollateralType, useCollateralType } from '@snx-v3/useCollateralTypes';
import { useParams } from '@snx-v3/useParams';
import { validatePosition } from '@snx-v3/validatePosition';
import { ManagePositionContext } from '@snx-v3/ManagePositionContext';
import Wei, { wei } from '@synthetixio/wei';
import { ArrowForwardIcon, InfoIcon } from '@chakra-ui/icons';

const ChangeStat: FC<{
  value: Wei;
  newValue: Wei;
  hasChanges: boolean;
  formatFn: (val: Wei) => string;
}> = ({ formatFn, value, newValue, hasChanges }) => {
  return (
    <Flex
      gap={1}
      color="gray.50"
      fontSize="2xl"
      fontWeight="800"
      alignItems="center"
      lineHeight="32px"
    >
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
  const performanceLast24h = wei(0.25);
  const isPositive = performanceLast24h.gte(0);
  return (
    <Flex direction="column">
      <BorderBox py={4} px={6} flexDirection="column" bg="navy.700" mb={4}>
        <Flex alignItems="center">
          <Text color="gray.500" fontSize="xs" fontFamily="heading" lineHeight="16px">
            COLLATERAL
          </Text>
          <Tooltip
            label="Your total amount of collateral locked in this pool."
            textAlign="start"
            py={2}
            px={3}
          >
            <Flex height="12px" width="12px" ml="4px" alignItems="center" justifyContent="center">
              <InfoIcon color="white" height="9px" width="9px" />
            </Flex>
          </Tooltip>
        </Flex>
        <Flex
          mt="4px"
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
          <Text
            fontWeight="400"
            color="gray.500"
            fontSize="md"
            fontFamily="heading"
            lineHeight="24px"
          >
            {currency(liquidityPosition.collateralValue, {
              currency: 'USD',
              style: 'currency',
            })}
          </Text>
        </Flex>
      </BorderBox>
      <BorderBox
        py={4}
        px={6}
        flexDirection="row"
        bg="navy.700"
        justifyContent="space-between"
        mb={4}
      >
        <Flex flexDirection="column" justifyContent="space-between">
          <Flex alignItems="center">
            <Text color="gray.500" fontSize="xs" fontFamily="heading" lineHeight="16px">
              DEBT
            </Text>
            <Tooltip label="Your minted debt balance." textAlign="start" py={2} px={3}>
              <Flex height="12px" width="12px" ml="4px" alignItems="center" justifyContent="center">
                <InfoIcon color="white" height="9px" width="9px" />
              </Flex>
            </Tooltip>
          </Flex>
          <ChangeStat
            // TODO, need a function to burn to target so dust debt not left over
            value={liquidityPosition.debt.lt(0.01) ? wei(0) : liquidityPosition.debt}
            newValue={newDebt}
            formatFn={(val: Wei) => currency(val, { currency: 'USD', style: 'currency' })}
            hasChanges={hasChanges}
          />
        </Flex>
        <Flex flexDirection="column" alignItems="flex-end" data-testid="manage stats collateral">
          <Text fontFamily="heading" color="gray.50" fontSize="16px" fontWeight={700}>
            Performance Last 24h
          </Text>
          <Flex>
            <Text
              fontWeight="800"
              color={isPositive ? 'green.500' : 'red.500'}
              fontSize="24px"
              fontFamily="heading"
              lineHeight="32px"
            >
              {isPositive ? '+' : '-'}
              {currency(wei(0.23), {
                currency: 'USD',
                style: 'currency',
              })}
            </Text>
            <Text
              fontWeight="600"
              color={isPositive ? 'green.500' : 'red.500'}
              fontSize="18px"
              fontFamily="heading"
              lineHeight="28px"
              ml={1}
            >
              {isPositive ? '+' : '-'}
              {currency(wei(0.23), {
                style: 'percent',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
          </Flex>
        </Flex>
      </BorderBox>
      <BorderBox py={4} px={6} flexDirection="column" bg="navy.700" my={0} mb={4}>
        <Text color="gray.500" fontSize="xs" fontFamily="heading" lineHeight="16px">
          C-RATIO
        </Text>
        <Flex
          mt="4px"
          justifyContent="space-between"
          alignItems="center"
          data-testid="manage stats collateral"
        >
          <ChangeStat
            // TODO, need a function to burn to target so dust debt not left over
            value={
              liquidityPosition.cRatio.lt(0.01) || liquidityPosition.cRatio.gt(50000)
                ? wei(0)
                : liquidityPosition.cRatio
            }
            newValue={newCratio}
            formatFn={(val: Wei) =>
              currency(val, {
                style: 'percent',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }
            hasChanges={hasChanges}
          />
          <Text
            fontWeight="400"
            color="gray.500"
            fontSize="md"
            fontFamily="heading"
            lineHeight="24px"
          >
            Minimum{' '}
            {currency(collateralType.liquidationRatioD18, {
              style: 'percent',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
        </Flex>
      </BorderBox>
    </Flex>
  );
};

export const ManageStats = () => {
  const params = useParams();
  const { debtChange, collateralChange } = useContext(ManagePositionContext);

  const { data: collateralType } = useCollateralType(params.collateralSymbol);

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

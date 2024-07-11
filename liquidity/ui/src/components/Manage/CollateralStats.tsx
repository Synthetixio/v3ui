import { Flex, Skeleton, Text } from '@chakra-ui/react';
import { BorderBox } from '@snx-v3/BorderBox';
import { FC } from 'react';
import { ChangeStat } from './ManageStats';
import { currency } from '@snx-v3/format';
import { LiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { CollateralType } from '@snx-v3/useCollateralTypes';
import Wei from '@synthetixio/wei';
import { ZEROWEI } from '../../utils/constants';

export const CollateralStats: FC<{
  liquidityPosition?: LiquidityPosition;
  collateralType?: CollateralType;
  newCollateralAmount: Wei;
  collateralValue: Wei;
  hasChanges: boolean;
  isLoading?: boolean;
}> = ({
  liquidityPosition,
  collateralType,
  newCollateralAmount,
  collateralValue,
  hasChanges,
  isLoading,
}) => (
  <BorderBox p={4} flex="1" flexDirection="row" bg="navy.700">
    <Flex
      opacity={!liquidityPosition && !isLoading && !hasChanges ? '40%' : '100%'}
      flexDirection="column"
      width="100%"
    >
      <Flex alignItems="center" mb="4px">
        <Text color="gray.500" fontSize="xs" fontFamily="heading" lineHeight="16px">
          Collateral
        </Text>
      </Flex>
      <Flex width="100%">
        {isLoading ? (
          <Skeleton width="100%">Lorem ipsum (this wont be displaye debt) </Skeleton>
        ) : liquidityPosition && collateralType ? (
          <Flex direction="column">
            <Flex justifyContent="space-between" alignItems="center">
              <ChangeStat
                value={liquidityPosition.collateralAmount}
                newValue={newCollateralAmount}
                formatFn={(val: Wei) => `${currency(val)} ${collateralType.displaySymbol}`}
                hasChanges={hasChanges}
                dataTestId="manage stats collateral"
              />
            </Flex>
            <Text fontWeight="400" color="white" fontSize="16px">
              {currency(collateralValue, {
                currency: 'USD',
                style: 'currency',
              })}
            </Text>
          </Flex>
        ) : (
          <Flex direction="column">
            <ChangeStat
              value={ZEROWEI}
              newValue={newCollateralAmount}
              formatFn={(val: Wei) => `${currency(val)} ${collateralType?.displaySymbol || ''}`}
              hasChanges={hasChanges}
            />
            <Text fontWeight="400" color="white" fontSize="16px">
              {currency(ZEROWEI, {
                currency: 'USD',
                style: 'currency',
              })}
            </Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  </BorderBox>
);

import { InfoIcon } from '@chakra-ui/icons';
import { Flex, Skeleton, Text, Tooltip } from '@chakra-ui/react';
import { BorderBox } from '@snx-v3/BorderBox';
import { FC } from 'react';
import { ChangeStat } from './ManageStats';
import { currency } from '@snx-v3/format';
import { LiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { CollateralType } from '@snx-v3/useCollateralTypes';
import Wei from '@synthetixio/wei';
import { ZEROWEI } from '../../utils/constants';

export const DebtStats: FC<{
  liquidityPosition?: LiquidityPosition;
  collateralType?: CollateralType;
  newDebt: Wei;
  hasChanges: boolean;
  isLoading?: boolean;
}> = ({ liquidityPosition, collateralType, newDebt, hasChanges, isLoading }) => (
  <BorderBox p={4} flex="1" flexDirection="row" bg="navy.700">
    <Flex
      opacity={!liquidityPosition && !isLoading ? '40%' : '100%'}
      flexDirection="column"
      width="100%"
    >
      <Flex alignItems="center" mb="4px">
        <Text color="gray.500" fontSize="xs" fontFamily="heading" lineHeight="16px">
          Debt
        </Text>
        <Tooltip
          label={
            <Text>
              Debt in Synthetix V3 consists of:
              <br />
              1. Your portion of the pool&apos;s total debt, which fluctuates based on trader
              performance and market conditions.
              <br />
              2. The amount you&apos;ve borrowed against your collateral without incurring interest.
            </Text>
          }
          textAlign="start"
          py={2}
          px={3}
        >
          <Flex height="12px" width="12px" ml="4px" alignItems="center" justifyContent="center">
            <InfoIcon color="white" height="9px" width="9px" />
          </Flex>
        </Tooltip>
      </Flex>
      <Flex width="100%">
        {isLoading ? (
          <Skeleton width="100%">Lorem ipsum (this wont be displaye debt) </Skeleton>
        ) : liquidityPosition && collateralType ? (
          <ChangeStat
            value={liquidityPosition.debt}
            newValue={newDebt}
            formatFn={(val: Wei) =>
              currency(val, {
                currency: 'USD',
                style: 'currency',
                maximumFractionDigits: 4,
              })
            }
            hasChanges={hasChanges}
            dataTestId="manage-stats-debt-value"
          />
        ) : (
          <ChangeStat
            value={ZEROWEI}
            newValue={ZEROWEI}
            formatFn={(val: Wei) =>
              currency(val, {
                currency: 'USD',
                style: 'currency',
                maximumFractionDigits: 4,
              })
            }
            hasChanges={false}
          />
        )}
      </Flex>
    </Flex>
  </BorderBox>
);

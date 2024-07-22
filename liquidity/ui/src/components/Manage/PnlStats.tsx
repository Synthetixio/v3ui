import { InfoIcon } from '@chakra-ui/icons';
import { Flex, Skeleton, Text, Tooltip } from '@chakra-ui/react';
import { BorderBox } from '@snx-v3/BorderBox';
import { FC } from 'react';
import { currency } from '@snx-v3/format';
import { LiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { CollateralType } from '@snx-v3/useCollateralTypes';
import Wei from '@synthetixio/wei';
import { ChangeStat } from './ChangeStat';

export const PnlStats: FC<{
  liquidityPosition?: LiquidityPosition;
  collateralType?: CollateralType;
  newDebt: Wei;
  hasChanges: boolean;
}> = ({ liquidityPosition, collateralType, newDebt, hasChanges }) => (
  <BorderBox p={4} flex="1" flexDirection="row" bg="navy.700" justifyContent="space-between">
    <Flex flexDirection="column" width="100%">
      <Flex alignItems="center" mb="4px">
        <Text color="gray.500" fontSize="xs" fontFamily="heading" lineHeight="16px">
          PnL
        </Text>
        <Tooltip
          label={
            <Text>
              Debt consists of:
              <br />
              - Your portion of the pool&apos;s total debt, which fluctuates based on trader
              performance and market conditions
              <br />- The amount you&apos;ve borrowed against your collateral without incurring
              interest
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
        {liquidityPosition && collateralType ? (
          <ChangeStat
            value={liquidityPosition.debt.mul(-1)}
            newValue={newDebt.mul(-1)}
            formatFn={(val: Wei) =>
              currency(val, {
                currency: 'USD',
                style: 'currency',
                maximumFractionDigits: 4,
              })
            }
            withColor
            hasChanges={hasChanges}
            dataTestId="manage-stats-debt-value"
          />
        ) : (
          <Skeleton width="100%">Lorem ipsum (this wont be displaye debt) </Skeleton>
        )}
      </Flex>
    </Flex>
  </BorderBox>
);

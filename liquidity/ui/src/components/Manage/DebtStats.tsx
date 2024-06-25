import { InfoIcon } from '@chakra-ui/icons';
import { Flex, Skeleton, Text, Tooltip } from '@chakra-ui/react';
import { BorderBox } from '@snx-v3/BorderBox';
import { FC } from 'react';
import { ChangeStat } from './ManageStats';
import { currency } from '@snx-v3/format';
import { LiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { CollateralType } from '@snx-v3/useCollateralTypes';
import Wei from '@synthetixio/wei';

export const DebtStats: FC<{
  liquidityPosition?: LiquidityPosition;
  collateralType?: CollateralType;
  newDebt: Wei;
  hasChanges: boolean;
}> = ({ liquidityPosition, collateralType, newDebt, hasChanges }) => (
  <BorderBox p={4} flex="1" flexDirection="row" bg="navy.700">
    <Flex flexDirection="column" width="100%">
      <Flex alignItems="center" mb="4px">
        <Text color="gray.500" fontSize="xs" fontFamily="heading" lineHeight="16px">
          Debt
        </Text>
        <Tooltip label="Your minted debt balance." textAlign="start" py={2} px={3}>
          <Flex height="12px" width="12px" ml="4px" alignItems="center" justifyContent="center">
            <InfoIcon color="white" height="9px" width="9px" />
          </Flex>
        </Tooltip>
      </Flex>
      <Flex width="100%">
        {liquidityPosition && collateralType ? (
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
          <Skeleton width="100%">Lorem ipsum (this wont be displaye debt) </Skeleton>
        )}
      </Flex>
    </Flex>
  </BorderBox>
);

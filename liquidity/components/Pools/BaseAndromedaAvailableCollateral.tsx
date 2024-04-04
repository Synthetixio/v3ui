import { useMemo } from 'react';
import { Amount } from '@snx-v3/Amount';
import { Button, Fade, Flex, Td, Text, Tr } from '@chakra-ui/react';
import { CollateralIcon } from '@snx-v3/icons';
import { AccountCollateralWithSymbol } from '@snx-v3/useAccountCollateral';

export type BaseAndromedaAvailableCollateralProps = {
  accountCollateralUnlockDate?: Date;
  accountCollaterals: AccountCollateralWithSymbol[];
};

export function BaseAndromedaAvailableCollateral({
  accountCollaterals,
  accountCollateralUnlockDate,
}: BaseAndromedaAvailableCollateralProps) {
  const usdcCollateral = useMemo(
    () => accountCollaterals.find((item) => item.symbol === 'USDC'),
    [accountCollaterals]
  );

  const snxUSDCollateral = useMemo(
    () => accountCollaterals.find((item) => item.symbol === 'snxUSD'),
    [accountCollaterals]
  );

  const isDisabled = useMemo(
    () =>
      !accountCollateralUnlockDate ||
      accountCollateralUnlockDate.getTime() > Date.now() ||
      snxUSDCollateral?.availableCollateral.add(usdcCollateral?.availableCollateral).eq(0),
    [
      accountCollateralUnlockDate,
      snxUSDCollateral?.availableCollateral,
      usdcCollateral?.availableCollateral,
    ]
  );

  return (
    <Tr data-testid="available collateral row">
      <Td>
        <Flex flexDir="row" py={4}>
          <Fade in>
            <CollateralIcon width="32px" height="32px" symbol="USDC" />
          </Fade>
          <Flex flexDirection="column" justifyContent="center" ml={2}>
            <Fade in>
              <Text fontSize="lg" color="gray.500" data-testid="available-collateral">
                <Amount
                  value={usdcCollateral?.availableCollateral.add(
                    snxUSDCollateral?.availableCollateral
                  )}
                />{' '}
                USDC
              </Text>
            </Fade>
          </Flex>
        </Flex>
      </Td>
      <Td textAlign="end">
        <Fade in>
          <Button isDisabled={isDisabled} data-testid="withdraw-button">
            Withdraw
          </Button>
        </Fade>
      </Td>
    </Tr>
  );
}

import { useState, lazy, Suspense } from 'react';
import { Amount } from '@snx-v3/Amount';
import { Button, Fade, Flex, Td, Text, Tr } from '@chakra-ui/react';
import { CollateralIcon } from '@snx-v3/icons';
import { AccountCollateralWithSymbol } from '@snx-v3/useAccountCollateral';
import { safeImport } from '@synthetixio/safe-import';

const WithdrawModal = lazy(() => safeImport(() => import('@snx-v3/WithdrawModal')));

function AvailableCollateralRowUi({
  accountCollateral,
  isDisabled,
}: {
  accountCollateral: AccountCollateralWithSymbol;
  isDisabled: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Tr data-testid="available collateral row">
      <Td>
        <Flex flexDir="row" py={4}>
          <Fade in>
            <CollateralIcon width="32px" height="32px" symbol={accountCollateral.symbol} />
          </Fade>
          <Flex flexDirection="column" justifyContent="center" ml={2}>
            <Fade in>
              <Text fontSize="lg" color="gray.500">
                <Amount value={accountCollateral.availableCollateral} /> {accountCollateral.symbol}
              </Text>
            </Fade>
          </Flex>
        </Flex>
      </Td>
      <Td textAlign="end">
        <Fade in>
          <Button isDisabled={isDisabled} onClick={() => setIsOpen(true)}>
            Withdraw
          </Button>
        </Fade>
        <Suspense fallback={null}>
          {isOpen ? (
            <WithdrawModal
              accountCollateral={accountCollateral}
              onClose={() => setIsOpen(false)}
              isOpen={isOpen}
            />
          ) : null}
        </Suspense>
      </Td>
    </Tr>
  );
}

export type AvailableCollateralRowProps = {
  accountCollateralUnlockDate?: Date;
  accountCollateral: AccountCollateralWithSymbol;
};

export function AvailableCollateralRow({
  accountCollateral,
  accountCollateralUnlockDate,
}: AvailableCollateralRowProps) {
  return (
    <AvailableCollateralRowUi
      accountCollateral={accountCollateral}
      isDisabled={
        !accountCollateralUnlockDate ||
        accountCollateralUnlockDate.getTime() > Date.now() ||
        accountCollateral.availableCollateral.eq(0)
      }
    />
  );
}

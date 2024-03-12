import { useEffect, useState } from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Fade,
  Flex,
  Heading,
  Skeleton,
  SkeletonCircle,
  Table,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useParams } from '@snx-v3/useParams';
import { AccountCollateralWithSymbol, useAccountCollateral } from '@snx-v3/useAccountCollateral';
import { useAccountCollateralUnlockDate } from '@snx-v3/useAccountCollateralUnlockDate';
import { AvailableCollateralRow } from './';
import { BorderBox } from '@snx-v3/BorderBox';
import { CollateralIcon } from '@snx-v3/icons';
import { formatTimeToUnlock, unlockDateString } from '@snx-v3/formatters';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { useNetwork } from '@snx-v3/useBlockchain';
import { BaseAndromedaAvailableCollateral } from './BaseAndromedaAvailableCollateral';

export function AvailableCollateralUi({
  accountCollaterals,
  timeToUnlock,
  unlockDateString,
  unlockDate,
  isLoading,
}: {
  accountCollaterals: AccountCollateralWithSymbol[];
  timeToUnlock?: string;
  unlockDateString?: string;
  unlockDate?: Date;
  isLoading: boolean;
  AvailableCollateralRow: typeof AvailableCollateralRow;
}) {
  const { network } = useNetwork();
  return (
    <BorderBox p={4} mt={8} flexDir="column">
      <Heading fontSize="2xl" mb="2">
        {isLoading ? 'Loading Collateral...' : 'Available Collateral'}
      </Heading>
      {!isLoading && (
        <Fade in>
          <Flex alignItems="center" mb="0">
            <Text color="gray.500">
              This collateral can be deposited to pools. As a security precaution, this collateral
              cannot be withdrawn until at least 1 day has elapsed since previous account activity.
            </Text>
            <Alert
              ml="auto"
              status={timeToUnlock === '—' ? 'loading' : timeToUnlock ? 'error' : 'success'}
              width="540px"
              title={unlockDateString}
            >
              <AlertIcon />
              <Box width="100%">
                <AlertTitle>Withdrawals available</AlertTitle>
                {timeToUnlock && (
                  <AlertDescription data-testid="time-to-unlock" display="block">
                    {timeToUnlock}
                  </AlertDescription>
                )}
              </Box>
            </Alert>
          </Flex>
        </Fade>
      )}
      <Fade in>
        <Box overflowX="auto">
          <Table mt={8} size="sm" variant="unstyled" mb="9">
            <Thead sx={{ tr: { borderBottomColor: 'gray.900', borderBottomWidth: '1px' } }}>
              <Tr />
            </Thead>
            <Tbody sx={{ tr: { borderBottomColor: 'gray.900', borderBottomWidth: '1px' } }}>
              {isLoading ? (
                // Loading State
                <Tr data-testid="available collateral row" alignItems="center">
                  <Td>
                    <Flex flexDir="row" py={4}>
                      <SkeletonCircle isLoaded={!isLoading} height="28px">
                        <CollateralIcon width="32px" height="32px" symbol="SNX" />
                      </SkeletonCircle>
                    </Flex>
                  </Td>
                  <Td textAlign="end">
                    <Flex height="100%" justifyContent="flex-end">
                      <Skeleton isLoaded={!isLoading} height="28px" width="200px" alignSelf="end">
                        <Button>Withdraw</Button>
                      </Skeleton>
                    </Flex>
                  </Td>
                </Tr>
              ) : isBaseAndromeda(network?.id, network?.preset) ? (
                <BaseAndromedaAvailableCollateral
                  accountCollateralUnlockDate={unlockDate}
                  accountCollaterals={accountCollaterals}
                />
              ) : (
                <>
                  {accountCollaterals?.map((accountCollateral) => (
                    <AvailableCollateralRow
                      key={accountCollateral.tokenAddress}
                      accountCollateralUnlockDate={unlockDate}
                      accountCollateral={accountCollateral}
                    />
                  ))}
                </>
              )}
            </Tbody>
          </Table>
        </Box>
      </Fade>
    </BorderBox>
  );
}

export function AvailableCollateral() {
  const { accountId } = useParams();
  const { data: accountCollateralsData, isLoading: isAccountCollateralsLoading } =
    useAccountCollateral({ accountId, includeDelegationOff: true });

  const { data: accountCollateralUnlockDate, isLoading: isAccountCollateralDateLoading } =
    useAccountCollateralUnlockDate({
      accountId,
    });

  const [timeToUnlock, setTimeToUnlock] = useState(formatTimeToUnlock(accountCollateralUnlockDate));

  useEffect(() => {
    const interval = setInterval(
      () => setTimeToUnlock(formatTimeToUnlock(accountCollateralUnlockDate)),
      1_000
    );
    return () => clearInterval(interval);
  }, [accountCollateralUnlockDate]);

  const isLoading = isAccountCollateralsLoading || isAccountCollateralDateLoading;

  return (
    <AvailableCollateralUi
      accountCollaterals={accountCollateralsData || []}
      timeToUnlock={timeToUnlock}
      unlockDateString={unlockDateString?.toString() || ''}
      unlockDate={accountCollateralUnlockDate}
      isLoading={isLoading}
      AvailableCollateralRow={AvailableCollateralRow}
    />
  );
}

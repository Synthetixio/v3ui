import React, { FC } from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Flex,
  Heading,
  Table,
  Tbody,
  Text,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useParams } from '@snx-v3/useParams';
import { AccountCollateralWithSymbol, useAccountCollateral } from '@snx-v3/useAccountCollateral';
import { useAccountCollateralUnlockDate } from '@snx-v3/useAccountCollateralUnlockDate';
import { AvailableCollateralRow, AvailableCollateralRowProps } from './AvailableCollateralRow';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import intlFormat from 'date-fns/intlFormat';
import { BorderBox } from '@snx-v3/BorderBox';

export function AvailableCollateralUi({
  accountCollaterals,
  timeToUnlock,
  unlockDateString,
  unlockDate,
  AvailableCollateralRow,
}: {
  accountCollaterals: AccountCollateralWithSymbol[];
  timeToUnlock?: string;
  unlockDateString?: string;
  unlockDate?: Date;
  AvailableCollateralRow: FC<AvailableCollateralRowProps>;
}) {
  if (accountCollaterals.length === 0) {
    return null;
  }

  return (
    <BorderBox p={4} mt={8} flexDir="column">
      {/* only render if there's any 'available collateral' */}
      <Heading fontSize="2xl" mb="2">
        Available Collateral
      </Heading>
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
            {timeToUnlock ? (
              <AlertDescription display="block">{timeToUnlock}</AlertDescription>
            ) : null}
          </Box>
        </Alert>
      </Flex>
      <Box overflowX="auto">
        <Table mt={8} size="sm" variant="unstyled" mb="9">
          <Thead sx={{ tr: { borderBottomColor: 'gray.900', borderBottomWidth: '1px' } }}>
            <Tr />
          </Thead>
          <Tbody sx={{ tr: { borderBottomColor: 'gray.900', borderBottomWidth: '1px' } }}>
            {accountCollaterals.map((accountCollateral) => (
              <AvailableCollateralRow
                key={accountCollateral.tokenAddress}
                accountCollateralUnlockDate={unlockDate}
                accountCollateral={accountCollateral}
              />
            ))}
          </Tbody>
        </Table>
      </Box>
    </BorderBox>
  );
}

export function AvailableCollateral() {
  const { accountId } = useParams();
  const accountCollaterals = useAccountCollateral({ accountId, includeDelegationOff: true });

  const accountCollateralUnlockDate = useAccountCollateralUnlockDate({ accountId });

  const formatTimeToUnlock = React.useCallback(() => {
    if (accountCollateralUnlockDate.isLoading) {
      return '—';
    }
    if (
      !accountCollateralUnlockDate.data ||
      accountCollateralUnlockDate.data.getTime() <= Date.now()
    ) {
      return undefined;
    }
    return formatDistanceToNow(accountCollateralUnlockDate.data, { addSuffix: true });
  }, [accountCollateralUnlockDate.data, accountCollateralUnlockDate.isLoading]);

  const [timeToUnlock, setTimeToUnlock] = React.useState(formatTimeToUnlock());
  React.useEffect(() => {
    const interval = setInterval(() => setTimeToUnlock(formatTimeToUnlock()), 1_000);
    return () => clearInterval(interval);
  }, [formatTimeToUnlock]);

  const unlockDateString = React.useMemo(() => {
    if (accountCollateralUnlockDate.isLoading) {
      return '—';
    }
    if (
      !accountCollateralUnlockDate.data ||
      accountCollateralUnlockDate.data.getTime() <= Date.now()
    ) {
      return undefined;
    }
    return intlFormat(accountCollateralUnlockDate.data, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  }, [accountCollateralUnlockDate.data, accountCollateralUnlockDate.isLoading]);

  return (
    <AvailableCollateralUi
      accountCollaterals={accountCollaterals.data || []}
      timeToUnlock={timeToUnlock}
      unlockDateString={unlockDateString}
      unlockDate={accountCollateralUnlockDate.data}
      AvailableCollateralRow={AvailableCollateralRow}
    />
  );
}
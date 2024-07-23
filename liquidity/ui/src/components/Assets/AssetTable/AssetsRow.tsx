import { Flex, Td, Tr, Text, Button, Fade, useDisclosure } from '@chakra-ui/react';
import { TokenIcon } from '../../TokenIcon';
import { formatNumberToUsd, formatNumber } from '@snx-v3/formatters';
import Wei from '@synthetixio/wei';
import { WithdrawModal } from '../../';
import { Tooltip } from '@snx-v3/Tooltip';
import { generatePath, useNavigate, useSearchParams } from 'react-router-dom';
import { useTimer } from 'react-timer-hook';
import { useWallet } from '@snx-v3/useBlockchain';

interface AssetsRowProps {
  token: string;
  name: string;
  walletBalance: number;
  walletBalance$: number;
  accountBalance: Wei;
  accountBalance$: number;
  lockedBalance: number;
  lockedBalance$: number;
  unlockDate?: Date;
  final: boolean; // Used for hiding bottom border
}

export const AssetsRow = ({
  token,
  name,
  walletBalance,
  walletBalance$,
  accountBalance,
  accountBalance$,
  lockedBalance,
  lockedBalance$,
  unlockDate,
  final,
}: AssetsRowProps) => {
  const { connect, activeWallet } = useWallet();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();
  const { minutes, hours, isRunning } = useTimer({
    expiryTimestamp: unlockDate || new Date(0),
    autoStart: unlockDate && new Date().getTime() < unlockDate?.getTime(),
  });

  return (
    <Tr borderBottomWidth={final ? 'none' : '1px'}>
      <Td border="none">
        <Fade in>
          <Flex alignItems="center">
            <TokenIcon symbol={token} />
            <Flex flexDirection="column" ml={3}>
              <Text color="white" fontWeight={700} lineHeight="1.25rem" fontFamily="heading">
                {token}
              </Text>
              <Text color="gray.500" fontFamily="heading" fontSize="0.75rem" lineHeight="1rem">
                {name}
              </Text>
            </Flex>
          </Flex>
        </Fade>
      </Td>
      <Td border="none">
        <Fade in>
          <Flex flexDirection="column" alignItems="flex-end">
            <Text
              color="white"
              fontWeight={700}
              lineHeight="1.25rem"
              fontFamily="heading"
              data-cy="asset-list-wallet-balance"
            >
              {formatNumberToUsd(walletBalance$)}
            </Text>
            <Text
              color="gray.500"
              fontFamily="heading"
              fontSize="0.75rem"
              lineHeight="1rem"
              data-cy="asset-wallet-balance"
            >
              {formatNumber(walletBalance)}
              {` ${token}`}
            </Text>
          </Flex>
        </Fade>
      </Td>
      <Td border="none">
        <Fade in>
          <Flex flexDirection="column" alignItems="flex-end">
            <Text
              color="white"
              fontWeight={700}
              lineHeight="1.25rem"
              fontFamily="heading"
              data-cy="asset-list-account-balance"
            >
              {formatNumberToUsd(accountBalance$)}
            </Text>
            <Text color="gray.500" fontFamily="heading" fontSize="0.75rem" lineHeight="1rem">
              {formatNumber(accountBalance.toNumber())}
              {` ${token}`}
            </Text>
          </Flex>
        </Fade>
      </Td>
      <Td border="none">
        <Fade in>
          <Flex flexDirection="column" alignItems="flex-end">
            <Text
              color="white"
              fontWeight={700}
              lineHeight="1.25rem"
              fontFamily="heading"
              data-cy="asset-list-locked-balance"
            >
              {formatNumberToUsd(lockedBalance$)}
            </Text>
            <Text color="gray.500" fontFamily="heading" fontSize="0.75rem" lineHeight="1rem">
              {formatNumber(lockedBalance)}
              {` ${token}`}
            </Text>
          </Flex>
        </Fade>
      </Td>
      <Td maxWidth="230px" border="none">
        <Flex justifyContent="space-between">
          {/* TODO: Update when multiple pools for LPing available */}
          <Fade in>
            <Button
              fontSize="0.75rem"
              lineHeight="1rem"
              height="1.75rem"
              w="100%"
              fontWeight={700}
              borderWidth="1px"
              borderColor="gray.900"
              borderRadius="4px"
              onClick={() => {
                if (activeWallet?.address) {
                  queryParams.set('manageAction', 'deposit');
                  navigate({
                    pathname: generatePath('/positions/:collateralSymbol/:poolId', {
                      poolId: '1',
                      collateralSymbol: token.toUpperCase(),
                    }),
                    search: queryParams.toString(),
                  });
                } else {
                  connect();
                }
              }}
              data-cy="assets-deposit-button"
            >
              {activeWallet?.address ? 'Deposit' : 'Connect'}
            </Button>
          </Fade>
          <Fade in>
            <Tooltip
              label={
                isRunning && accountBalance.gt(0) && `Withdrawal available in ${hours}H${minutes}M`
              }
            >
              <Button
                isDisabled={isRunning}
                variant="unstyled"
                fontSize="0.75rem"
                lineHeight="1rem"
                height="1.75rem"
                w="100%"
                px={4}
                fontWeight={700}
                borderWidth="1px"
                borderColor="gray.900"
                borderRadius="4px"
                _hover={{ bg: 'gray.900' }}
                onClick={onOpen}
              >
                {isRunning && accountBalance.gt(0)
                  ? `Withdraw in ${hours}H ${minutes}M`
                  : 'Withdraw'}
              </Button>
            </Tooltip>
          </Fade>
        </Flex>
        <WithdrawModal isOpen={isOpen} onClose={onClose} />
      </Td>
    </Tr>
  );
};

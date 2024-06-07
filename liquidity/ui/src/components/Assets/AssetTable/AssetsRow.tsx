import { Flex, Td, Tr, Text, Button, Fade, useDisclosure } from '@chakra-ui/react';
import { TokenIcon } from '../../TokenIcon';
import { formatNumberToUsd, formatNumber } from '@snx-v3/formatters';
import Wei from '@synthetixio/wei';
import { WithdrawModal } from '../../';
import { Tooltip } from '@snx-v3/Tooltip';
import { NavLink, generatePath } from 'react-router-dom';

interface AssetsRowProps {
  token: string;
  name: string;
  walletBalance: number;
  walletBalance$: number;
  accountBalance: Wei;
  accountBalance$: number;
  delegatedBalance: number;
  delegatedBalance$: number;
  unlockDate?: Date;
  final: boolean; // Used for hiding bottom border
  tokenAddress: string;
}

export const AssetsRow = ({
  token,
  name,
  walletBalance,
  walletBalance$,
  accountBalance,
  accountBalance$,
  delegatedBalance,
  delegatedBalance$,
  unlockDate = new Date(),
  final,
  tokenAddress,
}: AssetsRowProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const canWithdraw = unlockDate.getTime() < new Date().getTime();

  const hoursToWithdraw = canWithdraw
    ? ''
    : new Date(unlockDate.getDate() - new Date().getTime()).getHours();

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
              data-cy="asset-list-delegated-balance"
            >
              {formatNumberToUsd(delegatedBalance$)}
            </Text>
            <Text color="gray.500" fontFamily="heading" fontSize="0.75rem" lineHeight="1rem">
              {formatNumber(delegatedBalance)}
              {` ${token}`}
            </Text>
          </Flex>
        </Fade>
      </Td>
      <Td border="none">
        <Flex justifyContent="space-between">
          <Fade in>
            <Tooltip
              label={
                !canWithdraw &&
                accountBalance.gt(0) &&
                `Withdrawal available in ${hoursToWithdraw} hours`
              }
            >
              <Button
                isDisabled={!canWithdraw}
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
                Withdraw
              </Button>
            </Tooltip>
          </Fade>
          {/* TODO: Update when multiple pools for USDC LPing available */}
          <Fade in>
            <Button
              as={NavLink}
              fontSize="0.75rem"
              lineHeight="1rem"
              height="1.75rem"
              w="100%"
              fontWeight={700}
              borderWidth="1px"
              borderColor="gray.900"
              borderRadius="4px"
              to={{
                pathname: generatePath('/manage/:collateralSymbol/:collateralAddress/:poolId', {
                  poolId: '1',
                  collateralSymbol: 'USDC',
                  collateralAddress: tokenAddress,
                }),
                search: location.search,
              }}
              data-cy="assets-deposit-button"
            >
              Deposit
            </Button>
          </Fade>
        </Flex>
        <WithdrawModal isOpen={isOpen} onClose={onClose} />
      </Td>
    </Tr>
  );
};

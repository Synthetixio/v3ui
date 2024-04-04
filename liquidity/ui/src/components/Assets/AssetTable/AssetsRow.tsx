import { Flex, Td, Tr, Text, Button, Fade } from '@chakra-ui/react';
import { TokenIcon } from '../../TokenIcon';
import { formatNumberToUsd, formatNumber } from '@snx-v3/formatters';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface AssetsRowProps {
  token: string;
  name: string;
  walletBalance: number;
  walletBalance$: number;
  accountBalance: number;
  accountBalance$: number;
  delegatedBalance: number;
  delegatedBalance$: number;
  collateralAddress: string;
  final: boolean; // Used for hiding bottom border
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
  collateralAddress,
  final,
}: AssetsRowProps) => {
  const [queryParams] = useSearchParams();
  const navigate = useNavigate();
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
            <Text color="white" fontWeight={700} lineHeight="1.25rem" fontFamily="heading">
              {formatNumberToUsd(walletBalance$)}
            </Text>
            <Text color="gray.500" fontFamily="heading" fontSize="0.75rem" lineHeight="1rem">
              {formatNumber(walletBalance)}
              {` ${token}`}
            </Text>
          </Flex>
        </Fade>
      </Td>
      <Td border="none">
        <Fade in>
          <Flex flexDirection="column" alignItems="flex-end">
            <Text color="white" fontWeight={700} lineHeight="1.25rem" fontFamily="heading">
              {formatNumberToUsd(accountBalance$)}
            </Text>
            <Text color="gray.500" fontFamily="heading" fontSize="0.75rem" lineHeight="1rem">
              {formatNumber(accountBalance)}
              {` ${token}`}
            </Text>
          </Flex>
        </Fade>
      </Td>
      <Td border="none">
        <Fade in>
          <Flex flexDirection="column" alignItems="flex-end">
            <Text color="white" fontWeight={700} lineHeight="1.25rem" fontFamily="heading">
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
        <Fade in>
          <Flex flexDirection="column">
            {!walletBalance && !accountBalance && !delegatedBalance ? (
              <Button
                fontSize="0.75rem"
                lineHeight="1rem"
                height="1.75rem"
                fontWeight={700}
                borderWidth="1px"
                borderColor="gray.900"
                borderRadius="4px"
              >
                Deposit
              </Button>
            ) : (
              <Button
                variant="unstyled"
                fontSize="0.75rem"
                lineHeight="1rem"
                height="1.75rem"
                fontWeight={700}
                borderWidth="1px"
                borderColor="gray.900"
                borderRadius="4px"
                _hover={{ bg: 'gray.900' }}
                onClick={() => {
                  queryParams.set('tab', '0');
                  queryParams.set('tabAction', 'remove');
                  navigate({
                    pathname: `manage/${token}/${collateralAddress}/1`,
                    search: queryParams.toString(),
                  });
                }}
              >
                Withdraw
              </Button>
            )}
          </Flex>
        </Fade>
      </Td>
    </Tr>
  );
};

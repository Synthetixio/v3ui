import { Alert, AlertIcon, Button, Flex, Heading } from '@chakra-ui/react';
import { useAccounts } from '@snx-v3/useAccounts';
import { useWallet } from '@snx-v3/useBlockchain';
import { useParams } from '@snx-v3/useParams';
import { FC } from 'react';

export const WatchAccountBanner: FC = () => {
  const { activeWallet, connect } = useWallet();
  const { accountId } = useParams();
  const {
    data: accounts,
    isLoading: isAccountsLoading,
    isFetching: isAccountsFetching,
  } = useAccounts();

  if (!accountId) {
    return null;
  }

  if (!activeWallet) {
    return (
      <Alert colorScheme="blue" my="4">
        <AlertIcon />
        <Flex flex={1} gap={4} alignItems="center" justifyContent="space-between">
          <div>
            <Heading fontSize="16px">You are currently watching Account #{accountId}</Heading>
            <Heading fontSize="14px">
              Please connect your wallet too open, manage or view positions.
            </Heading>
          </div>
          <Button onClick={() => connect()}>Connect Wallet</Button>
        </Flex>
      </Alert>
    );
  }

  if (
    !isAccountsFetching &&
    !isAccountsLoading &&
    accounts &&
    !accounts.find((a) => a === accountId)
  ) {
    return (
      <Alert colorScheme="blue" my="4">
        <AlertIcon />
        <Flex>
          <Heading fontSize="16px">You are currently watching Account #{accountId}</Heading>
        </Flex>
      </Alert>
    );
  }

  return null;
};

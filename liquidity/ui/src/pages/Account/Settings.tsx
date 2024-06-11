import { Helmet } from 'react-helmet';
import { Flex, Heading } from '@chakra-ui/react';
import Permissions from '../../components/Permissions/Permissions';
import { useIsConnected } from '@snx-v3/useBlockchain';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAccounts } from '@snx-v3/useAccounts';

export function Settings() {
  const navigate = useNavigate();
  const isConnected = useIsConnected();
  const {
    data: accounts,
    isLoading: isAccountsLoading,
    isFetching: isAccountsFetching,
  } = useAccounts();

  useEffect(() => {
    if (!isConnected) {
      navigate('/');
    }
  }, [isConnected, navigate]);

  useEffect(() => {
    if (!isAccountsLoading && !isAccountsFetching && !accounts?.length) {
      navigate('/');
    }
  }, [accounts?.length, isAccountsFetching, isAccountsLoading, isConnected, navigate]);

  return (
    <>
      <Helmet>
        <title>Account Settings</title>
        <meta name="description" content="Account Settings" />
      </Helmet>
      <Flex flexDir="column" mb={16}>
        <Heading
          mt={{
            base: 2,
            sm: 8,
          }}
          mb={6}
          color="gray.50"
          fontSize="1.5rem"
          data-cy="liquidity-dashboard"
        >
          Account Settings
        </Heading>
        <Permissions />
      </Flex>
    </>
  );
}

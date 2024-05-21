import { Helmet } from 'react-helmet';
import { Flex, Heading } from '@chakra-ui/react';
import Permissions from '../../components/Permissions/Permissions';

export function Settings() {
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
            sm: 10,
          }}
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

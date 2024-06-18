import { Button, Flex, FlexProps, Heading } from '@chakra-ui/react';
import { useAccounts, useCreateAccount } from '@snx-v3/useAccounts';
import { FC } from 'react';

export const AccountBanner: FC<FlexProps> = (props) => {
  const {
    data: accounts,
    isLoading: isAccountsLoading,
    isFetching: isAccountsFetching,
  } = useAccounts();
  const {
    mutation: { mutate: createAccount, isPending: isCreateAccountLoading },
  } = useCreateAccount();

  if (!isAccountsFetching && !isAccountsLoading && accounts && accounts.length === 0) {
    return (
      <Flex
        mt={4}
        flexGrow="1"
        h="fit-content"
        border="1px solid"
        borderColor="gray.900"
        rounded="base"
        width="100%"
        px="6"
        py="8"
        bg="navy.700"
        alignItems="center"
        justifyContent="space-between"
        {...props}
      >
        <Heading fontSize="18px">Create an account to deposit liquidity</Heading>
        <Button onClick={() => createAccount()} isLoading={isCreateAccountLoading}>
          Create Account
        </Button>
      </Flex>
    );
  }

  return null;
};

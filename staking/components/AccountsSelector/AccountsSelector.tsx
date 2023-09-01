// import { CheckIcon } from '@chakra-ui/icons';
import { Button, Fade, Skeleton, Text, useClipboard } from '@chakra-ui/react';
// import { createSearchParams, generatePath, Link as RouterLink } from 'react-router-dom';
import { prettyString } from '@snx-v3/format';
import { useAccounts, useCreateAccount } from '@snx-v3/useAccounts';
import { useParams } from '@snx-v3/useParams';

// function AccountMenuItem({ accountId }: { accountId: string }) {
//   const params = useParams();

//   return (
//     <RouterLink
//       to={{
//         pathname: generatePath('/'),
//         search: accountId ? createSearchParams({ accountId }).toString() : '',
//       }}
//     >
//       <MenuItem
//         _hover={{ bg: 'whiteAlpha.200' }}
//         _focus={{ bg: 'whiteAlpha.200' }}
//         _active={{ bg: 'whiteAlpha.200' }}
//       >
//         <Flex width="100%" alignItems="center">
//           {params.accountId === accountId && <CheckIcon marginRight={1} />}
//           {accountId}
//         </Flex>
//       </MenuItem>
//     </RouterLink>
//   );
// }

interface AccountsSelectorUiProps {
  isLoading: boolean;
  accountId?: string;
  createAccount: () => void;
}

export function AccountsSelectorUi({
  accountId,
  isLoading,
  createAccount,
}: AccountsSelectorUiProps) {
  const { onCopy } = useClipboard(accountId || '');

  return (
    <>
      {isLoading ? (
        <Skeleton startColor="whiteAlpha.500" endColor="whiteAlpha.200">
          <Text>Loading...</Text>
        </Skeleton>
      ) : (
        <Fade in={!isLoading}>
          <Button
            size="sm"
            borderRadius="4px"
            height="40px"
            as={Button}
            variant="outline"
            w="100%"
            maxW="180px"
            h="36px"
            data-testid="current account id"
            data-account-id={accountId}
            onClick={accountId ? onCopy : () => createAccount()}
          >
            {`${accountId ? `Account #${prettyString(accountId, 3, 3)}` : 'Create Account'} `}
          </Button>
        </Fade>
      )}
    </>
    // Temporarily disable account selector menu
    // <Menu>
    //   <MenuList fontSize="xs" bg="black" h="36px" py={0} border="1px solid rgba(255,255,255,0.33)">
    //       <Button size="sm" as={Button} variant="outline" w="100%" maxW="180px" h="36px">
    //     {`Account #${prettyString(params.accountId, 3, 3)}`}
    //   </Button>
    //     {accounts.map((accountId) => (
    //       <AccountMenuItem key={accountId} accountId={accountId} />
    //     ))}
    //     <Link
    //       as={RouterLink}
    //       to="/accounts/create"
    //       _focus={{ boxShadow: 'none' }}
    //       _hover={{ textDecoration: 'none' }}
    //     >
    //       <MenuItem
    //         _hover={{ bg: 'whiteAlpha.200' }}
    //         _focus={{ bg: 'whiteAlpha.200' }}
    //         _active={{ bg: 'whiteAlpha.200' }}
    //         height="100%"
    //       >
    //         <Text fontWeight="semibold" px="2">
    //           Create new account
    //         </Text>
    //       </MenuItem>
    //     </Link>
    //   </MenuList>
    // </Menu>
  );
}

export function AccountsSelector() {
  const params = useParams();

  const {
    data: accounts,
    isLoading: isAccountsLoading,
    isFetching: isAccountsFetching,
  } = useAccounts();

  const { mutate: createAccount, isLoading: isCreateAccountLoading } = useCreateAccount();

  const isLoading = isAccountsLoading || isAccountsFetching || isCreateAccountLoading || !accounts;

  // If we create an account, use it
  // If the account in params exists in the accounts list, use it
  // If not use the first account in the list
  // If there are no accounts, use undefined
  const accountId = accounts?.includes(params?.accountId || '') ? params.accountId : accounts?.[0];

  return (
    <AccountsSelectorUi isLoading={isLoading} createAccount={createAccount} accountId={accountId} />
  );
}

import {
  Button,
  Fade,
  Menu,
  MenuList,
  Skeleton,
  Text,
  useClipboard,
  MenuItem,
  Flex,
  MenuButton,
} from '@chakra-ui/react';
import {
  createSearchParams,
  generatePath,
  Link as RouterLink,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { prettyString } from '@snx-v3/format';
import { useAccounts, useCreateAccount } from '@snx-v3/useAccounts';
import { useParams } from '@snx-v3/useParams';
import { useAccountUrlSync } from '@snx-v3/useAccounts';
import { CheckIcon } from '@snx-v3/Multistep';
import { useEffect } from 'react';

function AccountMenuItem({ accountId }: { accountId: string }) {
  const params = useParams();

  return (
    <RouterLink
      to={{
        pathname: generatePath('/'),
        search: accountId ? createSearchParams({ accountId }).toString() : '',
      }}
    >
      <MenuItem
        _hover={{ bg: 'whiteAlpha.200' }}
        _focus={{ bg: 'whiteAlpha.200' }}
        _active={{ bg: 'whiteAlpha.200' }}
      >
        <Flex width="100%" alignItems="center">
          {params.accountId === accountId && <CheckIcon marginRight={1} />}
          {accountId}
        </Flex>
      </MenuItem>
    </RouterLink>
  );
}

interface AccountsSelectorUiProps {
  isLoading: boolean;
  accountId?: string;
  createAccount: () => void;
  accounts?: string[] | undefined;
}

export function AccountsSelectorUi({
  accountId,
  isLoading,
  createAccount,
  accounts,
}: AccountsSelectorUiProps) {
  const { onCopy } = useClipboard(accountId || '');

  return (
    <>
      {/* // Temporarily disable account selector menu */}
      <Menu>
        {isLoading ? (
          <Skeleton startColor="whiteAlpha.500" endColor="whiteAlpha.200">
            <Text>Loading...</Text>
          </Skeleton>
        ) : (
          <Fade in={!isLoading}>
            <MenuButton
              size="sm"
              borderRadius="4px"
              height="40px"
              as={Button}
              variant="outline"
              w="100%"
              maxW="180px"
              data-testid="current account id"
              data-account-id={accountId}
              onClick={accountId ? onCopy : createAccount}
            >
              {`${accountId ? `Account #${prettyString(accountId, 3, 3)}` : 'Create Account'} `}
            </MenuButton>
          </Fade>
        )}

        {!!accounts?.length && (
          <MenuList fontSize="xs" bg="black" py={0} border="1px solid rgba(255,255,255,0.33)">
            {accounts?.map((accountId) => (
              <AccountMenuItem key={accountId} accountId={accountId} />
            ))}

            <MenuItem
              _hover={{ bg: 'whiteAlpha.200' }}
              _focus={{ bg: 'whiteAlpha.200' }}
              _active={{ bg: 'whiteAlpha.200' }}
              onClick={createAccount}
            >
              <Text fontWeight="semibold" px="2">
                Create new account
              </Text>
            </MenuItem>
          </MenuList>
        )}
      </Menu>
    </>
  );
}

export function AccountsSelector() {
  const params = useParams();

  const {
    data: accounts,
    isLoading: isAccountsLoading,
    isFetching: isAccountsFetching,
  } = useAccounts();

  const {
    mutation: { mutate: createAccount, isPending: isCreateAccountLoading, data: createAccountData },
  } = useCreateAccount();

  const navigate = useNavigate();
  const location = useLocation();

  useAccountUrlSync();

  const isLoading = isAccountsLoading || isAccountsFetching || isCreateAccountLoading || !accounts;

  useEffect(() => {
    // If we create an account, use it
    // If the account in params exists in the accounts list, use it
    // If not use the first account in the list
    // If there are no accounts, use undefined
    const accountId = createAccountData
      ? createAccountData[0]
      : accounts?.includes(params?.accountId || '')
        ? params.accountId
        : accounts?.[0];

    const queryParams = new URLSearchParams(location.search);

    if (accountId) {
      queryParams.set('accountId', accountId);
    }

    navigate(
      {
        pathname: location.pathname,
        search: queryParams.toString(),
      },
      { replace: true }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createAccountData]);

  return (
    <AccountsSelectorUi
      isLoading={isLoading}
      createAccount={createAccount}
      accountId={params.accountId}
      accounts={accounts}
    />
  );
}

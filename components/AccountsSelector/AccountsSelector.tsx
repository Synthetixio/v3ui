import { CheckIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Flex, Link, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { generatePath, Link as RouterLink, useParams } from 'react-router-dom';
import { prettyString } from '@snx-v3/format';
import { useAccounts } from '@snx-v3/useAccounts';

function AccountMenuItem({ accountId }: { accountId: string }) {
  const params = useParams();
  return (
    <RouterLink to={generatePath('/accounts/:accountId', { accountId })}>
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

export function AccountsSelector() {
  const params = useParams();
  const { data: accounts = [] } = useAccounts();

  if (!params.accountId) {
    return null;
  }

  return (
    <Menu>
      <MenuButton
        size="sm"
        as={Button}
        variant="outline"
        rightIcon={<ChevronDownIcon />}
        w="100%"
        maxW="180px"
      >
        {`Account #${prettyString(params.accountId, 3, 3)}`}
      </MenuButton>
      <MenuList fontSize="xs" px="2" bg="black" border="1px solid rgba(255,255,255,0.33)">
        {accounts.map((accountId) => (
          <AccountMenuItem key={accountId} accountId={accountId} />
        ))}
        <MenuItem
          _hover={{ bg: 'whiteAlpha.200' }}
          _focus={{ bg: 'whiteAlpha.200' }}
          _active={{ bg: 'whiteAlpha.200' }}
        >
          <Link
            as={RouterLink}
            to="/accounts/create"
            _focus={{ boxShadow: 'none' }}
            _hover={{ textDecoration: 'none' }}
            fontWeight="semibold"
          >
            Create new account
          </Link>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

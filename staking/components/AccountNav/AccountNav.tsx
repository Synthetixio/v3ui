import { ChevronLeftIcon, SettingsIcon } from '@chakra-ui/icons';
import { Flex, Link } from '@chakra-ui/react';
import { useParams } from '@snx-v3/useParams';
import {
  createSearchParams,
  generatePath,
  Link as RouterLink,
  useMatch,
  useLocation,
} from 'react-router-dom';

export function AccountNav() {
  const params = useParams();
  const innerPage = !useMatch('/');
  const location = useLocation();

  return (
    <Flex alignItems="center" mb="10">
      {innerPage ? (
        <Link
          as={RouterLink}
          to={{
            pathname: generatePath('/'),
            search: params.accountId
              ? createSearchParams({ accountId: params.accountId }).toString()
              : '',
          }}
          fontSize="xs"
          fontWeight="normal"
          color="cyan.500"
          _hover={{ textDecoration: 'none' }}
        >
          <ChevronLeftIcon transform="translateY(-1px)" /> Account Overview
        </Link>
      ) : null}

      {!innerPage && params.accountId ? (
        <Link
          as={RouterLink}
          to={{
            pathname: generatePath('/settings', {
              accountId: params.accountId,
            }),
            search: location.search,
          }}
          ml="auto"
          fontSize="xs"
          fontWeight="normal"
          color="cyan.500"
          _hover={{ textDecoration: 'none' }}
        >
          <SettingsIcon transform="translateY(-1px)" />
          &nbsp;&nbsp;Account Settings
        </Link>
      ) : null}
    </Flex>
  );
}

import { Box, Container, Flex, Link, useDisclosure } from '@chakra-ui/react';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
import { NetworkController } from './NetworkController';
import { useEffect } from 'react';
import { Logo, LogoIcon } from '@snx-v3/icons';
import { useTokenBalance } from '@snx-v3/useTokenBalance';
import { useNetwork } from '@snx-v3/useBlockchain';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { Balance } from '../../components';
import { useGetUSDTokens } from '@snx-v3/useGetUSDTokens';

export default function Header() {
  const { onClose } = useDisclosure();
  const location = useLocation();
  const { network } = useNetwork();

  const isBase = isBaseAndromeda(network?.id, network?.preset);
  const { data: usdTokens } = useGetUSDTokens();
  const { data: balance } = useTokenBalance(isBase ? usdTokens?.USDC : usdTokens?.sUSD);

  useEffect(() => {
    onClose();
  }, [location, onClose]);

  return (
    <Flex bg="navy.700" mb="4" py="3" borderBottomWidth="1px" borderBottomColor="gray.900" px="10">
      <Container maxW="1024px" as={Flex} justifyContent="space-between" alignItems="center">
        <Flex
          display={{ base: 'none', md: 'inline-block' }}
          flexDirection="row"
          justifyContent="space-between"
        >
          <Link
            to={{
              pathname: '/',
              search: location.search,
            }}
            as={RouterLink}
            py={4}
          >
            <Logo />
          </Link>
          <Link
            ml={6}
            as={RouterLink}
            to={{
              pathname: '/',
              search: location.search,
            }}
            fontWeight={700}
            fontSize="14px"
            display="inline"
            px={3}
            py={2.5}
            textDecoration="none"
            color="gray.500"
            _hover={{ textDecoration: 'none' }}
            _activeLink={{ color: 'white' }}
          >
            Dashboard
          </Link>
          <Link
            ml={2.5}
            as={RouterLink}
            to={{
              pathname: '/pools',
              search: location.search,
            }}
            fontWeight={700}
            fontSize="14px"
            display="inline"
            textDecoration="none"
            px={3}
            py={2.5}
            color="gray.500"
            _hover={{ textDecoration: 'none' }}
            _activeLink={{ color: 'white' }}
          >
            Pools
          </Link>
        </Flex>
        <Box display={{ md: 'none' }}>
          <Link to="/" as={RouterLink} py={4} pr={2}>
            <LogoIcon />
          </Link>
        </Box>
        <Flex gap={3} flexWrap="wrap-reverse" justifyContent="center" alignItems="center">
          <Balance isBase={isBase} balance={balance} />
          <NetworkController />
        </Flex>
      </Container>
    </Flex>
  );
}

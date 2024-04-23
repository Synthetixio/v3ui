import { Box, Container, Flex, Link, Text, useDisclosure } from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { NetworkController } from './NetworkController';
import { useEffect } from 'react';
import { Logo, LogoIcon } from '@snx-v3/icons';
import { useTokenBalance } from '@snx-v3/useTokenBalance';
import { useNetwork } from '@snx-v3/useBlockchain';
import { getUSDCAddress, getsUSDCAddress, isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { TokenIcon } from '../../components/TokenIcon';

export default function Header() {
  const { onClose } = useDisclosure();
  const location = useLocation();
  const { network } = useNetwork();
  const isBase = isBaseAndromeda(network?.id, network?.preset);
  const { data: balance } = useTokenBalance(
    isBase ? getUSDCAddress(network?.id) : getsUSDCAddress(network?.id)
  );

  useEffect(() => {
    onClose();
  }, [location, onClose]);

  return (
    <>
      <Flex mb="8" py="4" bg="navy.900" borderBottomWidth="1px" borderBottomColor="gray.900">
        <Container maxW="1024px" as={Flex} justifyContent="space-between" alignItems="center">
          <Box display={{ base: 'none', md: 'inline-block' }}>
            <Link
              to={{
                pathname: '/',
              }}
              as={RouterLink}
              py={4}
              pr={2}
            >
              <Logo />
            </Link>
          </Box>
          <Box display={{ md: 'none' }}>
            <Link to="/" as={RouterLink} py={4} pr={2}>
              <LogoIcon />
            </Link>
          </Box>
          <Flex justifyContent="center" alignItems="center">
            {balance && (
              <Flex
                border="1px solid"
                borderColor="gray.900"
                p="2"
                rounded="base"
                h="40px"
                alignItems="center"
                mr="2"
              >
                <TokenIcon symbol={isBase ? 'USDC' : 'sUSD'} width={24} height={24} />
                <Text fontSize="14px" fontWeight={600} ml="2">
                  {balance?.toNumber().toFixed(2)}
                </Text>
              </Flex>
            )}

            <NetworkController />
          </Flex>
        </Container>
      </Flex>
    </>
  );
}

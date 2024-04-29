import { Box, Button, Divider, Flex, Image, Text, useColorMode } from '@chakra-ui/react';
import { useIsConnected, useNetwork, useWallet } from '@snx-v3/useBlockchain';
import { shortAddress } from '../utils/addresses';
import { NetworkSelect } from './NetworkSelect';
import { useTokenBalance } from '@snx-v3/useTokenBalance';
import { useEffect } from 'react';

export function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { network, setNetwork } = useNetwork();
  const isWalletConnected = useIsConnected();
  const { activeWallet, connect, disconnect, walletsInfo } = useWallet();
  const { data: snxBalance } = useTokenBalance('0x22e6966B799c4D5B13BE962E1D117b56327FDa66');

  useEffect(() => {
    if (colorMode === 'light') {
      toggleColorMode();
    }
  }, [colorMode, toggleColorMode]);

  return (
    <Flex as="header" p="2" flexDir="column" w="100%" gap="2">
      <Flex w="100%" justifyContent="space-between" alignItems="center" px="5">
        <Image src="/snx.svg" />
        <Flex alignItems="center" gap="2">
          <Box
            border="1px solid"
            borderColor="gray.900"
            px="3"
            py="2"
            rounded="base"
            display="flex"
            gap="2"
            alignItems="center"
          >
            <Image src="/snx-small.svg" />
            <Text fontSize="14px" fontWeight={600}>
              {snxBalance ? snxBalance?.toNumber().toFixed(2) : '-'}
            </Text>
          </Box>
          {isWalletConnected && (
            <NetworkSelect
              id={network?.id || ''}
              name={network.name}
              setNetwork={(netowork) => setNetwork(netowork.id)}
            />
          )}

          {isWalletConnected ? (
            <Button
              variant="outline"
              colorScheme="gray"
              onClick={() => {
                if (walletsInfo) {
                  disconnect({ label: walletsInfo.label });
                }
              }}
            >
              {shortAddress(activeWallet?.address || '')}
            </Button>
          ) : (
            <Button onClick={() => connect()}>Connect Wallet</Button>
          )}
        </Flex>
      </Flex>
      <Divider borderColor="gray.900" />
    </Flex>
  );
}

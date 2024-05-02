import { Box, Button, Divider, Flex, Hide, Image, Text, useColorMode } from '@chakra-ui/react';
import { useIsConnected, useNetwork, useWallet } from '@snx-v3/useBlockchain';
import { useTokenBalance } from '@snx-v3/useTokenBalance';
import { useEffect } from 'react';
import { shortAddress } from '../utils/addresses';
import { NetworkSelect } from './NetworkSelect';
import snxSmallSvg from './svgs/snx-small.svg';
import snxSvg from './svgs/snx.svg';
import snxHeaderMobileSvg from './svgs/snx-header-mobile.svg';

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
      <Flex w="100%" justifyContent="space-between" alignItems="center" px={{ base: 4, xl: 5 }}>
        <Hide above="xl">
          <Image src={snxHeaderMobileSvg} />
        </Hide>
        <Hide below="xl">
          <Image src={snxSvg} />
        </Hide>

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
            <Image src={snxSmallSvg} />
            <Text fontSize="14px" fontWeight={600}>
              {snxBalance ? snxBalance?.toNumber().toFixed(2) : '-'}
            </Text>
          </Box>
          <NetworkSelect
            id={network?.id || ''}
            name={network?.name || ''}
            setNetwork={(netowork) => setNetwork(netowork.id)}
          />
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

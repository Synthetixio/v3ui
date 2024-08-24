import { Button, Flex, useColorMode, Show, Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import PeriodCountdown from '../PeriodCountdown/PeriodCountdown';
import councils from '../../utils/councils';
import { useWallet } from '../../queries/useWallet';
import { NetworkController } from './NetworkController';
import { SNXHeaderIcon, SNXHeaderIconSmall } from '../Icons';

export function Header() {
  const navigate = useNavigate();

  const { activeWallet, walletsInfo, connect } = useWallet();
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    if (colorMode === 'light') {
      toggleColorMode();
    }
  }, [colorMode, toggleColorMode]);

  useEffect(() => {
    // Check if wallet preference is stored in local storage
    if (!walletsInfo) {
      const defaultWallet = localStorage.getItem('connectedWallets');

      if (defaultWallet) {
        connect({
          autoSelect: { disableModals: true, label: JSON.parse(defaultWallet) },
        });
      }
    }

    if (walletsInfo) {
      // store in local storage
      localStorage.setItem('connectedWallets', JSON.stringify(walletsInfo.label));
    }
  }, [walletsInfo, connect]);

  return (
    <Flex
      as="header"
      bg="navy.700"
      h="65px"
      alignItems="center"
      px={{ base: '4', md: 6 }}
      py={{ base: '4' }}
      borderBottomWidth="1px"
      borderStyle="solid"
      borderBottomColor="gray.900"
      justifyContent="center"
    >
      <Flex maxW="1440px" w="100%" alignItems="center">
        <Flex cursor="pointer" onClick={() => navigate('/')} mr="auto" alignItems="center">
          <SNXHeaderIconSmall />
          <Show above="md">
            <SNXHeaderIcon />
          </Show>
        </Flex>
        <Link href="/#/admin">Admin</Link>
        <PeriodCountdown council={councils[0].slug} />
        {activeWallet && <NetworkController />}

        {!activeWallet && (
          <Button onClick={() => connect()} ml="2" data-cy="connect-wallet-button">
            Connect Wallet
          </Button>
        )}
      </Flex>
    </Flex>
  );
}

import { useEffect } from 'react';
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuOptionGroup,
  Switch,
  Text,
} from '@chakra-ui/react';
import { ChevronDown, ChevronUp, WalletIcon } from '@snx-v3/icons';
import { NetworkIcon, useNetwork, useWallet } from '@snx-v3/useBlockchain';
import { prettyString } from '@snx-v3/format';

import { networks } from '../../utils/onboard';
import { useLocalStorage } from '../../hooks';
import { LOCAL_STORAGE_KEYS } from '../../utils/constants';

export function NetworkController() {
  const { activeWallet, walletsInfo, connect, disconnect } = useWallet();
  const { network: activeNetwork, setNetwork } = useNetwork();

  const [showTestnets, setShowTestnets] = useLocalStorage(LOCAL_STORAGE_KEYS.SHOW_TESTNETS, false);

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

  const onDisconnect = () => {
    if (walletsInfo) {
      disconnect(walletsInfo);
      localStorage.removeItem('connectedWallets');
    }
  };

  return (
    <Flex>
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              as={Button}
              variant="outline"
              colorScheme="gray"
              sx={{ '> span': { display: 'flex', alignItems: 'center' } }}
              mr={1}
            >
              <NetworkIcon networkId={activeNetwork?.id || 666} />
              <Text
                variant="nav"
                fontSize="sm"
                fontWeight={700}
                ml={1.5}
                mr={2}
                display={{ base: 'none', md: 'initial' }}
              >
                {activeNetwork?.label || 'Not Connected'}
              </Text>
              <Flex display={{ base: 'none', md: 'initial' }}>
                {isOpen ? <ChevronUp color="cyan" /> : <ChevronDown color="cyan.500" />}
              </Flex>
            </MenuButton>
            <MenuList>
              {networks.map(({ id, label }) => {
                if ((id === 84532 || id === 11155111 || id === 421614) && !showTestnets)
                  return null;
                return (
                  <MenuItem key={`${id}`} onClick={() => setNetwork(id)}>
                    <NetworkIcon networkId={id} />
                    <Text variant="nav" ml={2}>
                      {label}
                    </Text>
                  </MenuItem>
                );
              })}
              <MenuOptionGroup>
                <Flex py={4} px={3} alignItems="center" justifyContent="space-between">
                  <Text fontSize="14px" fontFamily="heading" lineHeight="20px">
                    Show Testnets
                  </Text>
                  <Switch
                    mr={2}
                    size="sm"
                    color="gray.900"
                    colorScheme="gray"
                    isChecked={showTestnets}
                    onChange={() => setShowTestnets(!showTestnets)}
                  />
                </Flex>
              </MenuOptionGroup>
            </MenuList>
          </>
        )}
      </Menu>
      {activeWallet ? (
        <Menu>
          <MenuButton
            as={Button}
            variant="outline"
            colorScheme="gray"
            ml={2}
            height={10}
            py="6px"
            px="9.5px"
            whiteSpace="nowrap"
          >
            <WalletIcon />
            <Text
              as="span"
              ml={1}
              color="whiteAlpha.800"
              fontWeight={700}
              fontSize="xs"
              userSelect="none"
            >
              {activeWallet.ens?.name || prettyString(activeWallet.address)}
            </Text>
          </MenuButton>
          <MenuList>
            <MenuItem
              onClick={() => {
                try {
                  navigator.clipboard.writeText(activeWallet?.address);
                } catch (_e) {}
              }}
            >
              <Text variant="nav" ml={2}>
                Copy address
              </Text>
            </MenuItem>
            <MenuItem onClick={onDisconnect}>
              <Text variant="nav" ml={2}>
                Disconnect
              </Text>
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Button
          onClick={() => connect()}
          type="button"
          size="sm"
          ml={2}
          py={5}
          data-testid="connect-wallet-button"
        >
          Connect Wallet
        </Button>
      )}
    </Flex>
  );
}

import { Button, Flex, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { ChevronDown, ChevronUp, WalletIcon } from '@snx-v3/icons';
import { NetworkIcon, useNetwork, useWallet } from '@snx-v3/useBlockchain';
import { prettyString } from '@snx-v3/format';
import { useConnectWallet } from '@web3-onboard/react';
import { networks } from '../../utils/onboard';

export function NetworkController() {
  const { network: activeNetwork, setNetwork } = useNetwork();
  const { activeWallet, walletsInfo } = useWallet();
  const [_, connect, disconnect] = useConnectWallet();

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
                return (
                  <MenuItem key={`${id}`} onClick={() => setNetwork(id)}>
                    <NetworkIcon networkId={id} />
                    <Text variant="nav" ml={2}>
                      {label}
                    </Text>
                  </MenuItem>
                );
              })}
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
            <MenuItem onClick={() => disconnect({ label: walletsInfo.label })}>
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

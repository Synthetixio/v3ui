import { useEffect } from 'react';
import {
  Badge,
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
import { CopyIcon } from '@chakra-ui/icons';
import { useAccounts, useCreateAccount } from '@snx-v3/useAccounts';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

export function NetworkController() {
  const { activeWallet, walletsInfo, connect, disconnect } = useWallet();
  const { network: activeNetwork, setNetwork } = useNetwork();
  const { data: accounts } = useAccounts();
  const { mutation } = useCreateAccount();
  const [showTestnets, setShowTestnets] = useLocalStorage(LOCAL_STORAGE_KEYS.SHOW_TESTNETS, false);
  const [queryParams] = useSearchParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

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
              data-cy="account-menu-button"
            >
              <NetworkIcon networkId={activeNetwork?.id || 666} />
              <Text
                variant="nav"
                fontSize="sm"
                fontWeight={700}
                ml={1.5}
                mr={2}
                display={{ base: 'none', md: 'initial' }}
                data-cy="current-selected-network"
              >
                {activeNetwork?.label || 'Not Connected'}
              </Text>
              <Flex display={{ base: 'none', md: 'initial' }}>
                {isOpen ? <ChevronUp color="cyan" /> : <ChevronDown color="cyan.500" />}
              </Flex>
            </MenuButton>
            <MenuList>
              {networks.map(({ id, label }) => {
                if ((id === 84532 || id === 11155111) && !showTestnets) return null;
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
              data-cy="header-wallet-address-display"
            >
              {activeWallet.ens?.name || prettyString(activeWallet.address)}
            </Text>
          </MenuButton>
          <MenuList>
            <Flex
              border="1px solid"
              rounded="base"
              borderColor="gray.900"
              w="370px"
              _hover={{ bg: 'navy.700' }}
              backgroundColor="navy.700"
              opacity={1}
              p="4"
            >
              <Flex flexDir="column" w="100%" gap="2">
                <Flex justifyContent="space-between">
                  <Text>Connected with {walletsInfo?.label}</Text>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDisconnect();
                    }}
                    size="xs"
                    variant="outline"
                    colorScheme="gray"
                    color="white"
                  >
                    Disconenct
                  </Button>
                </Flex>
                <Text fontWeight={700} color="white" fontSize="16px">
                  {prettyString(activeWallet.address)}{' '}
                  <CopyIcon
                    ml="2"
                    onClick={() => {
                      navigator.clipboard.writeText(activeWallet.address);
                    }}
                  />
                </Text>
                <Flex
                  flexDir="column"
                  p="2"
                  border="1px solid"
                  borderColor="gray.900"
                  rounded="base"
                  gap="2"
                >
                  <Text mb="4" fontWeight={400} fontSize="14px">
                    Account
                  </Text>
                  {accounts?.map((account) => (
                    <Text
                      key={account}
                      display="flex"
                      alignItems="center"
                      color="white"
                      fontWeight={700}
                      fontSize="16px"
                      cursor="pointer"
                      _hover={{ bg: 'whiteAlpha.300' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        queryParams.set('accountId', account);
                        navigate({ pathname, search: queryParams.toString() });
                      }}
                    >
                      #{prettyString(account, 10, 10)}{' '}
                      {queryParams.get('accountId') === account && (
                        <Badge colorScheme="cyan" variant="outline" ml="1">
                          Connected
                        </Badge>
                      )}
                    </Text>
                  ))}
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      mutation.mutate();
                    }}
                    size="xs"
                    variant="outline"
                    mt="4"
                    colorScheme="gray"
                    color="white"
                    leftIcon={
                      <svg
                        width="8"
                        height="8"
                        viewBox="0 0 8 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.5 3.5V0.5H4.5V3.5H7.5V4.5H4.5V7.5H3.5V4.5H0.5V3.5H3.5Z"
                          fill="white"
                        />
                      </svg>
                    }
                    w="130px"
                    data-cy="create-new-account-menu-item"
                  >
                    Create Account
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </MenuList>
        </Menu>
      ) : (
        <Button
          data-cy="header-connect-wallet"
          onClick={() => connect()}
          type="button"
          size="sm"
          ml={2}
          py={5}
        >
          Connect Wallet
        </Button>
      )}
    </Flex>
  );
}

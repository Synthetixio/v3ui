import { useEffect, useState } from 'react';
import {
  Button,
  Divider,
  Flex,
  IconButton,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuOptionGroup,
  Switch,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { NetworkIcon, useNetwork, useWallet, NETWORKS } from '@snx-v3/useBlockchain';
import { prettyString } from '@snx-v3/format';
import { useLocalStorage } from '@snx-v3/useLocalStorage';
import { CopyIcon } from '@chakra-ui/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tooltip } from '@snx-v3/Tooltip';
import { supportedNetworks } from '../../utils/onboard';
import { DisconnectIcon } from '../Icons';
import Blockies from 'react-blockies';
import '../../pages/index.css';
import { useGetUserDetailsQuery } from '../../queries';

const mainnets = NETWORKS.filter(({ isSupported, isTestnet }) => isSupported && !isTestnet).filter(
  (network) => supportedNetworks.includes(network.id)
);
const testnets = NETWORKS.filter(({ isTestnet }) => isTestnet).filter((network) =>
  supportedNetworks.includes(network.id)
);

export function NetworkController() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [toolTipLabel, setTooltipLabel] = useState('Copy');
  const { activeWallet, walletsInfo, connect, disconnect } = useWallet();
  const { network: activeNetwork, setNetwork } = useNetwork();
  const [showTestnets, setShowTestnets] = useLocalStorage('governance-show-testnets', false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { data: user } = useGetUserDetailsQuery(activeWallet?.address);

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
  }, [walletsInfo, connect, navigate, pathname]);

  const onDisconnect = () => {
    if (walletsInfo) {
      disconnect(walletsInfo);
      localStorage.removeItem('connectedWallets');
    }
  };

  const notConnected = !activeWallet;
  const notSupported = activeWallet && !activeNetwork;

  return (
    <Flex ml="2">
      <Menu>
        <MenuButton
          as={Button}
          variant="outline"
          colorScheme="gray"
          sx={{ '> span': { display: 'flex', alignItems: 'center' } }}
          mr={1}
          data-cy="account-menu-button"
          px={2}
        >
          <NetworkIcon
            filter={activeNetwork?.isTestnet ? 'grayscale(1)' : ''}
            networkId={notConnected ? 8453 : notSupported ? 0 : activeNetwork?.id}
          />
        </MenuButton>
        <MenuList border="1px" borderColor="gray.900" zIndex={999}>
          {mainnets.map(({ id, preset, label }) => (
            <MenuItem key={`${id}-${preset}`} onClick={() => setNetwork(id)}>
              <NetworkIcon networkId={id} size="20px" />
              <Text variant="nav" ml={2}>
                {label}
              </Text>
            </MenuItem>
          ))}

          {showTestnets && <Divider color="gray.900" />}

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
                data-cy="network-controller-switch"
              />
            </Flex>
          </MenuOptionGroup>

          {(showTestnets ? testnets : []).map(({ id, preset, label }) => (
            <MenuItem
              key={`${id}-${preset}`}
              onClick={() => setNetwork(id)}
              data-cy={`network-menu-button-${id}`}
            >
              <NetworkIcon filter="grayscale(1)" networkId={id} size="20px" />
              <Text variant="nav" ml={2}>
                {label}
              </Text>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Menu placement="bottom-end" isOpen={isOpen} onOpen={() => onOpen()}>
        <MenuButton
          as={Button}
          variant="outline"
          colorScheme="gray"
          ml={2}
          height={10}
          py="1"
          px="2"
          data-cy="header-wallet-address-button"
          maxW="200px"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          overflow="hidden"
        >
          {user?.pfpUrl ? (
            <Flex alignItems="center" gap="1">
              <Image src={user.pfpUrl} w="24px" h="24px" borderRadius="50%" />
              <Text
                as="span"
                ml={1}
                color="white"
                fontWeight={700}
                fontSize="xs"
                userSelect="none"
                data-cy="header-wallet-address-display"
                maxW="200px"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                overflow="hidden"
              >
                {user?.username || prettyString(activeWallet?.address || '')}
              </Text>
            </Flex>
          ) : (
            <Flex alignItems="center" gap="1">
              <Blockies seed={activeWallet?.address || ''} scale={3} className="blockies-rounded" />
              <Text
                as="span"
                ml={1}
                color="white"
                fontWeight={700}
                fontSize="xs"
                userSelect="none"
                data-cy="header-wallet-address-display"
                maxW="200px"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                overflow="hidden"
              >
                {user?.username || prettyString(activeWallet?.address || '')}
              </Text>
            </Flex>
          )}
        </MenuButton>
        <MenuList zIndex={999} onMouseLeave={() => onClose()}>
          <Flex
            border="1px solid"
            rounded="base"
            borderColor="gray.900"
            w="370px"
            _hover={{ bg: 'navy.700' }}
            backgroundColor="navy.700"
            opacity={1}
            p="4"
            flexDir="column"
            gap="4"
          >
            <Flex flexDir="column" w="100%" gap="2">
              <Flex justifyContent="space-between">
                <Text fontSize="14px" color="gray.500">
                  Connected with {walletsInfo?.label}
                </Text>
                <IconButton
                  aria-label="disconnect wallet"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDisconnect();
                  }}
                  size="sm"
                  icon={<DisconnectIcon />}
                  variant="outline"
                  colorScheme="gray"
                ></IconButton>
              </Flex>
              <Text fontWeight={700} color="white" fontSize="16px">
                {prettyString(activeWallet?.address || '')}{' '}
                <Tooltip label={toolTipLabel} closeOnClick={false}>
                  <CopyIcon
                    ml="2"
                    onClick={() => {
                      navigator.clipboard.writeText(activeWallet?.address || '');
                      setTooltipLabel('Copied');
                      setTimeout(() => {
                        setTooltipLabel('Copy');
                      }, 10000);
                    }}
                  />
                </Tooltip>
              </Text>
            </Flex>
            <Divider />
            <Flex alignItems="center" gap="4">
              {user?.pfpUrl ? (
                <>Implement me </>
              ) : (
                <Blockies
                  seed={activeWallet?.address || ''}
                  scale={7}
                  className="blockies-rounded"
                />
              )}

              {user?.username ? (
                <Flex flexDir="column" maxW="200px">
                  <Text
                    fontSize="16px"
                    fontWeight={700}
                    maxW="300px"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                    overflow="hidden"
                  >
                    {user.username}
                  </Text>
                  <Text
                    fontWeight={400}
                    fontSize="12px"
                    maxW="200px"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                    overflow="hidden"
                  >
                    {user.about}
                  </Text>
                </Flex>
              ) : (
                <Text fontSize="16px" fontWeight={700} maxW="300px">
                  {prettyString(user?.address || '')}
                </Text>
              )}
            </Flex>
            <Link href="/#/profile" onClick={() => onClose()}>
              <Button
                variant="outline"
                colorScheme="gray"
                color="white"
                w="100%"
                size="sm"
                data-cy="edit-profile-button-link-header"
              >
                Edit Profile
              </Button>
            </Link>
          </Flex>
        </MenuList>
      </Menu>
    </Flex>
  );
}

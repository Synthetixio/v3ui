import { useEffect, useState } from 'react';
import {
  Button,
  Divider,
  Flex,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import {
  NetworkIcon,
  useNetwork,
  useWallet,
  NETWORKS,
  SNAX,
  SNAXTESTNET,
} from '@snx-v3/useBlockchain';
import { prettyString } from '@snx-v3/format';
import { CopyIcon } from '@chakra-ui/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tooltip } from '@snx-v3/Tooltip';
import { chains, supportedNetworks } from '../../utils/onboard';
import { DisconnectIcon } from '../Icons';
import Blockies from 'react-blockies';
import '../../pages/index.css';
import { useGetUserDetailsQuery } from '../../queries';

const mainnets = NETWORKS.filter(({ isSupported, isTestnet }) => isSupported && !isTestnet).filter(
  (network) => supportedNetworks.includes(network.id)
);

export function NetworkController() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [toolTipLabel, setTooltipLabel] = useState('Copy');
  const { activeWallet, walletsInfo, connect, disconnect } = useWallet();
  const { network: activeNetwork, setNetwork } = useNetwork();
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
  const notSupported = !chains.find((chain) => chain.id === activeNetwork?.id);

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
            networkId={notConnected ? 2192 : notSupported ? 0 : activeNetwork?.id}
          />
        </MenuButton>
        <MenuList border="1px" borderColor="gray.900" zIndex={999}>
          {mainnets.map(({ id, preset, label }) => (
            <MenuItem
              key={`${id}-${preset}`}
              onClick={async () => {
                try {
                  setNetwork(id);
                } catch (error) {
                  const snaxChain = id === 2192 ? SNAX : SNAXTESTNET;
                  await (window as any).ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                      {
                        chainId: snaxChain.hexId,
                        chainName: snaxChain.label,
                        nativeCurrency: {
                          name: 'ETH',
                          symbol: 'ETH',
                          decimals: 18,
                        },
                        rpcUrls: [snaxChain.rpcUrl()],
                        blockExplorerUrls: [
                          id === 2192
                            ? 'https://explorer.snaxchain.io/'
                            : 'https://testnet-explorer.snaxchain.io/',
                        ],
                      },
                    ],
                  });
                }
              }}
            >
              <NetworkIcon networkId={id} size="20px" />
              <Text variant="nav" ml={2}>
                {label}
              </Text>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Menu placement="bottom-end" isOpen={isOpen} onOpen={() => onOpen()} closeOnBlur>
        <MenuButton
          as={Button}
          variant="outline"
          colorScheme="gray"
          ml={2}
          height={10}
          py="1"
          px="2"
          data-cy="header-wallet-address-button"
          maxW={{ base: '130px', md: '200px' }}
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          overflow="hidden"
        >
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
              maxW={{ base: '200px', md: '200px' }}
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              overflow="hidden"
            >
              {user?.name || prettyString(activeWallet?.address || '')}
            </Text>
          </Flex>
        </MenuButton>
        <MenuList zIndex={999} onMouseLeave={() => onClose()}>
          <Flex
            border="1px solid"
            rounded="base"
            borderColor="gray.900"
            w="300px"
            _hover={{ bg: 'navy.700' }}
            backgroundColor="navy.700"
            opacity={1}
            p="4"
            flexDir="column"
            gap="3"
          >
            <Flex w="100%" justifyContent="space-between">
              <Flex flexDir="column">
                <Text fontSize="14px" color="gray.500">
                  Connected with {walletsInfo?.label}
                </Text>
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
              <IconButton
                aria-label="disconnect wallet"
                onClick={(e) => {
                  e.stopPropagation();
                  onDisconnect();
                }}
                icon={<DisconnectIcon />}
                variant="outline"
                colorScheme="gray"
              ></IconButton>
              {/* </Flex> */}
            </Flex>
            <Divider />
            <Flex alignItems="center" gap="4" maxW="200px">
              <Blockies seed={activeWallet?.address || ''} scale={7} className="blockies-rounded" />

              {user?.name ? (
                <Flex flexDir="column" maxW="200px">
                  <Text
                    fontSize="16px"
                    fontWeight={700}
                    maxW="200px"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                    overflow="hidden"
                  >
                    {user.name}
                  </Text>
                  <Text
                    fontWeight={400}
                    fontSize="12px"
                    maxW="200px"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                    overflow="hidden"
                  >
                    {user.description}
                  </Text>
                </Flex>
              ) : (
                <Text fontSize="16px" fontWeight={700} maxW="150px">
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
                size="md"
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

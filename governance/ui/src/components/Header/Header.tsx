import {
  Button,
  Flex,
  Image,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorMode,
  Show,
  Fade,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { BaseIcon, EthereumIcon, FailedIcon, OptimismIcon, WalletIcon } from '@snx-v3/icons';
import { prettyString } from '@snx-v3/format';
import { useEffect, useState } from 'react';
import PeriodCountdown from '../PeriodCountdown/PeriodCountdown';
import { useGetUserBallot } from '../../queries';
import { useQueryClient } from '@tanstack/react-query';
import councils from '../../utils/councils';
import { useWallet, useNetwork } from '../../queries/useWallet';
import { Network } from '@snx-v3/useBlockchain';
import governanceHeaderSvg from './governance-header.svg';
import snxHeaderSvg from './snx-header.svg';

const activeIcon = (currentNetwork: Network | null) => {
  switch (currentNetwork?.id) {
    case 1:
      return { icon: <EthereumIcon />, name: 'Ethereum' };
    case 11155111:
      return { icon: <EthereumIcon />, name: 'Sepolia Testnet' };
    case 10:
      return { icon: <OptimismIcon />, name: 'Optimism' };
    case 8453:
      return { icon: <BaseIcon />, name: 'Base' };
    case 84532:
      return { icon: <BaseIcon />, name: 'Base Sepolia' };
    default:
      return { icon: <FailedIcon width="24px" height="24px" />, name: 'Unsupported Network' };
  }
};

export function Header() {
  const navigate = useNavigate();

  const { activeWallet, walletsInfo, connect, disconnect } = useWallet();
  const { network, setNetwork } = useNetwork();

  const { icon } = activeIcon(network);
  const { colorMode, toggleColorMode } = useColorMode();

  const [localStorageUpdated, setLocalStorageUpdated] = useState(false);
  const [fetchedNetwork, setFetchedNetwork] = useState<number[]>([]);

  const queryClient = useQueryClient();

  const [{ data: ballots, isFetched }] = [
    useGetUserBallot(['spartan', 'ambassador', 'grants', 'treasury']),
  ];

  useEffect(() => {
    if (
      activeWallet?.address &&
      network?.id &&
      isFetched &&
      (!localStorageUpdated || !fetchedNetwork.includes(network?.id))
    ) {
      setLocalStorageUpdated(true);
      setFetchedNetwork([...fetchedNetwork, network?.id]);
      const selection = localStorage.getItem('voteSelection');
      if (!selection) localStorage.setItem('voteSelection', '');
      const parsedSelection = JSON.parse(selection ? selection : '{}');
      ballots?.forEach((ballot, index) => {
        const council =
          index === 0
            ? 'spartan'
            : index === 1
              ? 'ambassador'
              : index === 2
                ? 'grants'
                : 'treasury';
        parsedSelection[council] = ballot.votedCandidates[0];
      });
      localStorage.setItem('voteSelection', JSON.stringify(parsedSelection));
      queryClient.refetchQueries({ queryKey: ['voting-candidates'] });
    }
  }, [
    activeWallet?.address,
    network?.id,
    localStorageUpdated,
    isFetched,
    ballots,
    queryClient,
    fetchedNetwork,
  ]);

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

  const onDisconnect = () => {
    if (walletsInfo) {
      disconnect(walletsInfo);
      localStorage.removeItem('connectedWallets');
    }
  };

  return (
    <Flex
      as="header"
      bg="navy.700"
      h="65px"
      alignItems="center"
      px={{ base: '3', lg: 6 }}
      py={{ base: '4' }}
      borderBottomWidth="1px"
      borderStyle="solid"
      borderBottomColor="gray.900"
      justifyContent="center"
    >
      <Flex maxW="1440px" w="100%" alignItems="center">
        <Flex cursor="pointer" onClick={() => navigate('/')} mr="auto">
          <Image src={snxHeaderSvg} pr="10px" />
          <Show above="md">
            <Image src={governanceHeaderSvg} />
          </Show>
        </Flex>
        <PeriodCountdown council={councils[0].slug} />
        {activeWallet && (
          <Menu>
            {() => (
              <>
                <MenuButton as={Button} ml={2} variant="outline" colorScheme="gray" px={2}>
                  {icon}
                </MenuButton>
                <MenuList zIndex={100}>
                  <MenuItem onClick={() => setNetwork(1)}>
                    <EthereumIcon />
                    <Text variant="nav" ml={2}>
                      Ethereum Mainnet
                    </Text>
                  </MenuItem>
                  <MenuItem onClick={() => setNetwork(10)}>
                    <OptimismIcon />
                    <Text variant="nav" ml={2}>
                      Optimism
                    </Text>
                  </MenuItem>
                  <MenuItem onClick={() => setNetwork(8453)}>
                    <BaseIcon />
                    <Text variant="nav" ml={2}>
                      Base
                    </Text>
                  </MenuItem>
                  {/* Testnets */}
                  <MenuItem onClick={() => setNetwork(11155111)}>
                    <EthereumIcon />
                    <Text variant="nav" ml={2}>
                      Sepolia
                    </Text>
                  </MenuItem>
                  <MenuItem onClick={() => setNetwork(84532)}>
                    <BaseIcon />
                    <Text variant="nav" ml={2}>
                      Base Sepolia
                    </Text>
                  </MenuItem>
                </MenuList>
              </>
            )}
          </Menu>
        )}
        <Fade in>
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
                data-testid="user-menu-button"
              >
                <WalletIcon />
                <Text
                  as="span"
                  ml={1}
                  color="whiteAlpha.800"
                  fontWeight={700}
                  fontSize="xs"
                  userSelect="none"
                  data-testid="user-wallet-address"
                >
                  {activeWallet.ens?.name || prettyString(activeWallet.address)}
                </Text>
              </MenuButton>
              <MenuList zIndex={100}>
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
            <Button onClick={() => connect()} ml="2" id="connect-wallet-button">
              Connect Wallet
            </Button>
          )}
        </Fade>
      </Flex>
    </Flex>
  );
}

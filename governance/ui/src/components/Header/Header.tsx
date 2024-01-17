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
} from '@chakra-ui/react';
import {
  Network,
  disconnect,
  onboard,
  useIsConnected,
  useNetwork,
  useWallet,
} from '@snx-v3/useBlockchain';
import { useNavigate } from 'react-router-dom';
import { EthereumIcon, FailedIcon, OptimismIcon, WalletIcon } from '@snx-v3/icons';
import { prettyString } from '@snx-v3/format';
import { useEffect, useState } from 'react';
import PeriodCountdown from '../PeriodCountdown/PeriodCountdown';
import useGetUserBallot from '../../queries/useGetUserBallot';
import { useQueryClient } from '@tanstack/react-query';
import { useGetCurrentPeriod } from '../../queries/useGetCurrentPeriod';
import councils from '../../utils/councils';

const activeIcon = (currentNetwork: Network) => {
  switch (currentNetwork.id) {
    case 1:
      return { icon: <EthereumIcon />, name: 'Ethereum' };
    case 5:
      return { icon: <EthereumIcon />, name: 'Goerli Testnet' };
    case 10:
      return { icon: <OptimismIcon />, name: 'Optimism' };
    case 420:
      return { icon: <OptimismIcon />, name: 'Optimistic Goerli' };

    default:
      return { icon: <FailedIcon width="24px" height="24px" />, name: 'Unsupported Network' };
  }
};

export function Header() {
  const navigate = useNavigate();
  const isWalletConnected = useIsConnected();
  const wallet = useWallet();
  const currentNetwork = useNetwork();
  const { icon } = activeIcon(currentNetwork);
  const { colorMode, toggleColorMode } = useColorMode();
  const [localStorageUpdated, setLocalStorageUpdated] = useState(false);
  const [fetchedNetwork, setFetchedNetwork] = useState<number[]>([]);
  const queryClient = useQueryClient();
  const [{ data: ballots, isFetched }] = [
    useGetUserBallot(['spartan', 'ambassador', 'grants', 'treasury']),
  ];

  useEffect(() => {
    if (
      wallet?.address &&
      currentNetwork.id &&
      isFetched &&
      (!localStorageUpdated || !fetchedNetwork.includes(currentNetwork.id))
    ) {
      setLocalStorageUpdated(true);
      setFetchedNetwork([...fetchedNetwork, currentNetwork.id]);
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
    wallet?.address,
    currentNetwork.id,
    localStorageUpdated,
    isFetched,
    ballots,
    queryClient,
    fetchedNetwork,
  ]);

  const switchNetwork = async (id: number) => {
    return onboard?.setChain({ chainId: `0x${id.toString(16)}` });
  };

  useEffect(() => {
    if (colorMode === 'light') {
      toggleColorMode();
    }
  }, [colorMode, toggleColorMode]);

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
          <Image src="/snx-header.svg" pr="10px" />
          <Show above="md">
            <Image src="/governance-header.svg" />
          </Show>
        </Flex>
        <PeriodCountdown council={councils[0].slug} />
        {isWalletConnected && (
          <Menu>
            {() => (
              <>
                <MenuButton as={Button} ml={2} variant="outline" colorScheme="gray" px={2}>
                  {icon}
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => switchNetwork(1)}>
                    <EthereumIcon />
                    <Text variant="nav" ml={2}>
                      Ethereum Mainnet
                    </Text>
                  </MenuItem>
                  <MenuItem onClick={() => switchNetwork(10)}>
                    <OptimismIcon />
                    <Text variant="nav" ml={2}>
                      Optimism
                    </Text>
                  </MenuItem>
                  <MenuItem onClick={() => switchNetwork(420)}>
                    <OptimismIcon />
                    <Text variant="nav" ml={2}>
                      Optimism Goerli
                    </Text>
                  </MenuItem>
                </MenuList>
              </>
            )}
          </Menu>
        )}
        {wallet ? (
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
                {wallet.ens?.name || prettyString(wallet.address)}
              </Text>
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={() => {
                  try {
                    navigator.clipboard.writeText(wallet?.address);
                  } catch (_e) {}
                }}
              >
                <Text variant="nav" ml={2}>
                  Copy address
                </Text>
              </MenuItem>
              <MenuItem onClick={disconnect}>
                <Text variant="nav" ml={2}>
                  Disconnect
                </Text>
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Button onClick={() => onboard.connectWallet()} ml="2">
            Connect Wallet
          </Button>
        )}
      </Flex>
    </Flex>
  );
}

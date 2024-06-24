import { Button, Flex, Image, useColorMode, Show } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PeriodCountdown from '../PeriodCountdown/PeriodCountdown';
import { useGetUserBallot } from '../../queries';
import { useQueryClient } from '@tanstack/react-query';
import councils from '../../utils/councils';
import { useWallet, useNetwork } from '../../queries/useWallet';
import governanceHeaderSvg from './governance-header.svg';
import snxHeaderSvg from './snx-header.svg';
import { NetworkController } from './NetworkController';

export function Header() {
  const navigate = useNavigate();

  const { activeWallet, walletsInfo, connect, disconnect } = useWallet();
  const { network, setNetwork } = useNetwork();

  const { colorMode, toggleColorMode } = useColorMode();

  const [localStorageUpdated, setLocalStorageUpdated] = useState(false);
  const [fetchedNetwork, setFetchedNetwork] = useState<number[]>([]);

  const queryClient = useQueryClient();

  const [{ data: ballots, isFetched }] = [useGetUserBallot(['spartan', 'ambassador', 'treasury'])];

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
        {activeWallet && <NetworkController />}

        {!activeWallet && (
          <Button onClick={() => connect()} ml="2" data-testid="connect-wallet-button">
            Connect Wallet
          </Button>
        )}
      </Flex>
    </Flex>
  );
}

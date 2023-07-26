import { Button, Flex, Image, Text, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import {
  Network,
  disconnect,
  onboard,
  useIsConnected,
  useNetwork,
  useWallet,
} from '@snx-v3/useBlockchain';
import { useLocation, useNavigate } from 'react-router-dom';
import { shortAddress } from '../utils/addresses';
import { EthereumIcon, FailedIcon, OptimismIcon, WalletIcon } from '@snx-v3/icons';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

const routes = [
  {
    path: 'councils',
    label: 'Councils',
  },
  { path: 'members', label: 'Members' },
  { path: 'profile', label: 'Profile' },
];

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

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isWalletConnected = useIsConnected();
  const wallet = useWallet();
  const currentNetwork = useNetwork();
  const { name, icon } = activeIcon(currentNetwork);
  const switchNetwork = async (id: number) => {
    return onboard?.setChain({ chainId: `0x${id.toString(16)}` });
  };
  return (
    <Flex as="header" bg="navy.700" h="65px" alignItems="center" px="40px" wrap="wrap">
      <Flex cursor="pointer" onClick={() => navigate('/')} alignItems="center" mr="28px">
        <Image src="/snx-header.svg" pr="10px" />
        <Image src="/governance-header.svg" />
      </Flex>
      {routes.map((route, index) => (
        <Text
          cursor="pointer"
          key={route.path.concat(route.label)}
          onClick={() => navigate('/' + route.path)}
          color={location.pathname.includes(route.path) ? 'white' : 'gray.500'}
          fontWeight="700"
          fontSize="14px"
          lineHeight="20px"
          mr={index === routes.length - 2 ? 'auto' : index === routes.length - 1 ? '8px' : '32px'}
        >
          {route.label}
        </Text>
      ))}
      {isWalletConnected && (
        <Menu>
          {({ isOpen }) => (
            <>
              <MenuButton
                as={Button}
                ml={2}
                variant="outline"
                colorScheme="gray"
                sx={{ '> span': { display: 'flex', alignItems: 'center' } }}
              >
                {icon}
                <>
                  <Text variant="nav" fontSize="sm" fontWeight={700} ml={1.5} mr={2}>
                    {name}
                  </Text>
                  {isOpen ? <ChevronUpIcon color="cyan" /> : <ChevronDownIcon color="cyan.500" />}
                </>
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
      {isWalletConnected ? (
        <Button
          leftIcon={<WalletIcon />}
          onClick={disconnect}
          variant="outline"
          borderColor="gray.900"
          color="whiteAlpha.800"
          ml="8px"
        >
          {shortAddress(wallet?.address || '')}
        </Button>
      ) : (
        <Button onClick={() => onboard.connectWallet()}>Connect Wallet</Button>
      )}
    </Flex>
  );
}

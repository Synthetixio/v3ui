import { Button, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { disconnect, onboard, useIsConnected, useWallet } from '@snx-v3/useBlockchain';
import { useLocation, useNavigate } from 'react-router-dom';
import { shortAddress } from '../utils/addresses';
import { WalletIcon } from '@snx-v3/icons';

const routes = [
  {
    path: 'councils',
    label: 'Councils',
  },
  { path: 'members', label: 'Members' },
  { path: 'profile', label: 'Profile' },
];

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isWalletConnected = useIsConnected();
  const wallet = useWallet();
  return (
    <Flex as="header" bg="navy.700" h="65px" alignItems="center" px="40px">
      <Image src="/snx-header.svg" pr="10px" />
      <Heading as="h2" fontFamily="Lustra Text" fontSize="20px" lineHeight="20px" mr="28px">
        Governance
      </Heading>
      {routes.map((route, index) => (
        <Text
          cursor="pointer"
          key={route.path.concat(route.label)}
          onClick={() => navigate('/' + route.path)}
          color={location.pathname.includes(route.path) ? 'white' : 'gray.500'}
          fontWeight="700"
          fontSize="14px"
          lineHeight="20px"
          mr={index === routes.length - 2 ? 'auto' : '32px'}
        >
          {route.label}
        </Text>
      ))}

      {isWalletConnected ? (
        <Button
          leftIcon={<WalletIcon />}
          onClick={disconnect}
          variant="outline"
          borderColor="gray.900"
          color="whiteAlpha.800"
        >
          {shortAddress(wallet?.address || '')}
        </Button>
      ) : (
        <Button onClick={() => onboard.connectWallet()}>Connect Wallet</Button>
      )}
    </Flex>
  );
}

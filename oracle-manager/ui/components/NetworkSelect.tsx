import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { ArbitrumIcon, BaseIcon, EthereumIcon, OptimismIcon } from '@snx-v3/icons';
import { NetworkIcon } from '@snx-v3/useBlockchain';

export default function NetworkSelect({
  id,
  name,
  setNetwork,
}: {
  id: string | number;
  name: string;
  setNetwork: ({ id, name }: { id: number; name: string }) => any;
}) {
  return (
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
            <NetworkIcon networkId={Number(id)} />
            <>
              <Text variant="nav" fontSize="sm" fontWeight={700} ml={1.5} mr={2}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Text>
              {isOpen ? <ChevronUpIcon color="cyan" /> : <ChevronDownIcon color="cyan.500" />}
            </>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => setNetwork({ id: 1, name: 'Ethereum Mainnet' })}>
              <EthereumIcon />
              <Text variant="nav" ml={2}>
                Ethereum Mainnet
              </Text>
            </MenuItem>
            <MenuItem onClick={() => setNetwork({ id: 5, name: 'Goerli' })}>
              <EthereumIcon />
              <Text variant="nav" ml={2}>
                Goerli
              </Text>
            </MenuItem>
            <MenuItem onClick={() => setNetwork({ id: 10, name: 'Optimism Mainnet' })}>
              <OptimismIcon />
              <Text variant="nav" ml={2}>
                Optimism
              </Text>
            </MenuItem>
            <MenuItem onClick={() => setNetwork({ id: 420, name: 'Optimism Goerli' })}>
              <OptimismIcon />
              <Text variant="nav" ml={2}>
                Optimism Goerli
              </Text>
            </MenuItem>
            <MenuItem onClick={() => setNetwork({ id: 11155420, name: 'Optimism Goerli' })}>
              <OptimismIcon />
              <Text variant="nav" ml={2}>
                Optimism Sepolia
              </Text>
            </MenuItem>
            <MenuItem onClick={() => setNetwork({ id: 84531, name: 'Base Goerli' })}>
              <BaseIcon />
              <Text variant="nav" ml={2}>
                Base Goerli
              </Text>
            </MenuItem>
            <MenuItem onClick={() => setNetwork({ id: 8453, name: 'Base' })}>
              <BaseIcon />
              <Text variant="nav" ml={2}>
                Base
              </Text>
            </MenuItem>
            <MenuItem onClick={() => setNetwork({ id: 421614, name: 'Arbitrum Sepolia' })}>
              <ArbitrumIcon />
              <Text variant="nav" ml={2}>
                Arbitrum Sepolia
              </Text>
            </MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
}

import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { NETWORKS, NetworkIcon } from '@snx-v3/useBlockchain';

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
            {NETWORKS.map((network) => (
              <MenuItem
                onClick={() => setNetwork({ id: network.id, name: network.label })}
                key={network.id}
              >
                <NetworkIcon networkId={network.id} />
                <Text variant="nav" ml={2}>
                  {network.label}
                </Text>
              </MenuItem>
            ))}
          </MenuList>
        </>
      )}
    </Menu>
  );
}

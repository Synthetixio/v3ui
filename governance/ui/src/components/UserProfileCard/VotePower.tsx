import { CloseIcon } from '@chakra-ui/icons';
import { Button, Flex, Heading, IconButton, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNetwork } from '../../queries';

export default function VotePower({
  activeCouncil,
  networks,
}: {
  networks: { icon: ReactNode; chainId: number }[];
  activeCouncil: string;
}) {
  const navigate = useNavigate();
  const { setNetwork } = useNetwork();
  return (
    <Flex flexDir="column" position="relative" p="6" h="100%">
      <IconButton
        onClick={() => navigate(`/councils/${activeCouncil}`)}
        size="sm"
        aria-label="close button"
        icon={<CloseIcon />}
        variant="ghost"
        colorScheme="whiteAlpha"
        color="white"
        position="absolute"
        top="16px"
        right="0px"
        _hover={{}}
      />
      <Heading fontSize="lg" mb="3">
        Voting not available on Snaxchain
      </Heading>
      <Text fontSize="sm" color="gray.500" mb="auto">
        Voting is not available on Snaxchain. Switch to Ethereum or Optimism.{' '}
      </Text>
      <Flex justifyContent="space-evenly" w="100%">
        {networks.map((network) => (
          <Flex key={`network-selection-${network.chainId}`} flexDir="column" alignItems="center">
            {network.icon}
            <Button
              mt="12"
              variant="outline"
              colorScheme="gray"
              onClick={() => setNetwork(network.chainId)}
            >
              Switch {network.chainId == 1 ? 'Ethereum' : 'Optimism'}
            </Button>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}

import { CloseIcon } from '@chakra-ui/icons';
import { Button, Flex, Heading, IconButton, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNetwork } from '../../queries';
import { BigNumber } from 'ethers';

export default function VotePower({
  activeCouncil,
  networks,
}: {
  networks: { icon: ReactNode; chainId: number; power?: BigNumber }[];
  activeCouncil: string;
}) {
  const navigate = useNavigate();
  const { setNetwork } = useNetwork();
  return (
    <Flex flexDir="column" position="relative" py="6" h="100%">
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
          <Flex
            key={`network-selection-${network.chainId}`}
            flexDir="column"
            alignItems="center"
            p="2"
          >
            <Flex border="1px solid" color="gray.900" rounded="base" p="2" alignItems="center">
              {network.icon}
              <Flex flexDir="column" gap="2" ml="2">
                <Text color="gray" fontSize="xs">
                  Total Voting Power
                </Text>
                <Text
                  maxW="100px"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  color="white"
                  fontWeight={700}
                >
                  {network.power?.toString() || '0'}
                </Text>
              </Flex>
            </Flex>
            <Button
              mt="4"
              w="100%"
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

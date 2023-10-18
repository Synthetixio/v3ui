import { ChevronDownIcon, CloseIcon, CopyIcon } from '@chakra-ui/icons';
import { Button, Flex, IconButton, Image, Text } from '@chakra-ui/react';
import { Badge } from '../Badge';
import { prettyString } from '@snx-v3/format';

export function UserProfileCard({ walletAddress }: { walletAddress: string }) {
  return (
    <Flex
      flexDir="column"
      bg="navy.700"
      borderRadius="base"
      borderStyle="solid"
      borderColor="gray.900"
      borderWidth="1px"
      p="4"
    >
      <Flex alignItems="center" mb="4">
        <Image borderRadius="full" src="/img.png" w="56px" h="56px" mr="4" />
        <Flex flexDir="column" w="100%">
          <Flex justifyContent="space-between">
            <Text fontSize="16px" fontWeight="700">
              Andy
            </Text>
            <IconButton
              size="xs"
              aria-label="close button"
              icon={<CloseIcon />}
              variant="ghost"
              colorScheme="whiteAlpha"
              color="white"
            />
          </Flex>
          <Text fontSize="12px" fontWeight="400" lineHeight="16px">
            Og Defi Member
          </Text>
        </Flex>
      </Flex>
      <Flex mb="6">
        <Badge color="green">2x Elected</Badge>
      </Flex>
      <Flex mb="4">
        <i>If user has socials here</i>
      </Flex>
      <Flex flexDirection="column" alignItems="flex-start" mb="6">
        {/* @TODO what gray is that? */}
        <Text fontSize="14px" fontWeight="700" color="#828295">
          Wallet Address
        </Text>
        <Button
          size="xs"
          display="flex"
          variant="unstyled"
          onClick={() => {
            try {
              navigator.clipboard.writeText(walletAddress);
            } catch (error) {
              console.error(error);
            }
          }}
        >
          <Text mr="1" fontSize="12px" fontWeight="700">
            {prettyString(walletAddress)}
          </Text>
          <CopyIcon w="12px" h="12px" />
        </Button>
      </Flex>

      {/* @TODO what gray is that? */}
      <Text fontSize="14px" fontWeight="700" color="#828295">
        Governance Pitch
      </Text>
      <Text fontSize="14px" lineHeight="20px">
        Synthetix is at a watershed moment with v3 coming up, where we can finally offer our
        carefully designed and battle-tested architecture to all of DeFi. However, we will also face
        important and contentious decisions around value capture: how do we capture as much of a
        bigger pie as possible, without jeopardizing the underlying SNX token?
      </Text>
      <Button
        alignSelf="flex-start"
        size="xs"
        variant="ghost"
        colorScheme="cyan"
        fontSize="12px"
        fontWeight="400"
      >
        View More
        <ChevronDownIcon color="cyan.500" ml="1" />
      </Button>

      <Button variant="outline" colorScheme="gray" mb="1">
        Edit Profile
      </Button>
      <Button>Nominate Self</Button>
    </Flex>
  );
}

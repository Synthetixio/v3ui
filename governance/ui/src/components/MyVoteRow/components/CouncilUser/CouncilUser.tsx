import { Box, Flex, Image, Text } from '@chakra-ui/react';
import Blockies from 'react-blockies';
import useGetUserDetailsQuery from '../../../../queries/useGetUserDetailsQuery';
import councils, { CouncilSlugs } from '../../../../utils/councils';

export default function CouncilUser({
  address,
  councilSlug,
  hideName = false,
}: {
  address?: string;
  councilSlug: CouncilSlugs;
  hideName?: boolean;
}) {
  const council = councils.find((council) => council.slug === councilSlug);
  const { data: user } = useGetUserDetailsQuery(address);

  if (!council) {
    return null;
  }

  return (
    <Flex alignItems="center">
      <Flex
        borderRadius="50%"
        borderWidth="1px"
        borderStyle="solid"
        borderColor="gray.900"
        w="8"
        h="8"
        justifyContent="center"
        alignItems="center"
        mr="4"
        position="relative"
      >
        <Image src={council.image} w="6" h="6" />
        {user?.pfpUrl ? (
          <Image src={user.pfpUrl} borderRadius="50%" w="8" h="8" position="absolute" left="15px" />
        ) : user ? (
          <Blockies seed={user.address?.toLowerCase()} scale={4} className="fully-rounded votes" />
        ) : (
          <Box
            borderRadius="50%"
            w="8"
            h="8"
            position="absolute"
            left="15px"
            borderWidth="1px"
            bg="navy.700"
            borderStyle="dashed"
            borderColor="gray.500"
          />
        )}
      </Flex>
      {!hideName && (
        <Flex flexDir="column" mr="auto" ml="1">
          <Text fontSize="x-small" fontWeight="bold">
            {council.title}
          </Text>
          <Text fontSize="x-small">
            {user ? (user?.username ? user.username : user?.address) : 'not found'}
          </Text>
        </Flex>
      )}
    </Flex>
  );
}

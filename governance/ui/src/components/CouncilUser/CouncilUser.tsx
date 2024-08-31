import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { useGetUserDetailsQuery } from '../../queries';
import councils, { CouncilSlugs } from '../../utils/councils';
import { ProfilePicture } from '../UserProfileCard/ProfilePicture';
import { prettyString } from '@snx-v3/format';

export default function CouncilUser({
  address,
  councilSlug,
  hideName,
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
      <Flex alignItems="center">
        <Flex
          borderRadius="50%"
          borderWidth="1px"
          borderStyle="solid"
          borderColor="gray.900"
          w="10"
          h="10"
          justifyContent="center"
          alignItems="center"
          position="relative"
        >
          <Image src={council.image} w="8" h="8" />
        </Flex>
        {user ? (
          <ProfilePicture size={9} address={user?.address} ml="-3" />
        ) : (
          <Box
            borderRadius="50%"
            w="9"
            h="9"
            borderWidth="1px"
            bg="navy.700"
            borderStyle="dashed"
            borderColor="gray.500"
            ml="-3"
            zIndex={10}
          />
        )}
      </Flex>
      <Flex flexDir="column" mr="auto" ml="3">
        {!hideName && (
          <>
            <Text fontSize="sm" fontWeight="bold">
              {council.title}
            </Text>
            <Text
              fontSize="small"
              maxW="100px"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              overflow="hidden"
            >
              {user
                ? user?.username
                  ? user.username
                  : prettyString(user?.address, 6, 4)
                : 'No Vote'}
            </Text>
          </>
        )}
      </Flex>
    </Flex>
  );
}

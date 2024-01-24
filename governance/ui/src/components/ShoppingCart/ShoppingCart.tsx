import { Box, Button, Fade, Flex, Heading, IconButton, Image, Text } from '@chakra-ui/react';
import councils, { CouncilSlugs } from '../../utils/councils';
import { useGetVotingCandidates } from '../../queries/useGetVotingCandidates';
import useGetUserDetailsQuery, { GetUserDetails } from '../../queries/useGetUserDetailsQuery';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import Blockies from 'react-blockies';

export default function ShoppingCart({
  closeCart,
  votes,
}: {
  closeCart: () => void;
  votes?: Record<string, string>;
}) {
  const navigate = useNavigate();
  const { data: votingCandidates } = useGetVotingCandidates();
  const { data: users } = useGetUserDetailsQuery(Object.values(votingCandidates || {}));
  const queryClient = useQueryClient();
  const candidates =
    users &&
    votingCandidates &&
    Object.entries(votingCandidates)
      .map(([council, candidate]) => {
        const user = users.find((user) => user.address.toLowerCase() === candidate.toLowerCase());
        return { ...user, council };
      })
      .reduce(
        (a, v) => ({ ...a, [v.council]: v }),
        {} as Record<CouncilSlugs, GetUserDetails & Record<'council', CouncilSlugs>>
      );

  return (
    <Fade in={true}>
      <Flex
        w="324px"
        h="370px"
        position="absolute"
        bottom="-380px"
        right="0px"
        border="1px solid"
        borderColor="gray.900"
        rounded="base"
        bg="navy.700"
        onMouseLeave={() => closeCart()}
        pt="4"
        pb="6"
        flexDir="column"
      >
        <Flex justifyContent="space-between" px="6" pb="4">
          <Heading fontSize="large">My Votes</Heading>
          <Heading fontSize="large">{Object.values(!!votes ? votes : {}).length}/4</Heading>
        </Flex>
        {councils.map((council) => (
          <Flex
            key={`vote-${council.slug}-cart`}
            w="100%"
            padding="2"
            alignItems="center"
            border="1px solid"
            borderColor="gray.900"
          >
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
              {candidates && candidates[council.slug]?.pfpUrl ? (
                <Image
                  src={candidates[council.slug].pfpUrl}
                  borderRadius="50%"
                  w="8"
                  h="8"
                  position="absolute"
                  left="15px"
                />
              ) : candidates && candidates[council.slug] ? (
                <Blockies
                  seed={candidates[council.slug].address.toLowerCase()}
                  scale={4}
                  className="fully-rounded votes"
                />
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
            <Flex flexDir="column" mr="auto" ml="1">
              <Text fontSize="x-small" fontWeight="bold">
                {council.title}
              </Text>
              <Text fontSize="x-small">
                {candidates
                  ? candidates[council.slug]?.username
                    ? candidates[council.slug].username
                    : candidates[council.slug]?.address
                  : 'not found'}
              </Text>
            </Flex>

            {votingCandidates && !votingCandidates[council.slug] ? (
              <IconButton
                aria-label="action-button"
                icon={<AddIcon />}
                variant="outlined"
                onClick={() => navigate(`/councils/${council.slug}`)}
              />
            ) : (
              <IconButton
                aria-label="action-button"
                icon={<CloseIcon />}
                variant="outlined"
                onClick={() => {
                  const selection = localStorage.getItem('voteSelection');
                  if (!selection) localStorage.setItem('voteSelection', '');
                  const parsedSelection = JSON.parse(selection ? selection : '{}');
                  delete parsedSelection[council.slug];
                  localStorage.setItem('voteSelection', JSON.stringify(parsedSelection));
                  queryClient.refetchQueries({ queryKey: ['voting-candidates'] });
                }}
              />
            )}
          </Flex>
        ))}
        <Button
          onClick={(e) => {
            e.stopPropagation();
            navigate('my-votes');
          }}
          mx="6"
          mt="4"
        >
          Cast Votes
        </Button>
      </Flex>
    </Fade>
  );
}

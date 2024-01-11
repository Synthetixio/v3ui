import { Alert, Box, Button, Flex, Heading, IconButton, Image, Text } from '@chakra-ui/react';
import councils, { CouncilSlugs } from '../utils/councils';
import { useNavigate } from 'react-router-dom';
import { AddIcon, CloseIcon, WarningIcon } from '@chakra-ui/icons';
import { useGetVotingCandidates } from '../queries/useGetVotingCandidates';
import { useQueryClient } from '@tanstack/react-query';
import useGetUserDetailsQuery, { GetUserDetails } from '../queries/useGetUserDetailsQuery';
import Blockies from 'react-blockies';
import '../components/UserProfileCard/UserProfileCard.css';

export default function MyVotes() {
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
    <Flex justifyContent="center" mt="8" gap="2" w="100%">
      <Flex maxW="1440px" w="100%" justifyContent="center" flexWrap="wrap">
        <Flex
          bg="navy.700"
          rounded="base"
          borderWidth="1px"
          borderStyle="solid"
          borderColor="gray.900"
          w="735px"
          flexDirection="column"
          p="6"
        >
          <Flex justifyContent="space-between" mb="4">
            <Heading fontSize="2xl">My Votes</Heading>
            <Heading fontSize="2xl">{Object.values(votingCandidates || {}).length}/4</Heading>
          </Flex>
          <Text fontSize="xs" color="gray.500">
            You can cast 4 votes in one transaction. Continue voting if you want to add other
            nominee otherwise cast your vote to complete your voting.
          </Text>
          {councils.map((council) => (
            <Flex key={`vote-${council.slug}`} w="100%" padding="2" alignItems="center">
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
                    seed={candidates[council.slug].address}
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
          <Alert colorScheme="cyan">
            <WarningIcon color="cyan" mr="4" />
            You can now cast all your votes in one unique transaction
          </Alert>
        </Flex>
        <Flex
          bg="navy.700"
          rounded="base"
          borderWidth="1px"
          borderStyle="solid"
          borderColor="gray.900"
          w="483px"
          p="6"
          flexDir="column"
        >
          <Heading>Cast Your Vote</Heading>
          <Text fontSize="sm" color="gray.500" display="inline">
            Your total voting powered is aggregated from all chains and used to vote on Optimism. It
            can take{' '}
            <Text color="cyan.500" display="inline">
              up to 15 mins
            </Text>{' '}
            to transfer.
          </Text>
          <Flex
            flexDir="column"
            bg="navy.900"
            p="2"
            rounded="base"
            borderWidth="1px"
            borderStyle="solid"
            borderColor="gray.900"
            mb="auto"
          >
            <Text fontSize="sm" color="gray.500">
              Total Voting Power
            </Text>
            <Text fontSize="sm" color="white" fontWeight="bold">
              8923748923,2390487239 TODO
            </Text>
          </Flex>
          <Button size="md">Cast Vote</Button>
        </Flex>
      </Flex>
    </Flex>
  );
}

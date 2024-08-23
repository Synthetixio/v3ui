import { Alert, Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import councils, { CouncilSlugs } from '../utils/councils';
import { useNavigate } from 'react-router-dom';
import { WarningIcon } from '@chakra-ui/icons';
import { useGetCurrentPeriod } from '../queries/useGetCurrentPeriod';
import { useGetEpochSchedule } from '../queries/useGetEpochSchedule';
import { Timer } from '../components/Timer';
import CouncilTabs from '../components/CouncilTabs/CouncilTabs';
import { useGetUserVotingPower, useNetwork, useWallet } from '../queries/';
import { useCastVotes } from '../mutations';
import { formatNumber } from '@snx-v3/formatters';
import MyVoteRow from '../components/MyVoteRow/MyVoteRow';
import { useVoteContext } from '../context/VoteContext';

export default function MyVotes() {
  const { data: period } = useGetCurrentPeriod('spartan');
  const { data: schedule } = useGetEpochSchedule('spartan');
  const { network } = useNetwork();
  const { connect } = useWallet();
  const networkForState = network?.id.toString() || process.env.CI === 'true' ? 13001 : 2192;

  const { data: votingPowerSpartan } = useGetUserVotingPower('spartan');
  const { data: votingPowerAmbassador } = useGetUserVotingPower('ambassador');
  const { data: votingPowerTreassury } = useGetUserVotingPower('treasury');
  const { state } = useVoteContext();
  const councilToCastVote = Object.entries(state[networkForState] || {})
    .filter(([_, candidate]) => !!candidate)
    .map(([council]) => council) as CouncilSlugs[];
  const { mutateAsync } = useCastVotes(councilToCastVote, state[networkForState] || {});
  const navigate = useNavigate();

  return (
    <>
      <CouncilTabs activeCouncil="spartan" />
      <Flex justifyContent="center" gap="2" w="100%" pt="5">
        <Flex maxW="1440px" w="100%" justifyContent="center" flexWrap="wrap" gap="6">
          <Flex
            bg="navy.700"
            rounded="base"
            borderWidth="1px"
            borderStyle="solid"
            borderColor="gray.900"
            w="735px"
            flexDirection="column"
            position="relative"
          >
            {period !== '2' && (
              <Flex
                position="absolute"
                zIndex="10"
                textColor="white"
                top="50%"
                right="50%"
                transform="translate(50%, -50%)"
                rounded="base"
                borderWidth="1px"
                borderStyle="solid"
                borderColor="gray.900"
                bg="navy.700"
                p="4"
                flexDir="column"
                alignItems="center"
              >
                <Text fontSize="14px" textAlign="center">
                  Voting starts in:{' '}
                  <Text display="inline-block">
                    <Timer expiryTimestamp={schedule ? schedule?.votingPeriodStartDate : 0} />
                  </Text>
                </Text>
                <Text fontSize="12px" lineHeight="16px" textAlign="center" color="gray.500">
                  The voting period hasn’t started yet, come back later to vote for your councils.
                </Text>
                <Button
                  onClick={() => navigate('/councils/spartan')}
                  size="sm"
                  mt="3"
                  w="fit-content"
                >
                  {period === '0' || period === '3' ? 'See all Members' : 'See all Nominees'}
                </Button>
              </Flex>
            )}
            <Flex
              justifyContent="space-between"
              opacity={period !== '2' ? '0.2' : '1'}
              mb="3"
              p="6"
            >
              <Heading fontSize="2xl">My Votes</Heading>
              <Heading fontSize="2xl" data-cy="my-votes-total-votes">
                {Object.values(state[networkForState] || {}).filter((council) => !!council).length}/
                {councils.length}
              </Heading>
            </Flex>
            <Text
              fontSize="xs"
              color="gray.500"
              opacity={period !== '2' ? '0.2' : '1'}
              px="6"
              mb="2"
            >
              You can cast 3 votes in one transaction. Continue voting if you want to add other
              nominee otherwise cast your vote to complete your voting.
            </Text>
            {councils.map((council, index) => (
              <MyVoteRow
                key={council.slug.concat('my-votes-page')}
                councilSlug={council.slug}
                period={period}
                isLast={index === councils.length - 1}
              />
            ))}
            <Box p="6">
              <Alert
                colorScheme="blue"
                opacity={period !== '2' ? '0.2' : '1'}
                rounded="base"
                mt="6"
              >
                <WarningIcon color="cyan" mr="4" />
                You can now cast all your votes in one unique transaction
              </Alert>
            </Box>
          </Flex>
          <Flex
            bg="navy.700"
            rounded="base"
            borderWidth="1px"
            borderStyle="solid"
            borderColor="gray.900"
            w="483px"
            p="6"
            gap="3"
            flexDir="column"
            h="fit-content"
          >
            <Heading fontSize="large">
              {period === '2' ? 'Cast Your Votes' : 'Voting Power'}
            </Heading>
            <Text fontSize="sm" color="gray.500" display="inline">
              Your total voting powered is aggregated from all chains and used to vote on Optimism.
              It can take{' '}
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
              mb="12"
            >
              <Text fontSize="sm" color="gray.500">
                Total Voting Power
              </Text>
              <Text fontSize="sm" color="white" fontWeight="bold" data-cy="my-votes-voting-power">
                {formatNumber(
                  votingPowerSpartan?.power && votingPowerAmbassador && votingPowerTreassury
                    ? votingPowerSpartan.power
                        .add(votingPowerAmbassador.power)
                        .add(votingPowerTreassury.power)
                        .toString()
                    : 0
                )}
              </Text>
            </Flex>
            <Button
              data-cy="cast-my-vote-button"
              size="md"
              isDisabled={period !== '2' || !councilToCastVote.length}
              onClick={async () => {
                if (!network?.id) {
                  connect();
                } else {
                  await mutateAsync();
                }
              }}
            >
              {!network?.id ? 'Connect Wallet' : 'Cast Votes'}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

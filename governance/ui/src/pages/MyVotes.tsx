import { Alert, Button, Flex, Heading, Text } from '@chakra-ui/react';
import councils, { CouncilSlugs } from '../utils/councils';
import { useNavigate } from 'react-router-dom';
import { WarningIcon } from '@chakra-ui/icons';
import { useGetVotingCandidates } from '../queries/useGetVotingCandidates';
import { SnapshotRecordContractAddress, getCouncilContract } from '../utils/contracts';
import { useGetCurrentPeriod } from '../queries/useGetCurrentPeriod';
import { useGetEpochSchedule } from '../queries/useGetEpochSchedule';
import Timer from '../components/Timer/Timer';
import { useSigner } from '../queries/useWallet';
import CouncilTabs from '../components/CouncilTabs/CouncilTabs';
import {
  useGetUserVotingPower,
  useGetUserBallot,
  GetUserDetails,
  useGetUserDetailsQuery,
} from '../queries/';
import { formatNumber } from '@snx-v3/formatters';
import MyVoteRow from '../components/MyVoteRow/MyVoteRow';

export default function MyVotes() {
  const { data: period } = useGetCurrentPeriod('spartan');
  const { data: schedule } = useGetEpochSchedule('spartan');
  const signer = useSigner();

  const [
    { data: spartanBallot },
    // { data: grantsBallot },
    // { data: ambassadorBallot },
    // { data: treasuryBallot },
  ] = [
    useGetUserBallot('spartan'),
    // useGetUserBallot('grants'),
    // useGetUserBallot('ambassador'),
    // useGetUserBallot('treasury'),
  ];
  const { data: votingPower } = useGetUserVotingPower('spartan');

  const navigate = useNavigate();
  const { data: votingCandidates } = useGetVotingCandidates();
  const { data: users } = useGetUserDetailsQuery(Object.values(votingCandidates || {}));
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
    <>
      <CouncilTabs />
      <Flex justifyContent="center" gap="2" w="100%">
        <Flex maxW="1440px" w="100%" justifyContent="center" flexWrap="wrap" gap="6">
          <Flex
            bg="navy.700"
            rounded="base"
            borderWidth="1px"
            borderStyle="solid"
            borderColor="gray.900"
            w="735px"
            flexDirection="column"
            p="6"
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
                    <Timer
                      expiryTimestamp={schedule ? schedule?.votingPeriodStartDate * 1000 : 0}
                    />
                  </Text>
                </Text>
                <Text fontSize="12px" lineHeight="16px" textAlign="center" color="gray.500">
                  The voting period hasn’t started yet, come back later to vote for your councils.
                </Text>
                <Button
                  onClick={() => navigate('/council/spartan')}
                  variant="outline"
                  colorScheme="gray"
                  size="sm"
                  color="white"
                  mt="3"
                  w="fit-content"
                >
                  See all nominees
                </Button>
              </Flex>
            )}
            <Flex justifyContent="space-between" mb="4" opacity={period !== '2' ? '0.4' : '1'}>
              <Heading fontSize="2xl">My Votes</Heading>
              <Heading fontSize="2xl">{Object.values(votingCandidates || {}).length}/4</Heading>
            </Flex>
            <Text fontSize="xs" color="gray.500" opacity={period !== '2' ? '0.4' : '1'}>
              You can cast 4 votes in one transaction. Continue voting if you want to add other
              nominee otherwise cast your vote to complete your voting.
            </Text>
            {councils.map((council) => (
              <MyVoteRow key={council.slug} councilSlug={council.slug} />
            ))}
            <Alert colorScheme="blue" opacity={period !== '2' ? '0.4' : '1'} rounded="base" mt="12">
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
            <Heading fontSize="large">Cast Your Vote</Heading>
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
              mb="auto"
            >
              <Text fontSize="sm" color="gray.500">
                Total Voting Power
              </Text>
              <Text fontSize="sm" color="white" fontWeight="bold">
                {formatNumber(votingPower)}
              </Text>
            </Flex>
            <Button
              size="md"
              isDisabled={period !== '2'}
              onClick={async () => {
                if (signer) {
                  try {
                    await getCouncilContract('spartan')
                      .connect(signer)
                      .prepareBallotWithSnapshot(
                        SnapshotRecordContractAddress,
                        await signer.getAddress()
                      );
                  } catch (error) {
                    console.error('already prepared ballot');
                  }
                  await getCouncilContract('spartan')
                    .connect(signer)
                    .cast([candidates?.spartan.address], [spartanBallot?.votingPower]);
                }
              }}
            >
              Cast Vote
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

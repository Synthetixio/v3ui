import {
  Alert,
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import councils, { CouncilSlugs } from '../utils/councils';
import { useNavigate } from 'react-router-dom';
import { WarningIcon } from '@chakra-ui/icons';
import { useGetCurrentPeriod } from '../queries/useGetCurrentPeriod';
import { useGetEpochSchedule } from '../queries/useGetEpochSchedule';
import { Timer } from '../components/Timer';
import CouncilTabs from '../components/CouncilTabs/CouncilTabs';
import {
  useGetEpochIndex,
  useGetUserBallot,
  useGetUserVotingPower,
  useNetwork,
  useWallet,
} from '../queries/';
import { useCastVotes } from '../mutations';
import { formatNumber } from '@snx-v3/formatters';
import MyVoteRow from '../components/MyVoteRow/MyVoteRow';
import { useVoteContext, VoteStateForNetwork } from '../context/VoteContext';
import { useState } from 'react';
import { CouncilImage } from '../components/CouncilImage';
import { ProfilePicture } from '../components/UserProfileCard/ProfilePicture';
import { getVoteSelectionState } from '../utils/localstorage';
import { utils } from 'ethers';

export default function MyVotes() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { onClose } = useDisclosure();
  const { data: period } = useGetCurrentPeriod('spartan');
  const { data: schedule } = useGetEpochSchedule('spartan');
  const { data: epochId } = useGetEpochIndex('spartan');
  const { network } = useNetwork();
  const { activeWallet, connect } = useWallet();
  const { data: votingPowerSpartan, isLoading: spartanVotingPowerIsLoading } =
    useGetUserVotingPower('spartan');
  const { data: votingPowerAmbassador, isLoading: ambassadorVotingPowerIsLoading } =
    useGetUserVotingPower('ambassador');
  const { data: votingPowerTreassury, isLoading: treasuryVotingPowerIsLoading } =
    useGetUserVotingPower('treasury');
  const { data: spartanBallot } = useGetUserBallot('spartan');
  const { data: ambassadorBallot } = useGetUserBallot('ambassador');
  const { data: treasuryBallot } = useGetUserBallot('treasury');
  const ballots = {
    spartan: spartanBallot,
    ambassador: ambassadorBallot,
    treasury: treasuryBallot,
  };
  const { state } = useVoteContext();
  const networkForState = getVoteSelectionState(
    state,
    activeWallet?.address,
    epochId?.toString(),
    network?.id.toString()
  );
  const stateFromCouncils = (
    typeof networkForState !== 'string' ? networkForState : {}
  ) as VoteStateForNetwork;
  const councilToCastVote = Object.entries(stateFromCouncils)
    .filter(([council, candidate]) => {
      if ((ballots as any)[council].votedCandidates.length) {
        return !(ballots as any)[council].votedCandidates.includes(candidate);
      }
      return !!(stateFromCouncils as any)[council];
    })
    .map(([council]) => council) as CouncilSlugs[];

  const councilsToAddress = councilToCastVote.reduce(
    (cur, prev) => {
      cur[prev] = stateFromCouncils[prev] ?? '';
      return cur;
    },
    {} as Record<CouncilSlugs, string>
  );
  const { mutateAsync, isPending } = useCastVotes(councilToCastVote, councilsToAddress);
  const navigate = useNavigate();
  const formattedVotePower = formatNumber(
    votingPowerSpartan?.power && votingPowerAmbassador?.power && votingPowerTreassury?.power
      ? utils.formatEther(
          votingPowerSpartan.power.add(votingPowerAmbassador.power).add(votingPowerTreassury.power)
        )
      : 0
  );

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
            mx={{ base: '6', xl: '0' }}
            w={{ base: '100%', xl: '735px' }}
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
                    {schedule?.votingPeriodStartDate && (
                      <Timer expiryTimestamp={schedule.votingPeriodStartDate} id="my-votes" />
                    )}
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
              p="6"
              pb="4"
            >
              <Heading fontSize="2xl">My Votes</Heading>
              <Heading fontSize="2xl" data-cy="my-votes-total-votes">
                {Object.values(stateFromCouncils).filter((council) => !!council).length}/
                {councils.length}
              </Heading>
            </Flex>
            <Text
              fontSize="sm"
              color="gray.500"
              opacity={period !== '2' ? '0.2' : '1'}
              px="6"
              mb="12"
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
            mx={{ base: '6', xl: '0' }}
            w={{ base: '100%', xl: '483px' }}
            p="6"
            gap="3"
            flexDir="column"
            h="fit-content"
          >
            <Heading fontSize="large">
              {period === '2' ? 'Cast Your Votes' : 'Voting Power'}
            </Heading>
            <Text fontSize="sm" color="gray.500" display="inline">
              Your voting power is determined by your staked SNX on Synthetix V2x and represents the
              influence you hold in the governance process.
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
                {formattedVotePower === '0.00'
                  ? formatNumber(
                      votingPowerSpartan?.power
                        .add(votingPowerAmbassador?.power || 0)
                        .add(votingPowerTreassury?.power || 0)
                        .toString() || 0
                    )
                  : formattedVotePower}
              </Text>
            </Flex>
            <Button
              data-cy="cast-my-vote-button"
              size="md"
              isLoading={isPending}
              isDisabled={
                period !== '2' ||
                !councilToCastVote.length ||
                (spartanVotingPowerIsLoading &&
                  ambassadorVotingPowerIsLoading &&
                  treasuryVotingPowerIsLoading)
              }
              onClick={async () => {
                if (!network?.id) {
                  connect();
                } else {
                  if (councilToCastVote.length !== 3) {
                    setShowConfirmation(true);
                  } else {
                    await mutateAsync();
                  }
                }
              }}
            >
              {!network?.id ? 'Connect Wallet' : 'Cast Votes'}
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <Modal
        isOpen={showConfirmation}
        onClose={() => {
          setShowConfirmation(false);
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent maxW="483px" w="100%">
          <Flex
            flexDirection="column"
            bg="navy.700"
            minW="100%"
            borderColor="cyan.500"
            borderWidth="1px"
            borderStyle="solid"
            rounded="base"
            p="6"
            position="relative"
            h="500px"
            gap="2"
          >
            <Heading fontSize="md">Your haven&apos;t complete your selection</Heading>
            <Text color="gray.500" fontSize="sm">
              You can now vote for multiple councils and cast all your votes in one unique
              transaction:
            </Text>
            {councils.map((council, index) => {
              return (
                <Flex
                  key={`vote-confirmation-${council.slug}`}
                  border="1px solid"
                  borderColor="gray.900"
                  rounded="base"
                  p="2"
                  alignItems="center"
                  mb={index === 2 ? 'auto' : ''}
                >
                  <CouncilImage imageUrl={council?.image} />
                  <Text fontWeight={700} fontSize="sm" mr="auto">
                    {council.title}
                  </Text>

                  {councilsToAddress[council.slug] ? (
                    <ProfilePicture address={councilsToAddress[council.slug]} size={9} />
                  ) : (
                    <Box w={9} h={9} border="1px dashed" borderColor="gray.900" rounded="50%" />
                  )}
                </Flex>
              );
            })}
            <Button onClick={() => setShowConfirmation(false)}>Continue Selection</Button>
            <Button
              variant="outline"
              colorScheme="gray"
              data-cy="cast-vote-anyway-button"
              onClick={() => {
                mutateAsync();
                setShowConfirmation(false);
              }}
            >
              Cast Vote Anyway
            </Button>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
}

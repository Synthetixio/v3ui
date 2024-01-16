import { Flex, Hide, Show, Spinner, Text } from '@chakra-ui/react';
import councils, { CouncilSlugs } from '../../utils/councils';
import { useNavigate } from 'react-router-dom';
import { useGetCurrentPeriod } from '../../queries/useGetCurrentPeriod';
import { useGetVotingCandidates } from '../../queries/useGetVotingCandidates';
import { CouncilsSelect } from './CouncilSelect';
import { CouncilImage } from '../CouncilImage';
import { useGetEpochSchedule } from '../../queries/useGetEpochSchedule';
import Timer from '../Timer/Timer';

export default function CouncilTabs({ activeCouncil }: { activeCouncil: CouncilSlugs }) {
  const { data: councilPeriod } = useGetCurrentPeriod(activeCouncil);
  const { data: votes } = useGetVotingCandidates();
  const { data: schedule, isLoading } = useGetEpochSchedule(activeCouncil);

  const navigate = useNavigate();

  return (
    <>
      <Hide above="lg">
        <Flex
          w="100%"
          bg="navy.700"
          borderBottomWidth="1px"
          borderStyle="solid"
          borderBottomColor="gray.900"
          px={4}
          py={1}
        >
          <CouncilsSelect activeCouncil={activeCouncil} />
        </Flex>
      </Hide>
      <Show above="lg">
        <Flex
          w="100%"
          gap="4"
          bg="navy.700"
          borderBottomWidth="1px"
          borderStyle="solid"
          borderBottomColor="gray.900"
          py="4"
          px="6"
          justifyContent="center"
          mb="4"
          position="sticky"
          top="0px"
        >
          <Flex maxW="1440px" w="100%" justifyContent="center" gap="3">
            {councils.map((council) => (
              <Flex
                key={`tab-${council.slug}`}
                cursor="pointer"
                onClick={() => navigate(`/councils/${council.slug}`)}
                w="100%"
                height="48px"
                rounded="base"
                borderColor={activeCouncil === council.slug ? 'cyan.500' : 'gray.900'}
                borderWidth="1px"
                py="1"
                alignItems="center"
                bg="navy.700"
                _hover={{ borderColor: 'cyan.500' }}
              >
                <CouncilImage ml={2} imageUrl={council.image} />
                <Text fontSize="12px" fontWeight="bold" mr="auto">
                  {council.title}
                </Text>
              </Flex>
            ))}
            <Flex
              key="tab-my-votes"
              cursor="pointer"
              onClick={() => navigate('/my-votes')}
              w="100%"
              height="48px"
              maxW="260px"
              rounded="base"
              borderColor="gray.900"
              borderWidth="1px"
              padding="2"
              alignItems="center"
              bg="navy.900"
              _hover={{ borderColor: 'cyan.500' }}
            >
              <Text fontSize="x-small" fontWeight="bold" mr="auto">
                My Votes
              </Text>
              <Text fontSize="x-small" fontWeight="bold">
                {councilPeriod === '2' && <>{Object.values(!!votes ? votes : {}).length}/4</>}
                {isLoading && <Spinner colorScheme="cyan" />}
                {schedule && (councilPeriod === '1' || councilPeriod === '0') && (
                  <Timer expiryTimestamp={schedule.votingPeriodStartDate * 1000} />
                )}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Show>
    </>
  );
}

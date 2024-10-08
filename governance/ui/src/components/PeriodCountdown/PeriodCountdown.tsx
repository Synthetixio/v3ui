import { Box, Spinner, Text } from '@chakra-ui/react';
import { useGetCurrentPeriod } from '../../queries/useGetCurrentPeriod';
import { useGetEpochSchedule } from '../../queries/useGetEpochSchedule';
import { Timer } from '../Timer';
import { CouncilSlugs } from '../../utils/councils';

export default function PeriodCountdown({ council }: { council: CouncilSlugs }) {
  const { data: councilPeriod } = useGetCurrentPeriod(council);
  const { data: schedule, isLoading } = useGetEpochSchedule(council);

  if (councilPeriod === '3') {
    return (
      <Box
        bg="gray.700"
        rounded="base"
        px={{ base: 1, lg: 3 }}
        py="1"
        w={{ base: '121px', md: '230px' }}
        alignItems="center"
        maxH="50px"
        maxW="fit-content"
        h="fit-content"
      >
        <Text fontSize="12px" lineHeight="short" data-cy="period-countdown" pt="1">
          CLOSED
        </Text>
      </Box>
    );
  }
  return (
    <Box
      bg={councilPeriod === '1' ? 'orange.700' : councilPeriod === '2' ? 'teal.700' : 'gray.700'}
      rounded="base"
      px={{ base: 1, lg: 3 }}
      py="1"
      w={{ base: '121px', md: '230px' }}
      alignItems="center"
      maxH="50px"
      maxW="fit-content"
    >
      <Text fontSize="12px" lineHeight="short" data-cy="period-countdown">
        {councilPeriod === '0'
          ? 'Next Elections:'
          : councilPeriod === '1'
            ? 'Voting starts:'
            : 'Voting ends:'}

        {isLoading ? (
          <Spinner colorScheme="cyan" />
        ) : councilPeriod === '0' && schedule ? (
          <Timer expiryTimestamp={schedule.nominationPeriodStartDate} id="admin" />
        ) : (
          schedule?.votingPeriodStartDate && (
            <Timer
              id="voting"
              expiryTimestamp={
                councilPeriod === '1' ? schedule.votingPeriodStartDate : schedule.endDate
              }
            />
          )
        )}
      </Text>
    </Box>
  );
}

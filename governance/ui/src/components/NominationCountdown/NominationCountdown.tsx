import { Flex, Spinner, Text } from '@chakra-ui/react';
import { useGetCurrentPeriod } from '../../queries/useGetCurrentPeriod';
import { useGetEpochSchedule } from '../../queries/useGetEpochSchedule';
import { useTimer } from 'react-timer-hook';
import { useEffect } from 'react';
import Timer from '../Timer/Timer';

export default function NominationCountdown() {
  const { data: spartanCouncilPeriod } = useGetCurrentPeriod('spartan');
  const { data: ambassadorCouncilPeriod } = useGetCurrentPeriod('ambassador');
  const { data: grantsCouncilPeriod } = useGetCurrentPeriod('grants');
  const { data: treasuryCouncilPeriod } = useGetCurrentPeriod('treasury');

  const atLeastOneIsInNomination =
    spartanCouncilPeriod === '1' ||
    ambassadorCouncilPeriod === '1' ||
    grantsCouncilPeriod === '1' ||
    treasuryCouncilPeriod === '1';

  const { data: schedule, isLoading } = useGetEpochSchedule(
    spartanCouncilPeriod === '1'
      ? 'spartan'
      : ambassadorCouncilPeriod === '1'
        ? 'ambassador'
        : grantsCouncilPeriod === '1'
          ? 'grants'
          : 'treasury'
  );

  return atLeastOneIsInNomination ? (
    <Flex bg="orange.700" rounded="base" px="5" py="1" mr="2" w="230px">
      <Text fontSize="sm" mr="2">
        Voting starts:
      </Text>
      {isLoading ? (
        <Spinner colorScheme="cyan" />
      ) : (
        schedule?.votingPeriodStartDate && (
          <Timer expiryTimestamp={schedule.votingPeriodStartDate * 1000} />
        )
      )}
    </Flex>
  ) : null;
}

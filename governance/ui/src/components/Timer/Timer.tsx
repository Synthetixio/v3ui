import { Text } from '@chakra-ui/react';
import { useTimer } from 'react-timer-hook';

export function Timer({ expiryTimestamp }: { expiryTimestamp: number }) {
  const targetTime = new Date(expiryTimestamp);
  const currentTime = new Date();
  const difference = targetTime.getTime() - currentTime.getTime();
  const time = new Date(currentTime.getTime() + difference);
  const { minutes, hours, days } = useTimer({
    expiryTimestamp: time,
  });

  return (
    <Text
      fontSize="12px"
      fontWeight="bold"
      textAlign="center"
      lineHeight="short"
      data-cy="countdown-timer"
    >
      {days}D {hours}H {minutes}M
    </Text>
  );
}

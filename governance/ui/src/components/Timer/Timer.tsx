import { Text } from '@chakra-ui/react';
import { useTimer } from 'react-timer-hook';

export function Timer({ expiryTimestamp }: { expiryTimestamp: number }) {
  const { minutes, hours, days } = useTimer({
    expiryTimestamp: new Date(expiryTimestamp),
    autoStart: true,
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

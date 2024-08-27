import { Text } from '@chakra-ui/react';
import useCountdown from '../../hooks/useCountdown';

export function Timer({ expiryTimestamp }: { expiryTimestamp: number }) {
  const { days, hours, minutes } = useCountdown(expiryTimestamp);
  return (
    <Text
      // fontSize="12px"
      fontWeight="bold"
      textAlign="center"
      lineHeight="short"
      data-cy="countdown-timer"
    >
      {days}D {hours}H {minutes}M
    </Text>
  );
}

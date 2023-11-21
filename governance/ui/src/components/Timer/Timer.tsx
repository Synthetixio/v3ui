import { Text } from '@chakra-ui/react';
import { useTimer } from 'react-timer-hook';

export default function Timer({ expiryTimestamp }: { expiryTimestamp: number }) {
  const { minutes, hours, days } = useTimer({
    expiryTimestamp: new Date(expiryTimestamp),
    autoStart: true,
  });

  return (
    <Text fontSize={{ base: 'xs', lg: 'sm' }} fontWeight="bold">
      {days}D {hours}H {minutes}M
    </Text>
  );
}

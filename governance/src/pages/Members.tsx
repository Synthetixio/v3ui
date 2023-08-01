import { Flex } from '@chakra-ui/react';
import { UserCard } from '../components/UserCard/UserCard';

export default function Members() {
  return (
    <Flex p={6} gap={6}>
      <UserCard />
    </Flex>
  );
}

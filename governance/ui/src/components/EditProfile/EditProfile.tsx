import { Flex } from '@chakra-ui/react';
import { UserProfileForm } from '../UserProfileForm';

export default function EditProfile({ activeCouncil }: { activeCouncil: string }) {
  return (
    <Flex
      borderWidth="1px"
      borderStyle="solid"
      borderColor="gray.900"
      rounded="base"
      w="100%"
      bg="navy.700"
    >
      <UserProfileForm activeCouncil={activeCouncil} />
    </Flex>
  );
}

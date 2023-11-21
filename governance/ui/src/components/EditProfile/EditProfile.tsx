import { Flex } from '@chakra-ui/react';
import { UserProfileForm } from '../UserProfileForm';
import { useWallet } from '@snx-v3/useBlockchain';
import useGetUserDetailsQuery from '../../queries/useGetUserDetailsQuery';

export default function EditProfile({ activeCouncil }: { activeCouncil: string }) {
  return (
    <Flex
      borderWidth="1px"
      borderStyle="solid"
      borderColor="gray.900"
      rounded="base"
      w="100%"
      maxW="483px"
      bg="navy.700"
    >
      <UserProfileForm activeCouncil={activeCouncil} />
    </Flex>
  );
}

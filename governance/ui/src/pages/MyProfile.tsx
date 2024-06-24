import { Flex, Heading, Text } from '@chakra-ui/react';
import { UserProfileForm } from '../components/UserProfileForm';
import { useWallet } from '../queries';

export default function MyProfile() {
  const { activeWallet } = useWallet();
  if (!activeWallet?.address)
    return (
      <Heading textAlign="center" pt="40vh">
        Please connect your wallet
      </Heading>
    );
  return (
    <Flex flexDir="column" p="4" maxW="1440px">
      <Heading size="lg" mt="6">
        My Profile
      </Heading>
      <Text fontSize="12px" color="gray.500" mb="10">
        Update your profile information below
      </Text>
      <UserProfileForm />
    </Flex>
  );
}

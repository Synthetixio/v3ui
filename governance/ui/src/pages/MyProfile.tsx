import { Flex, Heading, Text } from '@chakra-ui/react';
import { UserProfileForm } from '../components/UserProfileForm';
import { useWallet } from '../queries';
import CouncilTabs from '../components/CouncilTabs/CouncilTabs';

export default function MyProfile() {
  const { activeWallet } = useWallet();
  if (!activeWallet?.address)
    return (
      <Heading textAlign="center" pt="40vh">
        Please connect your wallet
      </Heading>
    );
  return (
    <>
      <CouncilTabs activeCouncil="spartan" />
      <Flex flexDir="column" p="4" maxW="1440px" mx="auto" w="100%">
        <Heading size="lg" mt="6">
          My Profile
        </Heading>
        <Text fontSize="12px" color="gray.500" mb="4">
          Update your profile information below
        </Text>
        <UserProfileForm />
      </Flex>
    </>
  );
}

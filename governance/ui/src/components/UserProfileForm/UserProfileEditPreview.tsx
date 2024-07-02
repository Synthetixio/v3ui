import { Button, Flex, Text } from '@chakra-ui/react';
import { ProfilePicture } from '../UserProfileCard/ProfilePicture';
import { prettyString } from '@snx-v3/format';
import { GetUserDetails } from '../../queries';
import { Socials } from '../Socials';
import { CopyIcon } from '@chakra-ui/icons';

export default function UserProfileEditPreview({
  userData,
  activeWallet,
  isPending,
  onSave,
}: {
  onSave: () => void;
  isPending: boolean;
  activeWallet?: string;
  userData: GetUserDetails;
}) {
  return (
    <Flex
      border="1px solid"
      borderColor={{ base: 'navy.700', xl: 'cyan.500' }}
      rounded="base"
      p="4"
      bg="navy.700"
      flexDir="column"
    >
      <Flex>
        <ProfilePicture imageSrc={userData?.pfpUrl} address={userData?.address} />
        <Flex flexDir="column" w="100%" justifyContent="center" ml="2">
          <Flex justifyContent="space-between">
            <Text fontSize="16px" fontWeight="700" data-cy="username-preview">
              {userData.username ? userData.username : prettyString(activeWallet || '')}
            </Text>
          </Flex>
          <Text fontSize="12px" fontWeight="400" lineHeight="16px" data-cy="about-preview">
            {userData?.about}
          </Text>
        </Flex>
      </Flex>
      <Flex my="4">
        <Socials
          discord={userData?.discord}
          github={userData?.github}
          twitter={userData?.twitter}
        />
      </Flex>
      <Flex flexDirection="column" alignItems="flex-start" mb="6">
        <Text fontSize="14px" fontWeight="700" color="gray.500">
          Wallet Address
        </Text>
        <Button
          size="xs"
          display="flex"
          variant="unstyled"
          onClick={() => {
            try {
              navigator.clipboard.writeText(activeWallet || '');
            } catch (error) {
              console.error(error);
            }
          }}
        >
          <Text mr="1" fontSize="12px">
            {prettyString(activeWallet || '')}
          </Text>
          <CopyIcon w="12px" h="12px" />
        </Button>
      </Flex>
      <Text fontSize="14px" fontWeight="700" color="gray.500">
        Governance Pitch
      </Text>
      <Text
        fontSize="14px"
        lineHeight="20px"
        overflowY="scroll"
        maxH="50vh"
        overflow="scroll"
        mb="4"
        data-cy="governance-pitch-preview"
      >
        {userData?.delegationPitch}
      </Text>
      <Button isLoading={isPending} w="100%" onClick={onSave} data-cy="save-profile-changes-button">
        Save Changes
      </Button>
    </Flex>
  );
}

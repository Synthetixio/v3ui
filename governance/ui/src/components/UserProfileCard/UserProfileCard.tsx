import { Flex, FlexProps } from '@chakra-ui/react';
import { CouncilSlugs } from '../../utils/councils';
import { Members } from '../CouncilMembers/Members';
import { UserProfileDetails } from './UserProfileDetails';

interface UserProfileCardInterface extends FlexProps {
  walletAddress: string;
  activeCouncil: CouncilSlugs;
}

export function UserProfileCard({
  walletAddress,
  activeCouncil,
  ...props
}: UserProfileCardInterface) {
  const userData = Members.find((member) => member.address === walletAddress);

  return (
    <Flex
      flexDir="column"
      bg="navy.700"
      borderRadius="base"
      borderStyle="solid"
      borderColor="cyan.500"
      borderWidth="1px"
      p="4"
      w="100%"
      maxW={{ base: '100%', xl: '451px' }}
      h={{ base: '97vh', xl: '612px' }}
      data-cy={`user-profile-card-${walletAddress}`}
      {...props}
    >
      <UserProfileDetails
        activeCouncil={activeCouncil}
        walletAddress={walletAddress}
        userData={userData}
      />
    </Flex>
  );
}

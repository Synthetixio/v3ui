import { Flex, Show, Text, useDisclosure } from '@chakra-ui/react';
import { useWallet } from '@snx-v3/useBlockchain';
import { useSearchParams } from 'react-router-dom';
import { CouncilSlugs } from '../../utils/councils';
import EditProfile from '../EditProfile/EditProfile';
import { NominateSelfContainer } from '../NominateSelf/NominateSelfContainer';
import { EditNominationContainer } from '../EditNomination/EditNominationContainer';
import { UserProfileCardContainer } from '../UserProfileCard/UserProfileCardContainer';

interface UserActionBoxProps {
  activeCouncil: CouncilSlugs;
}

export default function UserActionBox({ activeCouncil }: UserActionBoxProps) {
  const wallet = useWallet();
  const [searchParams] = useSearchParams();

  const editNomination = searchParams.get('editNomination') === 'true' ? true : false;
  const nominate = searchParams.get('nominate') === 'true' ? true : false;
  const selectedUserAddress = searchParams.get('view') as string;
  const editProfile = searchParams.get('editProfile') === 'true' ? true : false;

  const { onClose } = useDisclosure();

  if (editProfile) {
    return <EditProfile activeCouncil={activeCouncil} onClose={onClose} />;
  }

  if (nominate && wallet?.address) {
    return <NominateSelfContainer activeCouncil={activeCouncil} onClose={onClose} />;
  }

  if (editNomination && wallet?.address) {
    return <EditNominationContainer activeCouncil={activeCouncil} onClose={onClose} />;
  }

  if (selectedUserAddress) {
    return (
      <UserProfileCardContainer
        activeCouncil={activeCouncil}
        onClose={onClose}
        selectedUserAddress={selectedUserAddress}
        wallet={wallet}
      />
    );
  }

  // Empty State
  return (
    <Show above="md">
      <Flex
        w="451px"
        height="651px"
        justifyContent="center"
        alignItems="center"
        borderWidth="1px"
        borderStyle="dashed"
        borderColor="gray.900"
        bg="navy.700"
        rounded="base"
        mt={6}
      >
        <Text
          w="225px"
          color="gray.500"
          fontFamily="heading"
          fontSize="md"
          fontWeight="700"
          textAlign="center"
        >
          Click on a nominee to see their profile details
        </Text>
      </Flex>
    </Show>
  );
}

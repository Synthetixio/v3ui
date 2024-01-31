import { Flex, Show, Text, useDisclosure } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
import { CouncilSlugs } from '../../utils/councils';
import EditProfile from '../EditProfile/EditProfile';
import { NominateSelfContainer } from '../NominateSelf/NominateSelfContainer';
import { EditNominationContainer } from '../EditNomination/EditNominationContainer';
import { SelectedContainer } from '../UserProfileCard/SelectedContainer';
import { useWallet } from '../../queries/useWallet';

interface UserActionBoxProps {
  activeCouncil: CouncilSlugs;
}

export default function UserActionBox({ activeCouncil }: UserActionBoxProps) {
  const { activeWallet } = useWallet();
  const [searchParams] = useSearchParams();

  const editNomination = searchParams.get('editNomination') === 'true' ? true : false;
  const nominate = searchParams.get('nominate') === 'true' ? true : false;
  const selectedUserAddress = searchParams.get('view') as string;
  const editProfile = searchParams.get('editProfile') === 'true' ? true : false;

  const { onClose } = useDisclosure();

  if (editProfile) {
    return <EditProfile activeCouncil={activeCouncil} onClose={onClose} />;
  }

  if (nominate && activeWallet?.address) {
    return <NominateSelfContainer activeCouncil={activeCouncil} onClose={onClose} />;
  }

  if (editNomination && activeWallet?.address) {
    return <EditNominationContainer activeCouncil={activeCouncil} onClose={onClose} />;
  }

  if (selectedUserAddress) {
    return (
      <SelectedContainer
        activeCouncil={activeCouncil}
        onClose={onClose}
        selectedUserAddress={selectedUserAddress}
        isOwn={selectedUserAddress?.toLowerCase() === activeWallet?.address.toLowerCase()}
      />
    );
  }

  // Empty State
  return (
    <Show above="md">
      <Flex
        w="451px"
        h="612px"
        justifyContent="center"
        alignItems="center"
        borderWidth="1px"
        borderStyle="dashed"
        borderColor="gray.900"
        bg="navy.700"
        rounded="base"
        mt={6}
        my="6"
        boxShadow="lg"
      >
        <Text
          w="225px"
          color="gray.500"
          fontFamily="heading"
          fontSize="md"
          fontWeight="700"
          textAlign="center"
        >
          Click on nominee to see <br />
          their profile details
        </Text>
      </Flex>
    </Show>
  );
}

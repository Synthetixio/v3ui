import { Flex, Show, Text, useDisclosure } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
import { CouncilSlugs } from '../../utils/councils';
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

  const { onClose } = useDisclosure();

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
    <Show above="xl">
      <Flex
        minW="451px"
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
        position="sticky"
        top="81px"
      >
        <Text
          w="225px"
          color="gray.500"
          fontFamily="heading"
          fontSize="md"
          fontWeight="700"
          textAlign="center"
          data-cy="empty-state-user-action-box"
        >
          Click on nominee to see <br />
          their profile details
        </Text>
      </Flex>
    </Show>
  );
}

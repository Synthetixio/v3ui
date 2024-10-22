import { Flex, Show, Text, useDisclosure } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
import { CouncilSlugs } from '../../utils/councils';
import { SelectedContainer } from '../UserProfileCard/SelectedContainer';

interface UserActionBoxProps {
  activeCouncil: CouncilSlugs;
}

export default function UserActionBox({ activeCouncil }: UserActionBoxProps) {
  const [searchParams] = useSearchParams();

  const selectedUserAddress = searchParams.get('view') as string;

  const { onClose } = useDisclosure();

  if (selectedUserAddress) {
    return (
      <SelectedContainer
        activeCouncil={activeCouncil}
        onClose={onClose}
        selectedUserAddress={selectedUserAddress}
      />
    );
  }

  // Empty State
  return (
    <Show above="xl">
      <Flex
        mb="24"
        w="100%"
        maxW="451px"
        h="612px"
        justifyContent="center"
        alignItems="center"
        borderWidth="1px"
        borderStyle="dashed"
        borderColor="gray.900"
        bg="navy.700"
        rounded="base"
        mt={6}
        boxShadow="lg"
        position="sticky"
        top="105px"
        data-cy="user-action-box-unselected"
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
          Click on a nominee to see <br />
          their profile details
        </Text>
      </Flex>
    </Show>
  );
}

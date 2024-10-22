import { Show, Modal, ModalOverlay, ModalContent, Hide } from '@chakra-ui/react';
import { UserProfileCard } from './UserProfileCard';
import { CouncilSlugs } from '../../utils/councils';

interface SelectedContainerInterface {
  activeCouncil: CouncilSlugs;
  selectedUserAddress: string;
  onClose: () => void;
}

export const SelectedContainer = ({
  activeCouncil,
  selectedUserAddress,
  onClose,
}: SelectedContainerInterface) => {
  return (
    <>
      <Show below="xl">
        <Modal isOpen={true} onClose={onClose}>
          <ModalOverlay />
          <ModalContent maxW="99vw" width="99vw" margin="4">
            <UserProfileCard walletAddress={selectedUserAddress} activeCouncil={activeCouncil} />
          </ModalContent>
        </Modal>
      </Show>
      <Hide below="xl">
        <UserProfileCard
          position="sticky"
          top="105px"
          mt={6}
          mb={24}
          walletAddress={selectedUserAddress}
          activeCouncil={activeCouncil}
        />
      </Hide>
    </>
  );
};

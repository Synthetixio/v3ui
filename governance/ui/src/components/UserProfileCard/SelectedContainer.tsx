import { Show, Modal, ModalOverlay, ModalContent, Hide } from '@chakra-ui/react';
import { UserProfileCard } from './UserProfileCard';
import { CouncilSlugs } from '../../utils/councils';

interface SelectedContainerInterface {
  activeCouncil: CouncilSlugs;
  selectedUserAddress: string;
  isOwn: boolean;
  onClose: () => void;
}

export const SelectedContainer = ({
  activeCouncil,
  selectedUserAddress,
  onClose,
  isOwn,
}: SelectedContainerInterface) => {
  return (
    <>
      <Show below="xl">
        <Modal isOpen={true} onClose={onClose}>
          <ModalOverlay />
          <ModalContent maxW="99vw" width="99vw" margin="2">
            <UserProfileCard
              walletAddress={selectedUserAddress}
              activeCouncil={activeCouncil}
              isOwn={isOwn}
            />
          </ModalContent>
        </Modal>
      </Show>
      <Hide below="xl">
        <UserProfileCard
          position="sticky"
          top="105px"
          mt={6}
          walletAddress={selectedUserAddress}
          activeCouncil={activeCouncil}
          isOwn={isOwn}
        />
      </Hide>
    </>
  );
};

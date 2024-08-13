import { Show, Modal, ModalOverlay, ModalContent, Hide } from '@chakra-ui/react';
import NominateSelf from './NominateSelf';
import { CouncilSlugs } from '../../utils/councils';

export const NominateSelfContainer = ({
  activeCouncil,
  onClose,
}: {
  activeCouncil: CouncilSlugs;
  onClose: () => void;
}) => {
  return (
    <>
      <Show below="xl">
        <Modal isOpen={true} onClose={onClose}>
          <ModalOverlay />
          <ModalContent maxW="99vw" width="99vw" margin="2">
            <NominateSelf activeCouncil={activeCouncil} />
          </ModalContent>
        </Modal>
      </Show>
      <Hide below="xl">
        <NominateSelf activeCouncil={activeCouncil} position="sticky" top="105px" mt="6" />
      </Hide>
    </>
  );
};

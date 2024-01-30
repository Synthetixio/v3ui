import { Hide, Modal, ModalContent, ModalOverlay, Show } from '@chakra-ui/react';
import { CouncilSlugs } from '../../utils/councils';
import EditNomination from './EditNomination';

export const EditNominationContainer = ({
  activeCouncil,
  onClose,
}: {
  activeCouncil: CouncilSlugs;
  onClose: () => void;
}) => {
  return (
    <>
      <Show below="md">
        <Modal isOpen={true} onClose={onClose}>
          <ModalOverlay />
          <ModalContent mx="4">
            <EditNomination activeCouncil={activeCouncil} />
          </ModalContent>
        </Modal>
      </Show>
      <Hide below="md">
        <EditNomination activeCouncil={activeCouncil} />
      </Hide>
    </>
  );
};

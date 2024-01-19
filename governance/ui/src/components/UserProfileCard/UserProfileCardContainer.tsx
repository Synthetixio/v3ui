import { Show, Modal, ModalOverlay, ModalContent, Hide } from '@chakra-ui/react';
import { UserProfileCard } from './UserProfileCard';
import { CouncilSlugs } from '../../utils/councils';

interface UserProfileCardContainerInterface {
  activeCouncil: CouncilSlugs;
  selectedUserAddress: string;
  wallet?: any; // TODO Update with useBlockchain refactor
  onClose: () => void;
}

export const UserProfileCardContainer = ({
  activeCouncil,
  selectedUserAddress,
  wallet,
  onClose,
}: UserProfileCardContainerInterface) => {
  return (
    <>
      <Show below="md">
        <Modal isOpen={true} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <UserProfileCard
              walletAddress={selectedUserAddress}
              activeCouncil={activeCouncil}
              isOwn={wallet?.address.toLowerCase() === selectedUserAddress.toLowerCase()}
            />
          </ModalContent>
        </Modal>
      </Show>
      <Hide below="md">
        <UserProfileCard
          mt="24px"
          walletAddress={selectedUserAddress}
          activeCouncil={activeCouncil}
          isOwn={wallet?.address.toLowerCase() === selectedUserAddress.toLowerCase()}
        />
      </Hide>
    </>
  );
};

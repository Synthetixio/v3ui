import { Show, Modal, ModalOverlay, ModalContent, Hide } from '@chakra-ui/react';
import { UserProfileCard } from './UserProfileCard';
import { CouncilSlugs } from '../../utils/councils';
import { Account } from '@web3-onboard/core/dist/types';

interface UserProfileCardContainerInterface {
  activeCouncil: CouncilSlugs;
  selectedUserAddress: string;
  wallet?: Account;
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
          mt={6}
          walletAddress={selectedUserAddress}
          activeCouncil={activeCouncil}
          isOwn={wallet?.address.toLowerCase() === selectedUserAddress.toLowerCase()}
        />
      </Hide>
    </>
  );
};

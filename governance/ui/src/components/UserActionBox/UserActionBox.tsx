import {
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import { UserProfileCard } from '../UserProfileCard';
import { CouncilSlugs } from '../../utils/councils';
import { useWallet } from '@snx-v3/useBlockchain';
import EditProfile from '../EditProfile/EditProfile';
import EditNomination from '../EditNomination/EditNomination';
import NominateSelf from '../NominateSelf/NominateSelf';

export default function UserActionBox({
  editNomination,
  nominate,
  activeCouncil,
  selectedUserAddress,
  editProfile,
}: {
  nominate: boolean;
  editNomination: boolean;
  activeCouncil: CouncilSlugs;
  selectedUserAddress?: string;
  editProfile: boolean;
}) {
  const wallet = useWallet();
  const [md] = useMediaQuery('(min-width: 768px)');
  const { onClose } = useDisclosure();

  if (editProfile) {
    if (!md)
      return (
        <Modal isOpen={true} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <EditProfile activeCouncil={activeCouncil} />
          </ModalContent>
        </Modal>
      );
    return <EditProfile activeCouncil={activeCouncil} />;
  }

  if (nominate && wallet?.address) {
    if (!md)
      return (
        <Modal isOpen={true} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <NominateSelf activeCouncil={activeCouncil} />
          </ModalContent>
        </Modal>
      );
    return <NominateSelf activeCouncil={activeCouncil} />;
  }

  if (editNomination && wallet?.address) {
    if (!md)
      return (
        <Modal isOpen={true} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <EditNomination activeCouncil={activeCouncil} />
          </ModalContent>
        </Modal>
      );
    return <EditNomination activeCouncil={activeCouncil} />;
  }

  if (selectedUserAddress) {
    if (!md) {
      return (
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
      );
    }
    return (
      <UserProfileCard
        walletAddress={selectedUserAddress}
        activeCouncil={activeCouncil}
        isOwn={wallet?.address.toLowerCase() === selectedUserAddress.toLowerCase()}
      />
    );
  }

  return md ? (
    <Flex
      w="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
      borderWidth="1px"
      borderStyle="dashed"
      borderColor="gray.900"
      bg="navy.700"
      rounded="base"
    >
      <Text color="gray.500" fontSize="md" fontWeight="700" textAlign="center">
        Click on a nominee to see their profile details
      </Text>
    </Flex>
  ) : null;
}

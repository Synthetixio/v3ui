import {
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  Show,
  Hide,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { UserProfileCard } from '../UserProfileCard';
import { CouncilSlugs } from '../../utils/councils';
import { useWallet } from '@snx-v3/useBlockchain';
import EditProfile from '../EditProfile/EditProfile';
import EditNomination from '../EditNomination/EditNomination';
import NominateSelf from '../NominateSelf/NominateSelf';
import { useSearchParams } from 'react-router-dom';

export default function UserActionBox({ activeCouncil }: { activeCouncil: CouncilSlugs }) {
  const wallet = useWallet();
  const [searchParams] = useSearchParams();

  const editNomination = searchParams.get('editNomination') === 'true' ? true : false;
  const nominate = searchParams.get('nominate') === 'true' ? true : false;
  const selectedUserAddress = searchParams.get('view') as string;
  const editProfile = searchParams.get('editProfile') === 'true' ? true : false;

  console.log('editNomination', editNomination);
  console.log('nominate', nominate);
  console.log('selectedUserAddress', selectedUserAddress);
  console.log('editProfile', editProfile);

  const { onClose } = useDisclosure();

  if (editProfile) {
    return (
      <>
        <Show below="md">
          <Modal isOpen={true} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <EditProfile activeCouncil={activeCouncil} />
            </ModalContent>
          </Modal>
        </Show>
        <Hide below="md">
          <EditProfile activeCouncil={activeCouncil} />
        </Hide>
      </>
    );
  }

  if (nominate && wallet?.address) {
    return (
      <>
        <Show below="md">
          <Modal isOpen={true} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <NominateSelf activeCouncil={activeCouncil} />
            </ModalContent>
          </Modal>
        </Show>
        <Hide below="md">
          <NominateSelf activeCouncil={activeCouncil} />
        </Hide>
      </>
    );
  }

  if (editNomination && wallet?.address) {
    return (
      <>
        <Show below="md">
          <Modal isOpen={true} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <EditNomination activeCouncil={activeCouncil} />
            </ModalContent>
          </Modal>
        </Show>
        <Hide below="md">
          <EditNomination activeCouncil={activeCouncil} />
        </Hide>
      </>
    );
  }

  if (selectedUserAddress) {
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
            walletAddress={selectedUserAddress}
            activeCouncil={activeCouncil}
            isOwn={wallet?.address.toLowerCase() === selectedUserAddress.toLowerCase()}
          />
        </Hide>
      </>
    );
  }

  // Base empty state
  return (
    <Show above="md">
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
    </Show>
  );
}

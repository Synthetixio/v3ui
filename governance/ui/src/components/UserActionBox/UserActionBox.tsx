import { Box, Flex, Text } from '@chakra-ui/react';
import { UserProfileCard } from '../UserProfileCard';
import NominateSelf from '../NominateSelf/NominateSelf';
import { CouncilSlugs } from '../../utils/councils';
import { useGetIsNominated } from '../../queries/useGetIsNominated';
import { useWallet } from '@snx-v3/useBlockchain';
import EditProfile from '../EditProfile/EditProfile';

export default function UserActionBox({
  editNominationModalIsOpen,
  nominationModalIsOpen,
  activeCouncil,
  selectedUserAddress,
  editProfile,
}: {
  nominationModalIsOpen: boolean;
  editNominationModalIsOpen: boolean;
  activeCouncil: CouncilSlugs;
  selectedUserAddress?: string;
  editProfile: boolean;
}) {
  const wallet = useWallet();
  const { data: isNominated } = useGetIsNominated(wallet?.address);

  if (editProfile) {
    return <EditProfile activeCouncil={activeCouncil} />;
  }

  if (!selectedUserAddress && !nominationModalIsOpen && !editNominationModalIsOpen) {
    return (
      <Flex
        w="483px"
        h="644px"
        justifyContent="center"
        alignItems="center"
        borderWidth="1px"
        borderStyle="dashed"
        borderColor="gray.900"
        bg="navy.700"
        rounded="base"
      >
        <Text color="gray.500" fontSize="md" fontWeight="700">
          Click on a nominee to see their profile details
        </Text>
      </Flex>
    );
  }

  if (selectedUserAddress) {
    return (
      <UserProfileCard
        walletAddress={selectedUserAddress}
        activeCouncil={activeCouncil}
        isOwn={wallet?.address.toLowerCase() === selectedUserAddress.toLowerCase()}
      />
    );
  }

  if (editNominationModalIsOpen && wallet?.address) {
    //  <EditNomination activeCouncil={activeCouncil} />;
    return (
      <UserProfileCard
        walletAddress={wallet.address}
        isNominated={typeof isNominated === 'boolean' ? isNominated : true}
        activeCouncil={activeCouncil}
        isOwn
      />
    );
  }

  if (
    (!nominationModalIsOpen && wallet?.address) ||
    selectedUserAddress ||
    (wallet?.address && typeof isNominated === 'object')
  ) {
    return (
      <UserProfileCard
        walletAddress={selectedUserAddress || wallet!.address}
        isNominated={typeof isNominated === 'boolean' ? isNominated : true}
        activeCouncil={activeCouncil}
        isOwn={wallet?.address.toLowerCase() === selectedUserAddress?.toLowerCase()}
      />
    );
  }

  return (
    <Box
      w="100%"
      //   position="absolute"
      //   opacity={0.5}
      //   bg="black"
      //   top="0px"
      //   bottom="0px"
      //   right="0px"
      //   left="0px"
      //   w="100%"
    >
      {typeof isNominated === 'boolean' && !isNominated && (
        <NominateSelf activeCouncil={activeCouncil} />
      )}
    </Box>
    // <Modal isOpen={isOpen} onClose={onClose}>
    //   <ModalOverlay />
    //   <ModalContent containerProps={{ justifyContent: 'flex-end', paddingRight: '2rem' }}>
    //     test
    //   </ModalContent>
    // </Modal>
  );
}

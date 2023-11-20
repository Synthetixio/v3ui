import { Box, useDisclosure } from '@chakra-ui/react';
import { UserProfileCard } from '../UserProfileCard';
import NominateSelf from '../NominateSelf/NominateSelf';
import { Council, CouncilSlugs } from '../../utils/councils';
import { useGetIsNominated } from '../../queries/useGetIsNominated';
import { useWallet } from '@snx-v3/useBlockchain';

export default function UserActionBox({
  nominationModalIsOpen,
  activeCouncil,
  selectedUserAddress,
}: {
  nominationModalIsOpen: boolean;
  activeCouncil: CouncilSlugs;
  selectedUserAddress?: string;
}) {
  const wallet = useWallet();
  const { data: isNominated } = useGetIsNominated(wallet?.address);
  const { isOpen, onOpen, onClose } = useDisclosure();

  //   useEffect(() => {
  //     if (nominationModalIsOpen) {
  //       onOpen();
  //     }
  //   }, [nominationModalIsOpen]);

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

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Text,
  Divider,
  Button,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const UnsupportedCollateralAlert = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <Modal isOpen={isOpen} onClose={() => {}}>
      <ModalOverlay />
      <ModalContent p={6} borderWidth="1px" borderColor="gray.900" mt="17.5%" bg="navy.700">
        <ModalHeader p={0}>Collateral Not Supported</ModalHeader>
        <Divider my={6} />
        <Text color="white" fontFamily="heading" fontSize="14px" lineHeight="20px">
          This collateral is not supported on this network. Go back to your dashboard to see your
          active positions on this network.
        </Text>
        <Button
          as={Link}
          mt={6}
          to={{
            pathname: '/dashboard',
            search: location.search,
          }}
        >
          Back to Dashboard
        </Button>
      </ModalContent>
    </Modal>
  );
};

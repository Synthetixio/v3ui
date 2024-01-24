import { Flex, UseToastOptions, Text } from '@chakra-ui/react';
import { CloseIcon, InfoIcon } from '@chakra-ui/icons';

interface CustomToastProps extends UseToastOptions {
  onClose: () => void;
}

export const CustomToast = ({ onClose, status, description }: CustomToastProps) => {
  const { bg, icon, borderColor } = getStyle(status);
  return (
    <Flex
      w={{ base: '90vw', md: '448px' }}
      bg={bg}
      borderWidth="2px"
      borderRadius="6px"
      borderColor={borderColor}
      justifyContent="space-between"
    >
      <Flex mx="4" alignItems="center">
        {icon}
      </Flex>
      <Flex width="92.5%" py="2">
        <Text
          py="1"
          fontSize="16px"
          fontFamily="heading"
          fontWeight="700"
          lineHeight="24px"
          color="white"
        >
          {description}
        </Text>
      </Flex>
      <Flex mr="2" pt="2">
        <CloseIcon
          w="10px"
          h="10px"
          color="white"
          cursor="pointer"
          onClick={() => {
            onClose();
          }}
        />
      </Flex>
    </Flex>
  );
};

function getStyle(status: 'info' | 'warning' | 'success' | 'error' | 'loading' | undefined) {
  switch (status) {
    case 'success':
      return {
        icon: <InfoIcon color="green.500" />,
        bg: 'green.900',
        borderColor: 'green.500',
      };

    default:
      return {
        icon: <InfoIcon color="blue.500" />,
        bg: 'blue.900',
        borderColor: 'blue.500',
      };
  }
}

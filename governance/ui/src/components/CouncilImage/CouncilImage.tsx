import { FlexProps, Flex, Image } from '@chakra-ui/react';

interface CouncilImageProps extends FlexProps {
  imageUrl: string;
}

export const CouncilImage = ({ imageUrl, ...props }: CouncilImageProps) => {
  return (
    <Flex
      borderRadius="50%"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="gray.900"
      w="8"
      h="8"
      justifyContent="center"
      alignItems="center"
      mr="3"
      {...props}
    >
      <Image src={imageUrl} w="6" h="6" />
    </Flex>
  );
};

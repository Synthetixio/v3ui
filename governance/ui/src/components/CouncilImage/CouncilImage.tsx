import { FlexProps, Flex, Image, ImageProps } from '@chakra-ui/react';

interface CouncilImageProps extends FlexProps {
  imageUrl: string;
  imageProps?: ImageProps;
  dataCy?: string;
}

export const CouncilImage = ({ imageUrl, imageProps, dataCy, ...props }: CouncilImageProps) => {
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
      bg="navy.700"
      data-cy={dataCy?.concat('-circle')}
      {...props}
    >
      <Image src={imageUrl} w="6" h="6" data-cy={dataCy} {...imageProps} />
    </Flex>
  );
};

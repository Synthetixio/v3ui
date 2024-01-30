import { Box, Image, ImageProps } from '@chakra-ui/react';
import Blockies from 'react-blockies';

interface ProfilePictureInterface {
  imageSrc?: string;
  address?: string;
  ImageProps?: ImageProps;
  blockiesSize?: number;
  mr?: string;
}

export const ProfilePicture = ({
  imageSrc,
  address,
  ImageProps,
  blockiesSize = 14,
  mr = '4',
}: ProfilePictureInterface) => {
  return (
    <>
      {imageSrc ? (
        <Image borderRadius="full" src={imageSrc} w="56px" h="56px" mr={mr} {...ImageProps} />
      ) : (
        address && (
          <Box
            mr={mr}
            borderRadius="100%"
            sx={{
              '.fully-rounded': {
                borderRadius: '99999px',
              },
            }}
          >
            <Blockies size={blockiesSize} seed={address?.toLowerCase()} className="fully-rounded" />
          </Box>
        )
      )}
    </>
  );
};

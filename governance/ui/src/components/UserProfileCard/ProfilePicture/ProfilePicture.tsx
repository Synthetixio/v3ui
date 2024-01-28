import { Box, Image, ImageProps } from '@chakra-ui/react';
import Blockies from 'react-blockies';

interface ProfilePictureInterface {
  imageSrc?: string;
  address?: string;
  ImageProps?: ImageProps;
}

export const ProfilePicture = ({ imageSrc, address, ImageProps }: ProfilePictureInterface) => {
  return (
    <>
      {imageSrc ? (
        <Image borderRadius="full" src={imageSrc} w="56px" h="56px" mr="4" {...ImageProps} />
      ) : (
        address && (
          <Box
            mr="4"
            borderRadius="100%"
            sx={{
              '.fully-rounded': {
                borderRadius: '99999px',
              },
            }}
          >
            <Blockies size={14} seed={address?.toLowerCase()} className="fully-rounded" />
          </Box>
        )
      )}
    </>
  );
};

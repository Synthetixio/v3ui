import { Box, Image, ImageProps } from '@chakra-ui/react';
import Blockies from 'react-blockies';

interface ProfilePictureInterface {
  imageSrc?: string;
  address?: string;
  ImageProps?: ImageProps;
  size?: number;
  mr?: string;
  ml?: string;
}

export const ProfilePicture = ({
  imageSrc,
  address,
  ImageProps,
  size = 14,
  mr = '4',
  ml,
}: ProfilePictureInterface) => {
  return (
    <>
      {imageSrc ? (
        <Image
          borderRadius="full"
          src={imageSrc}
          w={size}
          h={size}
          mr={mr}
          ml={ml}
          {...ImageProps}
          zIndex={10}
        />
      ) : (
        address && (
          <Box
            mr={mr}
            ml={ml}
            borderRadius="50%"
            sx={{
              '.fully-rounded': {
                borderRadius: '99999px',
              },
            }}
            zIndex={10}
          >
            <Blockies size={size} seed={address?.toLowerCase()} className="fully-rounded" />
          </Box>
        )
      )}
    </>
  );
};

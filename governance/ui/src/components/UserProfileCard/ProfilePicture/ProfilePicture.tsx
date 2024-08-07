import { Box, Image, ImageProps } from '@chakra-ui/react';
import Blockies from 'react-blockies';

interface ProfilePictureInterface {
  imageSrc?: string;
  address?: string;
  ImageProps?: ImageProps;
  size?: number;
  mr?: string;
  ml?: string;
  newVoteCast?: string;
}

export const ProfilePicture = ({
  imageSrc,
  address,
  ImageProps,
  size = 14,
  mr,
  ml,
  newVoteCast,
}: ProfilePictureInterface) => {
  return (
    <>
      {imageSrc ? (
        <Box zIndex={10} position="relative">
          {!!newVoteCast && (
            <Box
              bg="lightgray"
              opacity={0.5}
              h={size}
              w={size}
              borderRadius="100%"
              position="absolute"
              zIndex={11}
            />
          )}
          <Image
            borderRadius="full"
            src={imageSrc}
            w={size}
            h={size}
            mr={mr}
            ml={ml}
            {...ImageProps}
          />
        </Box>
      ) : (
        (address || !!newVoteCast) && (
          <Box
            mr={mr}
            ml={ml}
            borderRadius="100%"
            sx={{
              '.fully-rounded': {
                borderRadius: '99999px',
              },
            }}
            zIndex={10}
            position="relative"
            data-cy={`user-blockies-council-tabs-${address || newVoteCast}`}
          >
            {!!newVoteCast && (
              <Box
                bg="lightgray"
                opacity={0.5}
                h={size}
                w={size}
                borderRadius="100%"
                position="absolute"
                zIndex={11}
              />
            )}
            <Blockies
              size={size}
              seed={address?.toLowerCase() || newVoteCast?.toLowerCase() || ''}
              className="fully-rounded"
            />
          </Box>
        )
      )}
    </>
  );
};

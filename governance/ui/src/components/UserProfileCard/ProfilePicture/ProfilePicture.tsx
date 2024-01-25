import { Box, Image } from '@chakra-ui/react';
import Blockies from 'react-blockies';
import '../UserProfileCard.css';

interface ProfilePictureInterface {
  imageSrc?: string;
  address?: string;
}

export const ProfilePicture = ({ imageSrc, address }: ProfilePictureInterface) => {
  return (
    <>
      {imageSrc ? (
        <Image borderRadius="full" src={imageSrc} w="56px" h="56px" mr="4" />
      ) : address ? (
        <Box mr="4">
          <Blockies size={14} seed={address?.toLowerCase()} className="fully-rounded" />
        </Box>
      ) : (
        <Box
          borderRadius="50%"
          w="8"
          h="8"
          position="absolute"
          left="15px"
          borderWidth="1px"
          bg="navy.700"
          borderStyle="dashed"
          borderColor="gray.500"
        />
      )}
    </>
  );
};

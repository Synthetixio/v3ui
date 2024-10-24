import { Box } from '@chakra-ui/react';
import Blockies from 'react-blockies';

interface ProfilePictureInterface {
  address?: string;
  size?: number;
  mr?: string;
  ml?: string;
  newVoteCast?: string;
  isCouncilTabs?: boolean;
}

export const ProfilePicture = ({
  address,
  size = 14,
  mr,
  ml,
  newVoteCast,
  isCouncilTabs,
}: ProfilePictureInterface) => {
  if (address || newVoteCast) {
    return (
      <Box
        mr={mr}
        ml={ml}
        borderRadius="100%"
        sx={{
          '.fully-rounded': {
            borderRadius: '99999px',
          },
        }}
        filter={isCouncilTabs ? 'grayscale(1)' : ''}
        zIndex={10}
        position="relative"
        data-cy={`user-blockies-council-tabs-${address}`}
      >
        <Blockies size={size} seed={address?.toLowerCase() || ''} className="fully-rounded" />
      </Box>
    );
  }
  return <Box h={size} w={size} borderRadius="100%" position="absolute" zIndex={11} />;
};

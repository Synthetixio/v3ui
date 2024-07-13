import { Link as ReactRouterLink, useLocation } from 'react-router-dom';
import { Link, LinkProps } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

export const HomeLink = ({ ...props }: LinkProps) => {
  const location = useLocation();

  return (
    <Link
      px={3}
      py={2}
      width="fit-content"
      display="flex"
      alignItems="center"
      variant="outline"
      lineHeight="20px"
      color="white"
      borderRadius="4px"
      as={ReactRouterLink}
      borderWidth="1px"
      borderColor="gray.900"
      _hover={{ textTransform: 'none', opacity: 0.9 }}
      to={{
        pathname: '/',
        search: location.search,
      }}
      fontSize="sm"
      fontWeight={700}
      mb={2}
      {...props}
    >
      <ArrowBackIcon mr={1} /> All Pools
    </Link>
  );
};

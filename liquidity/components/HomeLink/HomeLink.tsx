import { Link as ReactRouterLink, useLocation } from 'react-router-dom';
import { Link, LinkProps } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

export const HomeLink = ({ ...props }: LinkProps) => {
  const location = useLocation();

  return (
    <Link
      width="fit-content"
      display="flex"
      alignItems="center"
      color="cyan.500"
      as={ReactRouterLink}
      to={{
        pathname: '/',
        search: location.search,
      }}
      fontSize="sm"
      fontWeight={700}
      mb={2}
      {...props}
    >
      <ArrowBackIcon mr={1} /> Home
    </Link>
  );
};

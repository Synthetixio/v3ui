import { Flex, Heading, Link } from '@chakra-ui/react';
import Head from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Link as NavLink } from 'react-router-dom';

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t('not-found.page-title')}</title>
      </Head>
      <Flex
        height="100%"
        direction="column"
        position="relative"
        alignItems="center"
        justifyContent="center"
        flex="1"
      >
        <Heading fontSize="5xl">Not found</Heading>

        <NavLink to="/">
          <Link color="cyan.500">Return to Home</Link>
        </NavLink>
      </Flex>
    </>
  );
};

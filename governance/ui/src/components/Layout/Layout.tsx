import { Flex } from '@chakra-ui/react';
import Footer from '../Footer/Footer';
import { Header } from '../Header';
import { Outlet } from 'react-router-dom';
import Head from 'react-helmet';

export function Layout() {
  return (
    <>
      <Head>
        {/* open graph */}
        <meta property="og:url" content="https://governance.synthetix.io/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Synthetix | Governance" />
        <meta property="og:description" content="Synthetix v3 Governance" />
        <meta property="og:image" content="https://governance.synthetix.io/governance.png" />
        <meta property="og:image:alt" content="Synthetix | Governance" />
        <meta property="og:site_name" content="" />
        {/* twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@synthetix_io" />
        <meta name="twitter:creator" content="@synthetix_io" />
        <meta name="twitter:image" content="https://governance.synthetix.io/governance.png" />
        <meta name="twitter:url" content="https://governance.synthetix.io/governance.png" />
      </Head>

      <Flex minH="100vh" flexDir="column">
        <Header />
        <Outlet />
        <Footer />
      </Flex>
    </>
  );
}

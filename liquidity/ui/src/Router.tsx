import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';
import { DefaultLayout } from './layouts/Default';
import { Home, Manage, NotFoundPage, Dashboard, Pool, Pools } from './pages';
import { Settings } from './pages/Account/Settings';

export const Router = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/account/settings" element={<Settings />} />
          <Route path="/positions/:collateralSymbol/:poolId" element={<Manage />} />
          <Route path="/pools" element={<Pools />} />
          <Route path="/pools/:poolId" element={<Pool />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

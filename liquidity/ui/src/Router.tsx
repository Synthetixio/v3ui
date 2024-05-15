import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';
import { DefaultLayout } from './layouts/Default';
import { Home } from './pages/Home';
import { Manage } from './pages/Manage';
import { Deposit } from './pages/Deposit';
import { Pool } from './pages/Pool';
import { Playground } from './pages/Playground';
import { Teleporter } from './pages/Teleporter';
import { NotFoundPage } from './pages/404';
import { Pools } from './pages/Pools';
import { Dashboard } from './pages/Dashboard';

export const Router = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/positions/:collateralSymbol/:poolId" element={<Manage />} />
          <Route path="/deposit/:collateralSymbol/:poolId" element={<Deposit />} />
          <Route path="/pools" element={<Pools />} />
          <Route path="/pools/:poolId" element={<Pool />} />
          <Route path="/teleporter" element={<Teleporter />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';
import { DefaultLayout } from './layouts/Default';
import { Home } from './pages/Home';
import { DepositBaseAndromeda } from './pages/Deposit';
import { Pool } from './pages/Pool';
import { Playground } from './pages/Playground';
import { NotFoundPage } from './pages/404';
import { Pools } from './pages/Pools';
import { useNetwork } from '@snx-v3/useBlockchain';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { RepayBaseAndromeda } from './pages/Manage';

export const Router = () => {
  const { network } = useNetwork();

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route
            path="/deposit/:collateralSymbol/:collateralAddress/:poolId"
            element={
              isBaseAndromeda(network?.id, network?.preset) ? (
                <DepositBaseAndromeda />
              ) : (
                <DepositBaseAndromeda />
              )
            }
          />
          <Route
            path="/repay/:collateralSymbol/:collateralAddress/:poolId"
            element={
              isBaseAndromeda(network?.id, network?.preset) ? (
                <RepayBaseAndromeda />
              ) : (
                <RepayBaseAndromeda />
              )
            }
          />
          <Route path="/pools" element={<Pools />} />
          <Route path="/pools/:poolId" element={<Pool />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

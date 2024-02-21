import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';
import { DefaultLayout } from './layouts/Default';
import { Home } from './pages/Home';
import { Manage } from './pages/Manage';
import { Deposit } from './pages/Deposit';
// import { CreateAccount, Settings, Collateral, AcceptNomination } from './pages/Account';
// import { CreateMarket } from './pages/Markets/CreateMarket';
// import { Market } from './pages/Markets/Market';
import { Pool } from './pages/Pool';
import { Playground } from './pages/Playground';
import { Teleporter } from './pages/Teleporter';
import { NotFoundPage } from './pages/404';
import { Dashboard } from './pages/Dashboard';
import { Pools } from './pages/Pools';

export const Router = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/positions/:collateralSymbol/:poolId" element={<Manage />} />
          <Route path="/deposit/:collateralSymbol/:poolId" element={<Deposit />} />
          <Route path="/dashboard/positions" element={<Dashboard />} />
          {/*<Route path="/collateral" element={<Collateral />} />*/}
          {/*<Route path="/accept-nomination" element={<AcceptNomination />} />*/}
          {/*<Route path="/settings" element={<Settings />} />*/}
          {/*<Route path="/accounts/create" element={<CreateAccount />} />*/}
          <Route path="/pools" element={<Pools />} />
          <Route path="/pools/:poolId" element={<Pool />} />
          {/*<Route path="/markets/create" element={<CreateMarket />} />*/}
          {/*<Route path="/markets/:marketId" element={<Market />} />*/}
          <Route path="/teleporter" element={<Teleporter />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

import { autoConnect, preserveConnectedWallets } from '@snx-v3/useBlockchain';
import { Header } from '../Header';
import { Outlet } from 'react-router-dom';

preserveConnectedWallets();
autoConnect();

export function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

import { Header } from '../Header';
import { Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

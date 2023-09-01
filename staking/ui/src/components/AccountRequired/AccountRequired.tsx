import { useAccounts } from '@snx-v3/useAccounts';
import { JSX } from 'react';
import { Navigate } from 'react-router-dom';

interface AccountRequiredProps {
  redirectPath?: string;
  children: JSX.Element;
}

export const AccountRequired = ({
  redirectPath,
  children,
}: AccountRequiredProps): JSX.Element | null => {
  const { data: accounts } = useAccounts();

  if (!accounts || accounts.length === 0) {
    return <Navigate to={redirectPath ? redirectPath : '/'} replace />;
  }

  return children;
};

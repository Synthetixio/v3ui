import { AssetsTable } from './AssetTable';
import { useAccountCollateral } from '@snx-v3/useAccountCollateral';
import { useSearchParams } from 'react-router-dom';

export const AssetsList = () => {
  const [params] = useSearchParams();
  const { data: accountCollaterals, isLoading } = useAccountCollateral({
    accountId: params.get('accountId') || undefined,
  });

  return <AssetsTable isLoading={isLoading} accountCollaterals={accountCollaterals} />;
};

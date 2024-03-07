import { AssetsTable } from './AssetTable';
import { Asset } from '../../pages/Home';

export const AssetsList = ({ isLoading, assets }: { isLoading: boolean; assets?: Asset[] }) => {
  return <AssetsTable isLoading={isLoading} assets={assets} />;
};

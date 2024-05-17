import { usePools } from '@snx-v3/usePools';
import { useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { useApr } from '@snx-v3/useApr';
import { useVaultsData } from '@snx-v3/useVaultsData';
import { PoolsList } from '../components/Pools';

export function Pools() {
  return <PoolsList />;
}

import { usePools } from '@snx-v3/usePools';

export function Dashboard() {
  const pools = usePools();
  console.log(pools.data, pools.error);
  return 'Dashboard';
}

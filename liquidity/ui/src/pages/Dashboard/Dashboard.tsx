import { usePools } from '@snx-v3/usePools';

export function Dashboard() {
  const pools = usePools();

  if (!pools.data) return 'Dashboard';
}

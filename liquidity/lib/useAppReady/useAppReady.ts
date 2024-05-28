import { useIsConnected } from '@snx-v3/useBlockchain';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useMulticall3 } from '@snx-v3/useMulticall3';
import { useEffect, useState } from 'react';

export function useAppReady() {
  const isConnected = useIsConnected();
  const { data: CoreProxy } = useCoreProxy();
  const { data: Multicall3 } = useMulticall3();
  const [isAppReady, setAppReady] = useState(false);

  useEffect(() => {
    if (CoreProxy && Multicall3 && isConnected) {
      setAppReady(true);
    }
  }, [CoreProxy, Multicall3, isConnected]);

  return isAppReady;
}

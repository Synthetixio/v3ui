import { useIsConnected } from '@snx-v3/useBlockchain';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useMulticall3 } from '@snx-v3/useMulticall3';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

const AppReadyContext = createContext<boolean>(false);

export function useAppReady() {
  return useContext(AppReadyContext);
}

export const AppReadyProvider = ({ children }: { children: ReactNode }) => {
  const isConnected = useIsConnected();
  const { data: CoreProxy } = useCoreProxy();
  const { data: Multicall3 } = useMulticall3();
  const [isAppReady, setAppReady] = useState(false);

  useEffect(() => {
    if (isConnected && CoreProxy && Multicall3) {
      setAppReady(true);
    }
  }, [isConnected, CoreProxy, Multicall3]);

  return <AppReadyContext.Provider value={isAppReady}>{children}</AppReadyContext.Provider>;
};

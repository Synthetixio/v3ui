import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useMutation } from '@tanstack/react-query';

export function useNotifyAccountTransfer(to: string, accountId: string) {
  const { data: CoreProxy } = useCoreProxy();

  return useMutation({
    mutationFn: async () => {
      if (!CoreProxy) throw new Error('CoreProxy not defined');
      const tx = await CoreProxy.notifyAccountTransfer(to, accountId);
      tx.wait();
      return 'done';
    },
  });
}

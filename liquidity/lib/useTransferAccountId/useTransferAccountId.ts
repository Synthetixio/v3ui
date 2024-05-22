import { useAccountProxy } from '@snx-v3/useAccountProxy';
import { useWallet } from '@snx-v3/useBlockchain';
import { useMutation } from '@tanstack/react-query';

export function useTransferAccountId(to: string, accountId: string) {
  const { data: AccountProxy } = useAccountProxy();
  const { activeWallet } = useWallet();

  return useMutation({
    mutationFn: async () => {
      if (!AccountProxy) throw new Error('CoreProxy or Multicall not defined');
      if (!activeWallet?.address) throw new Error('Wallet is not connected');
      const tx = await AccountProxy.transferFrom(activeWallet.address, to, accountId);
      const response = await tx.wait();
      return response;
    },
  });
}

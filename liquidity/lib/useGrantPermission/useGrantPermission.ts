import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useMulticall3 } from '@snx-v3/useMulticall3';
import { useMutation } from '@tanstack/react-query';
import { utils } from 'ethers';

export function useGrantPermission(to: string, accountId: string, permissions: string[]) {
  const { data: CoreProxy } = useCoreProxy();
  const { data: multicall } = useMulticall3();

  return useMutation({
    mutationFn: async () => {
      if (!to) throw new Error('to is not defined');
      if (!(CoreProxy && multicall)) throw new Error('CoreProxy or Multicall not defined');
      const permissionsData = permissions.map((permission) => ({
        target: CoreProxy.address,
        callData: CoreProxy.interface.encodeFunctionData('grantPermission', [
          accountId,
          utils.formatBytes32String(permission),
          to,
        ]),
        allowFailure: false,
        requireSuccess: true,
      }));
      const tx = await multicall.aggregate3(permissionsData);
      tx.wait();
      return 'done';
    },
  });
}

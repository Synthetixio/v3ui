import { useAccountProxy } from '@snx-v3/useAccountProxy';
import { useNetwork } from '@snx-v3/useBlockchain';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useMulticall3 } from '@snx-v3/useMulticall3';
import { useQuery } from '@tanstack/react-query';
import { utils } from 'ethers';

export function useAccountPermissions(accountIds: string[] | undefined) {
  const { data: CoreProxy } = useCoreProxy();
  const { data: Multicall } = useMulticall3();
  const { network } = useNetwork();

  return useQuery({
    queryKey: [`${network?.id}-${network?.preset}`, 'account-permissions', accountIds?.toString()],
    queryFn: async function () {
      if (!CoreProxy || !accountIds || !Multicall) throw new Error('Should be disabled');
      const permissionsReturnData = await Multicall?.callStatic.aggregate3(
        accountIds.map((accountId) => ({
          requireSuccess: true,
          target: CoreProxy.address,
          callData: CoreProxy.interface.encodeFunctionData('getAccountPermissions', [accountId]),
          allowFailure: false,
        }))
      );

      return permissionsReturnData
        ?.map((data) => {
          if (typeof data === 'object' && 'returnData' in data)
            return CoreProxy.interface.decodeFunctionResult(
              'getAccountPermissions',
              data!.returnData
            )[0] as utils.Result;
        })
        .map((permission) => {
          return permission?.reduce(
            (acc, { user, permissions }) => ({
              ...acc,
              [user.toLowerCase()]: permissions.map((r: string) => utils.parseBytes32String(r)),
            }),
            {} as Record<string, Array<string>>
          );
        });
    },
    enabled: Boolean(CoreProxy?.address && Multicall?.address),
  });
}

export function useAccountOwner(accountIds: string[] | undefined) {
  const { data: AccountProxy } = useAccountProxy();
  const { data: Multicall } = useMulticall3();
  const { network } = useNetwork();

  return useQuery({
    queryKey: [`${network?.id}-${network?.preset}`, 'account-owner', accountIds],
    queryFn: async function () {
      if (!AccountProxy || !accountIds || !Multicall) throw new Error('Should be disabled');
      const ownersReturnData = await Multicall.callStatic.aggregate(
        accountIds.map((accountId) => ({
          callData: AccountProxy.interface.encodeFunctionData('ownerOf', [accountId]),
          target: AccountProxy.address,
        }))
      );
      return ownersReturnData.returnData
        .map((data) => {
          return AccountProxy.interface.decodeFunctionResult('ownerOf', data);
        })
        .map((owners) => owners[0]);
    },
    enabled: Boolean(AccountProxy?.address),
  });
}

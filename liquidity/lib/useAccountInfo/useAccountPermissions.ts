import { useAccountProxy } from '@snx-v3/useAccountProxy';
import { useNetwork } from '@snx-v3/useBlockchain';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useQuery } from '@tanstack/react-query';
import { utils } from 'ethers';

export function useAccountPermissions(accountIds: string[] | undefined) {
  const { data: CoreProxy } = useCoreProxy();
  const { network } = useNetwork();

  return useQuery({
    queryKey: [`${network?.id}-${network?.preset}`, 'account-permissions', accountIds?.toString()],
    queryFn: async function () {
      if (!CoreProxy || !accountIds) throw new Error('Should be disabled');
      const permissions = await Promise.all(
        accountIds.map((accountId) => CoreProxy.getAccountPermissions(accountId))
      );

      return permissions.map((permission) =>
        permission.reduce(
          (acc, { user, permissions }) => ({
            ...acc,
            [user.toLowerCase()]: permissions.map((r: string) => utils.parseBytes32String(r)),
          }),
          {} as Record<string, Array<string>>
        )
      );
    },
    enabled: Boolean(CoreProxy?.address),
  });
}

export function useAccountOwner(accountIds: string[] | undefined) {
  const { data: AccountProxy } = useAccountProxy();
  const { network } = useNetwork();

  return useQuery({
    queryKey: [`${network?.id}-${network?.preset}`, 'account-owner', accountIds],
    queryFn: async function () {
      if (!AccountProxy || !accountIds) throw new Error('Should be disabled');
      return await Promise.all(accountIds.map((accountId) => AccountProxy.ownerOf(accountId)));
    },
    enabled: Boolean(AccountProxy?.address),
  });
}

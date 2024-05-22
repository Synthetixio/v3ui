import { useAccountProxy } from '@snx-v3/useAccountProxy';
import { useNetwork } from '@snx-v3/useBlockchain';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useQuery } from '@tanstack/react-query';
import { utils } from 'ethers';

export function useAccountPermissions(accountId: string | undefined) {
  const { data: CoreProxy } = useCoreProxy();
  const { network } = useNetwork();

  return useQuery({
    queryKey: [`${network?.id}-${network?.preset}`, 'account-permissions', accountId],
    queryFn: async function () {
      if (!CoreProxy || !accountId) throw new Error('Should be disabled');
      const permissions = await CoreProxy.getAccountPermissions(accountId);

      return permissions.reduce(
        (acc, { user, permissions }) => ({
          ...acc,
          [user.toLowerCase()]: permissions.map((r: string) => utils.parseBytes32String(r)),
        }),
        {}
      ) as {
        [key: string]: string[];
      };
    },
    enabled: Boolean(CoreProxy?.address),
  });
}

export function useAccountOwner(accountId: string | undefined) {
  const { data: AccountProxy } = useAccountProxy();
  const { network } = useNetwork();

  return useQuery({
    queryKey: [`${network?.id}-${network?.preset}`, 'account-owner', accountId],
    queryFn: async function () {
      if (!AccountProxy || !accountId) throw new Error('Should be disabled');
      return await AccountProxy.ownerOf(accountId);
    },
    enabled: Boolean(AccountProxy?.address),
  });
}

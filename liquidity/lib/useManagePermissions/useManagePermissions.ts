import { utils } from 'ethers';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useMutation } from '@tanstack/react-query';
import { useMulticall3 } from '@snx-v3/useMulticall3';

type Permissions = Array<string>;
const getPermissionDiff = (
  existing: Permissions,
  selected: Permissions
): {
  grants: Permissions;
  revokes: Permissions;
} => {
  let grants: Permissions = [],
    revokes: Permissions = [];
  existing.concat(selected).forEach((permission) => {
    if (!existing.includes(permission)) {
      grants = [...grants, permission];
    }
    if (!selected.includes(permission)) {
      revokes = [...revokes, permission];
    }
  });
  return { grants, revokes };
};

export const useManagePermissions = ({
  accountId,
  target,
  existing = [],
  selected = [],
}: {
  accountId: string;
  target: string;
  existing: Permissions;
  selected: Permissions;
}) => {
  const { data: CoreProxy } = useCoreProxy();
  const { data: multicall } = useMulticall3();

  return useMutation({
    mutationFn: async () => {
      if (!CoreProxy || !multicall) {
        return;
      }

      const { grants, revokes } = getPermissionDiff(existing, selected);

      try {
        const grantCalls = grants.map((permission) => ({
          target: CoreProxy.address,
          callData: CoreProxy.interface.encodeFunctionData('grantPermission', [
            accountId,
            utils.formatBytes32String(permission),
            target,
          ]),
          allowFailure: false,
          requireSuccess: true,
        }));

        const revokeCalls = revokes.map((permission) => ({
          target: CoreProxy.address,
          callData: CoreProxy.interface.encodeFunctionData('revokePermission', [
            accountId,
            utils.formatBytes32String(permission),
            target,
          ]),
          allowFailure: false,
          requireSuccess: true,
        }));

        const tx = await multicall.aggregate3([...grantCalls, ...revokeCalls]);
        await tx.wait();
      } catch (error: any) {
        throw error;
      }
    },
  });
};

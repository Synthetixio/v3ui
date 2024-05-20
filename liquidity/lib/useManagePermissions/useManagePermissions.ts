import { utils } from 'ethers';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { withERC7412 } from '@snx-v3/withERC7412';
import { useMutation } from '@tanstack/react-query';
import { useNetwork, useProvider, useSigner } from '@snx-v3/useBlockchain';
import { formatGasPriceForTransaction } from '@snx-v3/useGasOptions';
import { getGasPrice } from '@snx-v3/useGasPrice';
import { useGasSpeed } from '@snx-v3/useGasSpeed';

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
  const { network } = useNetwork();
  const { gasSpeed } = useGasSpeed();
  const signer = useSigner();
  const provider = useProvider();

  return useMutation({
    mutationFn: async () => {
      if (!CoreProxy || !network || !signer || !provider) {
        return;
      }

      const { grants, revokes } = getPermissionDiff(existing, selected);

      try {
        const grantCalls = grants.map((permission) =>
          CoreProxy.populateTransaction.grantPermission(
            accountId,
            utils.formatBytes32String(permission),
            target
          )
        );

        const revokeCalls = revokes.map((permission) =>
          CoreProxy.populateTransaction.revokePermission(
            accountId,
            utils.formatBytes32String(permission),
            target
          )
        );

        const [calls, gasPrices] = await Promise.all([
          Promise.all([...grantCalls, ...revokeCalls]),
          getGasPrice({ provider }),
        ]);

        const erc7412Tx = await withERC7412(
          network,
          calls,
          'manage-permissions',
          CoreProxy.interface
        );

        const gasOptionsForTransaction = formatGasPriceForTransaction({
          gasLimit: erc7412Tx.gasLimit,
          gasPrices,
          gasSpeed,
        });

        const txn = await signer.sendTransaction({ ...erc7412Tx, ...gasOptionsForTransaction });

        await txn.wait();
      } catch (error: any) {
        throw error;
      }
    },
  });
};

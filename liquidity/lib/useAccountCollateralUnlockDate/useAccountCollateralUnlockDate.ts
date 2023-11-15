import { ethers } from 'ethers';
import { useQuery } from '@tanstack/react-query';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useNetwork } from '@snx-v3/useBlockchain';
import { useTrustedMulticallForwarder } from '@snx-v3/useTrustedMulticallForwarder';

export function useAccountCollateralUnlockDate({ accountId }: { accountId?: string }) {
  const { data: CoreProxy } = useCoreProxy();
  const { data: TrustedMulticallForwarder } = useTrustedMulticallForwarder();
  const network = useNetwork();

  return useQuery({
    queryKey: [`${network.id}-${network.preset}`, 'AccountCollateralUnlockDate', { accountId }],
    enabled: Boolean(CoreProxy && accountId),
    queryFn: async function () {
      if (!CoreProxy || !accountId || !TrustedMulticallForwarder) {
        throw Error('useAccountCollateralUnlockDate should not be enabled');
      }
      const {
        returnData: [getAccountLastInteraction, getConfigUintAccountTimeoutWithdraw],
      } = await TrustedMulticallForwarder.callStatic.aggregate([
        {
          target: CoreProxy.address,
          callData: CoreProxy.interface.encodeFunctionData('getAccountLastInteraction', [
            accountId,
          ]),
        },
        {
          target: CoreProxy.address,
          callData: CoreProxy.interface.encodeFunctionData('getConfigUint', [
            ethers.utils.formatBytes32String('accountTimeoutWithdraw'),
          ]),
        },
      ]);
      const [lastInteraction] = CoreProxy.interface.decodeFunctionResult(
        'getAccountLastInteraction',
        getAccountLastInteraction
      );
      const [accountTimeoutWithdraw] = CoreProxy.interface.decodeFunctionResult(
        'getConfigUint',
        getConfigUintAccountTimeoutWithdraw
      );

      const collateralUnlock = lastInteraction.add(accountTimeoutWithdraw);

      return new Date(collateralUnlock.toNumber() * 1000);
    },
  });
}

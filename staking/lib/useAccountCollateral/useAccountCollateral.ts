import { useQuery } from '@tanstack/react-query';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useNetwork, useWallet } from '@snx-v3/useBlockchain';
import { Wei, wei } from '@synthetixio/wei';
import { useMulticall3 } from '@snx-v3/useMulticall3';
import { useCollateralTypes } from '@snx-v3/useCollateralTypes';

export type AccountCollateralType = {
  symbol: string;
  tokenAddress: string;
  availableCollateral: Wei;
  totalAssigned: Wei;
  totalDeposited: Wei;
  totalLocked: Wei;
};

export function useAccountCollateral({ accountId }: { accountId?: string }) {
  const { data: CoreProxy } = useCoreProxy();
  const { data: Multicall3 } = useMulticall3();

  const network = useNetwork();
  const wallet = useWallet();

  const collateralTypes = useCollateralTypes();

  const tokenAddresses = collateralTypes.data?.map((c) => c.tokenAddress) ?? [];

  // console.log('eoa wallet', wallet?.address);

  return useQuery({
    queryKey: [network.name, { accountId }, 'AccountCollateral', { tokens: tokenAddresses }],
    enabled: Boolean(CoreProxy && Multicall3 && accountId && tokenAddresses.length > 0),
    queryFn: async function (): Promise<AccountCollateralType[]> {
      if (!CoreProxy || !Multicall3 || !accountId || tokenAddresses.length < 1) throw 'OMFG';

      const { returnData } = await Multicall3.callStatic.aggregate(
        tokenAddresses.flatMap((tokenAddress) => [
          {
            target: CoreProxy.address,
            callData: CoreProxy.interface.encodeFunctionData('getAccountAvailableCollateral', [
              accountId,
              tokenAddress,
            ]),
          },
          {
            target: CoreProxy.address,
            callData: CoreProxy.interface.encodeFunctionData('getAccountCollateral', [
              accountId,
              tokenAddress,
            ]),
          },
        ])
      );

      return tokenAddresses.map((tokenAddress, i) => {
        const [availableCollateral] = CoreProxy.interface.decodeFunctionResult(
          'getAccountAvailableCollateral',
          returnData[i * 2]
        );
        const { totalAssigned, totalDeposited, totalLocked } =
          CoreProxy.interface.decodeFunctionResult('getAccountCollateral', returnData[i * 2 + 1]);

        return {
          symbol: collateralTypes.data?.find((c) => c.tokenAddress === tokenAddress)?.symbol ?? '',
          tokenAddress,
          availableCollateral: wei(availableCollateral),
          totalAssigned: wei(totalAssigned),
          totalDeposited: wei(totalDeposited),
          totalLocked: wei(totalLocked),
        };
      });
    },
  });
}

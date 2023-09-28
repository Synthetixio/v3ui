import { useQuery } from '@tanstack/react-query';
import { CoreProxyType, useCoreProxy } from '@snx-v3/useCoreProxy';
import { useNetwork } from '@snx-v3/useBlockchain';
import { Wei, wei } from '@synthetixio/wei';
import { useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { erc7412Call } from '@snx-v3/withERC7412';

export type AccountCollateralType = {
  symbol: string;
  tokenAddress: string;
  availableCollateral: Wei;
  totalAssigned: Wei;
  totalDeposited: Wei;
  totalLocked: Wei;
};

const fetchAccountCollateral = async (
  accountId: string,
  tokenAddresses: string[],
  CoreProxy: CoreProxyType
) => {
  const callsP = tokenAddresses.flatMap((tokenAddress) => [
    CoreProxy.populateTransaction.getAccountAvailableCollateral(accountId, tokenAddress),
    CoreProxy.populateTransaction.getAccountCollateral(accountId, tokenAddress),
  ]);
  const calls = await Promise.all(callsP);
  return erc7412Call(CoreProxy.provider, calls, (multicallEncoded) => {
    if (!Array.isArray(multicallEncoded)) throw Error('Expected array');
    return tokenAddresses.map((tokenAddress, i) => {
      const [availableCollateral] = CoreProxy.interface.decodeFunctionResult(
        'getAccountAvailableCollateral',
        multicallEncoded[i * 2]
      );
      const { totalAssigned, totalDeposited, totalLocked } =
        CoreProxy.interface.decodeFunctionResult(
          'getAccountCollateral',
          multicallEncoded[i * 2 + 1]
        );
      return {
        tokenAddress,
        availableCollateral: wei(availableCollateral),
        totalAssigned: wei(totalAssigned),
        totalDeposited: wei(totalDeposited),
        totalLocked: wei(totalLocked),
      };
    });
  });
};

export function useAccountCollateral({
  accountId,
  includeDelegationOff,
}: {
  accountId?: string;
  includeDelegationOff?: boolean;
}) {
  const { data: CoreProxy } = useCoreProxy();

  const network = useNetwork();

  const collateralTypes = useCollateralTypes(includeDelegationOff);

  const tokenAddresses = collateralTypes.data?.map((c) => c.tokenAddress) ?? [];

  return useQuery({
    queryKey: [network.name, { accountId }, 'AccountCollateral', { tokens: tokenAddresses }],
    enabled: Boolean(CoreProxy && accountId && tokenAddresses.length > 0),
    queryFn: async function (): Promise<AccountCollateralType[]> {
      if (!CoreProxy || !accountId || tokenAddresses.length < 1) throw 'OMFG';
      const data = await fetchAccountCollateral(accountId, tokenAddresses, CoreProxy);
      return data.map((x) => ({
        ...x,
        symbol: collateralTypes.data?.find((c) => c.tokenAddress === x.tokenAddress)?.symbol ?? '',
      }));
    },
  });
}

export function useAccountSpecificCollateral(accountId?: string, collateralAddress?: string) {
  const { data: CoreProxy } = useCoreProxy();

  const network = useNetwork();
  return useQuery({
    queryKey: [
      network.name,
      { accountId },
      'AccountSpecificCollateral',
      { token: collateralAddress },
    ],
    enabled: Boolean(CoreProxy && accountId && collateralAddress),
    queryFn: async function () {
      if (!CoreProxy || !accountId || !collateralAddress) throw 'OMFG';
      const data = await fetchAccountCollateral(accountId, [collateralAddress], CoreProxy);
      return data.at(0);
    },
  });
}

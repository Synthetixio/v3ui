import { useQuery } from '@tanstack/react-query';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { CoreProxyType } from '@synthetixio/v3-contracts';
import { useNetwork } from '@snx-v3/useBlockchain';
import { Wei, wei } from '@synthetixio/wei';
import { useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { erc7412Call } from '@snx-v3/withERC7412';
import { getsUSDCAddress } from '@snx-v3/isBaseAndromeda';

export type AccountCollateralType = {
  tokenAddress: string;
  availableCollateral: Wei;
  totalAssigned: Wei;
  totalDeposited: Wei;
  totalLocked: Wei;
  symbol: string;
  displaySymbol: string;
};

export const loadAccountCollateral = async ({
  accountId,
  tokenAddresses,
  CoreProxy,
}: {
  accountId: string;
  tokenAddresses: string[];
  CoreProxy: CoreProxyType;
}) => {
  const callsP = tokenAddresses.flatMap((tokenAddress) => [
    CoreProxy.populateTransaction.getAccountAvailableCollateral(accountId, tokenAddress),
    CoreProxy.populateTransaction.getAccountCollateral(accountId, tokenAddress),
  ]);
  const calls = await Promise.all(callsP);
  const decoder = (multicallEncoded: string | string[]) => {
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
  };
  return { decoder, calls };
};

export type AccountCollateralWithSymbol = AccountCollateralType & { symbol: string };

export function useAccountCollateral({
  accountId,
  includeDelegationOff,
}: {
  accountId?: string;
  includeDelegationOff?: boolean;
}) {
  const { data: CoreProxy } = useCoreProxy();
  const { network } = useNetwork();

  const collateralTypes = useCollateralTypes(includeDelegationOff);

  const tokenAddresses =
    collateralTypes.data?.map((c) => c.tokenAddress).concat(getsUSDCAddress(network?.id)) ?? [];

  return useQuery({
    queryKey: [
      `${network?.id}-${network?.preset}`,
      'AccountCollateral',
      { accountId },
      { tokens: tokenAddresses },
    ],
    enabled: Boolean(CoreProxy && accountId && tokenAddresses.length > 0),
    queryFn: async function () {
      if (!CoreProxy || !accountId || tokenAddresses.length < 1 || !network) {
        throw 'useAccountCollateral should be disabled';
      }
      const { calls, decoder } = await loadAccountCollateral({
        accountId,
        tokenAddresses,
        CoreProxy,
      });
      const data = await erc7412Call(
        network,
        CoreProxy.provider,
        calls,
        decoder,
        'useAccountCollateral'
      );

      return data.map((x) => ({
        ...x,
        symbol:
          collateralTypes.data?.find((c) => c.tokenAddress === x.tokenAddress)?.symbol ?? 'sUSD',
        displaySymbol:
          collateralTypes.data?.find((c) => c.tokenAddress === x.tokenAddress)?.displaySymbol ??
          'snxUSD',
      }));
    },
  });
}

export function useAccountSpecificCollateral(accountId?: string, collateralAddress?: string) {
  const { data: CoreProxy } = useCoreProxy();
  const { network } = useNetwork();

  return useQuery({
    queryKey: [
      `${network?.id}-${network?.preset}`,
      'AccountSpecificCollateral',
      { accountId },
      { token: collateralAddress },
    ],
    enabled: Boolean(CoreProxy && accountId && collateralAddress),
    queryFn: async function () {
      if (!CoreProxy || !accountId || !collateralAddress || !network) {
        throw 'useAccountSpecificCollateral should not be enabled';
      }
      const { calls, decoder } = await loadAccountCollateral({
        accountId,
        tokenAddresses: [collateralAddress],
        CoreProxy,
      });

      const data = await erc7412Call(
        network,
        CoreProxy.provider,
        calls,
        decoder,
        'useAccountSpecificCollateral'
      );

      return data.at(0);
    },
  });
}

import { stringToHash } from '@snx-v3/tsHelpers';
import { useDefaultProvider, useNetwork } from '@snx-v3/useBlockchain';
import { useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { erc7412Call } from '@snx-v3/withERC7412';
import { useSystemToken } from '@snx-v3/useSystemToken';
import { Wei, wei } from '@synthetixio/wei';
import { useQuery } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { useAllCollateralPriceUpdates } from '@snx-v3/useCollateralPriceUpdates';

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
  CoreProxy: ethers.Contract;
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
        symbol: '',
        displaySymbol: '',
        decimals: '',
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
  const { data: collateralTypes } = useCollateralTypes(includeDelegationOff);

  const provider = useDefaultProvider();
  const { data: priceUpdateTx } = useAllCollateralPriceUpdates();

  const { data: systemToken } = useSystemToken();

  return useQuery({
    queryKey: [
      `${network?.id}-${network?.preset}`,
      'AccountCollateral',
      { accountId },
      { systemToken: systemToken?.address },
      { priceUpdateTx: stringToHash(priceUpdateTx?.data) },
    ],
    enabled: Boolean(
      network &&
        provider &&
        CoreProxy &&
        accountId &&
        collateralTypes &&
        collateralTypes.length > 0 &&
        systemToken
    ),
    staleTime: 60000 * 5,
    queryFn: async function () {
      if (
        !(
          network &&
          provider &&
          CoreProxy &&
          accountId &&
          collateralTypes &&
          collateralTypes.length > 0 &&
          systemToken
        )
      ) {
        throw new Error('OMG');
      }

      const tokenAddresses = collateralTypes
        .map((c) => c.tokenAddress)
        .concat([systemToken.address]);

      const { calls, decoder } = await loadAccountCollateral({
        accountId,
        tokenAddresses,
        CoreProxy,
      });
      const allCalls = [...calls];
      if (priceUpdateTx) {
        allCalls.unshift(priceUpdateTx as any);
      }
      const data = await erc7412Call(network, provider, allCalls, decoder, 'useAccountCollateral');

      return data.map((x) => {
        if (`${systemToken.address}`.toLowerCase() === `${x.tokenAddress}`.toLowerCase()) {
          return Object.assign(x, {
            symbol: systemToken.symbol,
            displaySymbol: systemToken.name,
            decimals: systemToken.decimals,
          });
        }
        const collateralType = collateralTypes.find(
          (c) => `${c.tokenAddress}`.toLowerCase() === `${x.tokenAddress}`.toLowerCase()
        );
        return Object.assign(x, {
          symbol: collateralType?.symbol ?? '',
          displaySymbol: collateralType?.displaySymbol ?? '',
          decimals: collateralType?.decimals ?? '18',
        });
      });
    },
  });
}

export function useAccountSpecificCollateral(accountId?: string, collateralAddress?: string) {
  const { data: CoreProxy } = useCoreProxy();
  const { network } = useNetwork();
  const provider = useDefaultProvider();
  const { data: priceUpdateTx } = useAllCollateralPriceUpdates();

  return useQuery({
    queryKey: [
      `${network?.id}-${network?.preset}`,
      'AccountSpecificCollateral',
      { accountId },
      { token: collateralAddress, priceUpdateTx: stringToHash(priceUpdateTx?.data) },
    ],
    enabled: Boolean(CoreProxy && accountId && collateralAddress),
    queryFn: async function () {
      if (!CoreProxy || !accountId || !collateralAddress || !network || !provider) {
        throw 'useAccountSpecificCollateral should not be enabled';
      }
      const { calls, decoder } = await loadAccountCollateral({
        accountId,
        tokenAddresses: [collateralAddress],
        CoreProxy,
      });
      const allCalls = [...calls];
      if (priceUpdateTx) {
        allCalls.unshift(priceUpdateTx as any);
      }

      const data = await erc7412Call(
        network,
        provider,
        calls,
        decoder,
        'useAccountSpecificCollateral'
      );

      return data.at(0);
    },
  });
}

import { stringToHash } from '@snx-v3/tsHelpers';
import { useDefaultProvider, useNetwork } from '@snx-v3/useBlockchain';
import { useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useGetUSDTokens } from '@snx-v3/useGetUSDTokens';
import { erc7412Call } from '@snx-v3/withERC7412';
import { useTokenInfo } from '@snx-v3/useTokenInfo';
import { Wei, wei } from '@synthetixio/wei';
import { useQuery } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { useAllCollateralPriceUpdates } from '../useCollateralPriceUpdates';

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
  const { data: USDTokens } = useGetUSDTokens();

  const provider = useDefaultProvider();
  const { data: priceUpdateTx } = useAllCollateralPriceUpdates();

  const { data: stablecoinInfo } = useTokenInfo(USDTokens?.snxUSD);

  return useQuery({
    queryKey: [
      `${network?.id}-${network?.preset}`,
      'AccountCollateral',
      { accountId },
      { stablecoin: USDTokens?.snxUSD },
      { priceUpdateTx: stringToHash(priceUpdateTx?.data) },
    ],
    enabled: Boolean(
      network &&
        provider &&
        CoreProxy &&
        accountId &&
        collateralTypes &&
        collateralTypes.length > 0 &&
        stablecoinInfo
    ),
    queryFn: async function () {
      if (
        !(
          network &&
          provider &&
          CoreProxy &&
          accountId &&
          collateralTypes &&
          collateralTypes.length > 0 &&
          stablecoinInfo
        )
      ) {
        throw new Error('OMG');
      }

      const tokenAddresses = collateralTypes
        .map((c) => c.tokenAddress)
        .concat([stablecoinInfo.tokenAddress]);

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
        if (`${stablecoinInfo.tokenAddress}`.toLowerCase() === `${x.tokenAddress}`.toLowerCase()) {
          return Object.assign(x, {
            symbol: stablecoinInfo.symbol,
            displaySymbol: stablecoinInfo.name,
          });
        }
        const collateralType = collateralTypes.find(
          (c) => `${c.tokenAddress}`.toLowerCase() === `${x.tokenAddress}`.toLowerCase()
        );
        return Object.assign(x, {
          symbol: collateralType?.symbol ?? '',
          displaySymbol: collateralType?.displaySymbol ?? '',
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

import { useNetwork } from '@snx-v3/useBlockchain';
import { useMulticall3 } from '@snx-v3/useMulticall3';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ethers } from 'ethers';
import React from 'react';

export type TokenInfoType = {
  tokenAddress: string;
  symbol?: string;
  name?: string;
  decimals?: number;
};
export type TokensInfoType = { [key: string]: TokenInfoType };

export async function getTokensInfo({
  Multicall3,
  addresses,
}: {
  Multicall3: ethers.Contract;
  addresses: string[];
}): Promise<TokensInfoType> {
  const Interface = new ethers.utils.Interface([
    'function symbol() view returns (string)',
    'function name() view returns (string)',
    'function decimals() view returns (uint8)',
  ]);

  const { returnData } = await Multicall3.callStatic.aggregate(
    addresses.flatMap((target) => [
      { target, callData: Interface.encodeFunctionData('symbol') },
      { target, callData: Interface.encodeFunctionData('name') },
      { target, callData: Interface.encodeFunctionData('decimals') },
    ])
  );
  return returnData.reduce((result: TokensInfoType, value: ethers.BytesLike, i: number) => {
    const batchId = Math.floor(i / 3);
    const tokenAddress = addresses[batchId];
    if (!result[tokenAddress]) {
      result[tokenAddress] = {
        tokenAddress,
        symbol: undefined,
        name: undefined,
        decimals: undefined,
      };
    }
    if (i % 3 === 0) {
      const [symbol] = Interface.decodeFunctionResult('symbol', value);
      result[tokenAddress].symbol = symbol;
    }
    if (i % 3 === 1) {
      const [name] = Interface.decodeFunctionResult('name', value);
      result[tokenAddress].name = name;
    }
    if (i % 3 === 2) {
      const [decimals] = Interface.decodeFunctionResult('decimals', value);
      result[tokenAddress].decimals = decimals;
    }
    return result;
  }, {});
}

export const useTokenInfo = (tokenAddress?: string) => {
  const { network } = useNetwork();
  const { data: Multicall3 } = useMulticall3(network || undefined);
  return useQuery({
    enabled: Boolean(network?.id && network?.preset && Multicall3 && tokenAddress),
    queryKey: [`${network?.id}-${network?.preset}`, 'Token', { tokenAddress }],
    queryFn: async () => {
      if (!(Multicall3 && tokenAddress)) throw new Error('OMFG!');
      const tokensInfo = await getTokensInfo({ Multicall3, addresses: [tokenAddress] });
      return tokensInfo[tokenAddress];
    },
    staleTime: Infinity,
    refetchInterval: Infinity,
  });
};

export const useTokensInfo = (addresses: string[]) => {
  const { network } = useNetwork();
  const { data: Multicall3 } = useMulticall3(network || undefined);
  const queryClient = useQueryClient();
  const tokenAddresses = React.useMemo(
    () => addresses.map((address) => address.toLowerCase()).sort(),
    [addresses]
  );
  return useQuery({
    enabled: Boolean(network?.id && network?.preset && Multicall3 && tokenAddresses.length > 0),
    queryKey: [`${network?.id}-${network?.preset}`, 'Tokens', { tokenAddresses }],
    queryFn: async () => {
      if (!(Multicall3 && tokenAddresses.length > 0)) throw new Error('OMFG!');
      const unknownAddresses = tokenAddresses.filter(
        (tokenAddress) =>
          queryClient.getQueryData([
            `${network?.id}-${network?.preset}`,
            'Token',
            { tokenAddress },
          ]) === undefined
      );

      const tokensInfo = await getTokensInfo({ Multicall3, addresses: unknownAddresses });
      for (const [tokenAddress, tokenInfo] of Object.entries(tokensInfo)) {
        queryClient.setQueryData(
          [`${network?.id}-${network?.preset}`, 'Token', { tokenAddress }],
          tokenInfo
        );
      }
      return Object.fromEntries(
        tokenAddresses.map((tokenAddress) => [
          tokenAddress,
          queryClient.getQueryData([
            `${network?.id}-${network?.preset}`,
            'Token',
            { tokenAddress },
          ]),
        ])
      ) as TokensInfoType;
    },
    staleTime: Infinity,
    refetchInterval: Infinity,
  });
};

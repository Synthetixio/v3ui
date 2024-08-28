import { useQuery } from '@tanstack/react-query';
import { Network, useNetwork, useProviderForChain } from '@snx-v3/useBlockchain';
import { Contract } from 'ethers';
import { formatBytes32String } from 'ethers/lib/utils';
import { wei } from '@synthetixio/wei';

export function useSNXPrice(customNetwork?: Network | null) {
  const { network } = useNetwork();
  const targetNetwork = customNetwork || network;
  const provider = useProviderForChain(targetNetwork);

  return useQuery({
    queryKey: [`${targetNetwork?.id}-${targetNetwork?.preset}`, 'snx-price'],
    queryFn: async function () {
      let ExchangeRates: Contract;

      if (customNetwork?.id === 1) {
        const { address, abi } = await import(
          '@synthetixio/contracts/build/mainnet/deployment/ExchangeRates'
        );

        ExchangeRates = new Contract(address, abi, provider);
      } else if (customNetwork?.id === 10) {
        const { address, abi } = await import(
          '@synthetixio/contracts/build/mainnet-ovm/deployment/ExchangeRates'
        );
        ExchangeRates = new Contract(address, abi, provider);
      } else {
        throw 'not supported';
      }

      const result = await ExchangeRates.ratesForCurrencies([formatBytes32String('SNX')]);
      return wei(result[0] || 0);
    },
    enabled: Boolean(targetNetwork),
    staleTime: Infinity,
    refetchInterval: 60000,
  });
}
import { useQuery } from '@tanstack/react-query';
import { Network, useNetwork, useProviderForChain } from '@snx-v3/useBlockchain';
import { Contract } from 'ethers';
import { formatBytes32String } from 'ethers/lib/utils';

export function useSNXPrice(customNetwork?: Network | null) {
  const { network } = useNetwork();
  const targetNetwork = customNetwork || network;
  const provider = useProviderForChain(targetNetwork);

  return useQuery({
    queryKey: [`${targetNetwork?.id}-${targetNetwork?.preset}`, 'SNXPrice'],
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
      return ExchangeRates.ratesForCurrencies([formatBytes32String('SNX')]);
    },
    enabled: Boolean(targetNetwork),
    staleTime: Infinity,
    refetchInterval: 60000,
  });
}

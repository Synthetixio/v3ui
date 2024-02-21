import { useQuery } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { useNetwork, useProvider } from '@snx-v3/useBlockchain';
import { feeSuggestion } from '@snx-v3/feeSuggestion';

const getGasPriceFromProvider = async (provider: ethers.providers.JsonRpcProvider) => {
  try {
    const gasPrice = await provider.getGasPrice();
    return {
      fastest: { gasPrice },
      fast: { gasPrice },
      average: { gasPrice },
    };
  } catch (e) {
    throw new Error('Could not retrieve gas price from provider');
  }
};

export const getGasPrice = async ({ provider }: { provider: ethers.providers.JsonRpcProvider }) => {
  try {
    const block = await provider.getBlock('latest');
    if (block.baseFeePerGas) {
      return feeSuggestion(provider);
    }
    // When missing baseFeePerGas we get the Gas Price through the provider
    return getGasPriceFromProvider(provider);
  } catch (e) {
    throw new Error(`Could not fetch and compute network fee. ${e}`);
  }
};

export type GasPrices = Awaited<ReturnType<typeof getGasPrice>>;

export const useGasPrice = () => {
  const { network } = useNetwork();
  const provider = useProvider();

  return useQuery({
    enabled: Boolean(provider),
    queryKey: [`${network?.id}-${network?.preset}`, 'GasPrice'],
    queryFn: () => {
      if (!provider) throw new Error('useGasPrice should not be enabled');
      return getGasPrice({ provider });
    },
  });
};

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
    const network = await provider.getNetwork();
    // If network is Mainnet then we use EIP1559
    if (network.chainId === 1 || network.chainId === 10) {
      return feeSuggestion(provider);
    }
    // When Testnet, Optimism network or missing baseFeePerGas we get the Gas Price through the provider
    return getGasPriceFromProvider(provider);
  } catch (e) {
    throw new Error(`Could not fetch and compute network fee. ${e}`);
  }
};

export type GasPrices = Awaited<ReturnType<typeof getGasPrice>>;

export const useGasPrice = () => {
  const network = useNetwork();
  const provider = useProvider();

  return useQuery({
    queryKey: [network.name, 'GasPrice'],
    queryFn: async () => {
      return getGasPrice({ provider });
    },

    enabled: Boolean(provider),
  });
};

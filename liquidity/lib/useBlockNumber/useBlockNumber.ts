import { useProvider } from '@snx-v3/useBlockchain';
import { useQuery } from '@tanstack/react-query';

export const useBlockNumber = () => {
  const provider = useProvider();

  return useQuery({
    queryKey: ['block-number'],
    queryFn: async () => {
      return await provider?.getBlockNumber();
    },
    enabled: !!provider,
  });
};

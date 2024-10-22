import { useQuery } from '@tanstack/react-query';
import { utils } from 'ethers';
import { useNetwork } from './useWallet';

export function useGetIsNominated(address?: string) {
  const { network } = useNetwork();
  return useQuery({
    queryKey: ['isNominated', address, network?.id],
    queryFn: async () => {
      return {
        isNominated: false,
        council: '',
      };
    },
    enabled: utils.isAddress(address || '') && !!network?.id,
    staleTime: 900000,
  });
}

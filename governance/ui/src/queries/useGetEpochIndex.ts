import { useQuery } from '@tanstack/react-query';
import { CouncilSlugs } from '../utils/councils';
import { getCouncilContract } from '../utils/contracts';
import { motherShipProvider } from '../utils/providers';
import { useNetwork } from './useWallet';
import { BigNumber } from 'ethers';

export function useGetEpochIndex(council: CouncilSlugs) {
  const { network } = useNetwork();

  return useQuery({
    queryKey: ['epochId', council, network?.id],
    queryFn: async () => {
      return (await getCouncilContract(council)
        .connect(motherShipProvider(network?.id || 2192))
        .getEpochIndex()) as BigNumber;
    },
    staleTime: 900000,
  });
}

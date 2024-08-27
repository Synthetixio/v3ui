import { useQuery } from '@tanstack/react-query';
import { CouncilSlugs } from '../utils/councils';
import { getCouncilContract } from '../utils/contracts';
import { motherShipProvider } from '../utils/providers';
import { useNetwork } from './useWallet';

export function useGetElectionSettings(council: CouncilSlugs) {
  const { network } = useNetwork();
  return useQuery({
    queryKey: ['useGetElectionSettings', council],
    queryFn: async () => {
      return (await getCouncilContract(council)
        .connect(motherShipProvider(network?.id || 13001))
        .getElectionSettings()) as Promise<{
        epochSeatCount: number;
        minimumActiveMembers: number;
        epochDuration: number;
        nominationPeriodDuration: number;
        votingPeriodDuration: number;
        maxDateAdjustmentTolerance: number;
      }>;
    },
    staleTime: 900000,
  });
}

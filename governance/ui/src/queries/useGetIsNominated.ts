import { useQuery } from '@tanstack/react-query';
import { motherShipProvider } from '../utils/providers';
import councils from '../utils/councils';
import { getCouncilContract } from '../utils/contracts';
import { utils } from 'ethers';
import { useNetwork } from './useWallet';

export function useGetIsNominated(address?: string) {
  const { network } = useNetwork();
  return useQuery({
    queryKey: ['isNominated', address, network?.id],
    queryFn: async () => {
      const provider = motherShipProvider(network?.id || 13001);
      const isNominatedForSpartanCouncil = (await getCouncilContract('spartan', network?.id)
        .connect(provider)
        .isNominated(address)) as boolean | undefined;
      const isNominatedForAmbassadorCouncil = (await getCouncilContract('ambassador', network?.id)
        .connect(provider)
        .isNominated(address)) as boolean | undefined;
      const isNominatedForTreasuryCouncil = (await getCouncilContract('treasury', network?.id)
        .connect(provider)
        .isNominated(address)) as boolean | undefined;
      return {
        isNominated:
          isNominatedForSpartanCouncil ||
          isNominatedForAmbassadorCouncil ||
          isNominatedForTreasuryCouncil,
        council: isNominatedForSpartanCouncil
          ? councils[0]
          : isNominatedForAmbassadorCouncil
            ? councils[1]
            : councils[2],
      };
    },
    enabled: utils.isAddress(address || '') && !!network?.id,
    staleTime: 900000,
  });
}

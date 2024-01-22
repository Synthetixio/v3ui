import { useQuery } from '@tanstack/react-query';
import { motherShipProvider } from '../utils/providers';
import councils from '../utils/councils';
import { getCouncilContract } from '../utils/contracts';

export function useGetIsNominated(address?: string) {
  return useQuery({
    queryKey: ['isNominated', address],
    queryFn: async () => {
      const isNominatedForSpartanCouncil = (await getCouncilContract('spartan')
        .connect(motherShipProvider)
        .isNominated(address)) as boolean | undefined;

      const isNominatedForAmbassadorCouncil = (await getCouncilContract('ambassador')
        .connect(motherShipProvider)
        .isNominated(address)) as boolean | undefined;
      const isNominatedForGrantsCouncil = (await getCouncilContract('grants')
        .connect(motherShipProvider)
        .isNominated(address)) as boolean | undefined;
      const isNominatedForTreasuryCouncil = (await getCouncilContract('treasury')
        .connect(motherShipProvider)
        .isNominated(address)) as boolean | undefined;
      return {
        isNominated:
          isNominatedForSpartanCouncil ||
          isNominatedForAmbassadorCouncil ||
          isNominatedForGrantsCouncil ||
          isNominatedForTreasuryCouncil,
        council: isNominatedForSpartanCouncil
          ? councils[0]
          : isNominatedForGrantsCouncil
            ? councils[1]
            : isNominatedForAmbassadorCouncil
              ? councils[2]
              : councils[3],
      };
    },
    enabled: !!address,
    staleTime: 900000,
  });
}

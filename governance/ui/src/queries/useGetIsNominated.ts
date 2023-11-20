import { useQuery } from '@tanstack/react-query';
import { motherShipProvider } from '../utils/providers';
import { ElectionModule } from '../utils/contracts';
import councils from '../utils/councils';

export function useGetIsNominated(address?: string) {
  return useQuery({
    queryKey: ['period', address],
    queryFn: async () => {
      const isNominatedForSpartanCouncil = (await ElectionModule.connect(
        motherShipProvider
      ).isNominated(address)) as boolean | undefined;

      // TODO @dev implement other election modules once they are live
      const isNominatedForAmbassadorCouncil = (await ElectionModule.connect(
        motherShipProvider
      ).isNominated(address)) as boolean | undefined;
      const isNominatedForGrantsCouncil = (await ElectionModule.connect(
        motherShipProvider
      ).isNominated(address)) as boolean | undefined;
      const isNominatedForTreasuryCouncil = (await ElectionModule.connect(
        motherShipProvider
      ).isNominated(address)) as boolean | undefined;
      return !isNominatedForSpartanCouncil &&
        !isNominatedForAmbassadorCouncil &&
        !isNominatedForGrantsCouncil &&
        !isNominatedForTreasuryCouncil
        ? false
        : isNominatedForSpartanCouncil
          ? councils[0]
          : isNominatedForGrantsCouncil
            ? councils[1]
            : isNominatedForAmbassadorCouncil
              ? councils[2]
              : councils[3];
    },
    enabled: !!address,
    staleTime: 900000,
  });
}

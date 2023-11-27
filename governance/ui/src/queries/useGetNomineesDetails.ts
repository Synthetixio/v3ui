import { useQuery } from '@tanstack/react-query';
import { CouncilSlugs } from '../utils/councils';
import { useGetCouncilNominees } from './useGetCouncilNominees';
import { GetUserDetails, getUserDetails } from './useGetUserDetailsQuery';

export function useGetNomineesDetails(activeCouncil: CouncilSlugs) {
  const { data: councilNominees } = useGetCouncilNominees(activeCouncil);
  return useQuery({
    queryKey: ['nomineesDetails', activeCouncil],
    queryFn: async () => {
      const nomineesDetails = await Promise.all(
        councilNominees!.map(async (nominee) => await getUserDetails(nominee))
      );
      return nomineesDetails as GetUserDetails[];
    },
    enabled: !!activeCouncil && !!councilNominees?.length,
    staleTime: 900000,
  });
}

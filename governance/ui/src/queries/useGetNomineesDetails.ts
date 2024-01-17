import { useQuery } from '@tanstack/react-query';
import { CouncilSlugs } from '../utils/councils';
import { useGetCouncilNominees } from './useGetCouncilNominees';
import { GetUserDetails, getUserDetails } from './useGetUserDetailsQuery';
import { Wallet } from 'ethers';

export function useGetNomineesDetails(activeCouncil: CouncilSlugs) {
  const { data: councilNominees } = useGetCouncilNominees(activeCouncil);
  return useQuery({
    queryKey: ['nomineesDetails', activeCouncil],
    queryFn: async () => {
      const nomineesDetails = await Promise.all(
        councilNominees!.map(async (nominee) => await getUserDetails(nominee))
      );
      let counter = 0;
      while (counter < 10) {
        nomineesDetails.push({
          about: '123',
          address: Wallet.createRandom().publicKey,
          associatedAddresses: '',
          bannerImageId: '',
          bannerThumbnailUrl: '',
          bannerUrl: '',
          delegationPitch: '',
          discord: '',
          email: '',
          ens: '',
          github: '',
          notificationPreferences: '',
          pfpImageId: '',
          pfpThumbnailUrl: '',
          pfpUrl: '',
          twitter: '',
          type: '',
          username: Math.random().toString(),
          website: '',
        });
        counter++;
      }
      return nomineesDetails as GetUserDetails[];
    },
    enabled: !!activeCouncil && !!councilNominees?.length,
    staleTime: 900000,
  });
}

import { GET_PITCHES_FOR_USER_API_URL, GET_USER_DETAILS_API_URL } from '../utils/boardroom';
import { useQuery } from '@tanstack/react-query';

export type GetUserDetails = {
  address: string;
  email: string;
  ens: string;
  username: string;
  twitter: string;
  about: string;
  website: string;
  notificationPreferences: string;
  associatedAddresses: string;
  type: string;
  pfpUrl: string;
  pfpImageId: string;
  bannerThumbnailUrl: string;
  bannerImageId: string;
  pfpThumbnailUrl: string;
  bannerUrl: string;
  discord: string;
  delegationPitch: string;
  github: string;
  council?: string;
};

type UserPitch = {
  address: string;
  delegationPitch: string;
  protocol: string;
};

export default function useGetUserDetailsQuery(walletAddress?: string) {
  return useQuery<GetUserDetails | undefined>({
    queryKey: ['userDetails', walletAddress],
    queryFn: async () => {
      if (!walletAddress) return;
      return await getUserDetails(walletAddress);
    },
    enabled: !!walletAddress,
    staleTime: 900000,
  });
}

export async function getUserDetails(walletAddress: string): Promise<GetUserDetails | undefined> {
  if (!walletAddress) return;

  const randomNumber = Math.random();
  let userDetailsResponse = await fetch(GET_USER_DETAILS_API_URL(walletAddress), {
    method: 'POST',
  });
  let userProfile = await userDetailsResponse.json();
  let userPitchesResponse = await fetch(GET_PITCHES_FOR_USER_API_URL(walletAddress, randomNumber), {
    method: 'GET',
  });
  let userPitches = await userPitchesResponse.json();

  let synthetixPitch = '';
  if (userPitches.data.delegationPitches.length > 0) {
    let foundPitch = userPitches.data.delegationPitches.filter(
      (e: UserPitch) => e.protocol === 'synthetix'
    );
    if (foundPitch.length > 0) {
      synthetixPitch = foundPitch[0].delegationPitch;
    }
  }
  // TODO @dev why synthetixPitch is defined and sometimes not?????
  delete userProfile.data.delegationPitches;

  return { ...userProfile.data, delegationPitch: synthetixPitch };
}

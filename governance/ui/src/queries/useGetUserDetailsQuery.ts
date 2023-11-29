import { GET_PITCHES_FOR_USER_API_URL, GET_USER_DETAILS_API_URL } from '../utils/boardroom';
import { QueryObserverRefetchErrorResult, useQuery } from '@tanstack/react-query';

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

export default function useGetUserDetailsQuery<T extends string | string[]>(
  walletAddress?: T
): T extends string
  ? QueryObserverRefetchErrorResult<GetUserDetails, Error>
  : QueryObserverRefetchErrorResult<GetUserDetails[], Error> {
  // @ts-ignore
  return useQuery({
    queryKey: ['userDetails', walletAddress],
    queryFn: async () => {
      if (walletAddress) return await getUserDetails(walletAddress);
    },
    enabled: !!walletAddress,
    staleTime: 900000,
  });
}

export async function getUserDetails<T extends string | string[]>(
  walletAddress: T
): Promise<(T extends string ? GetUserDetails : GetUserDetails[]) | undefined> {
  if (typeof walletAddress === 'string') {
    const randomNumber = Math.random();
    let userDetailsResponse = await fetch(GET_USER_DETAILS_API_URL(walletAddress), {
      method: 'POST',
    });
    let userProfile = await userDetailsResponse.json();
    let userPitchesResponse = await fetch(
      GET_PITCHES_FOR_USER_API_URL(walletAddress, randomNumber),
      {
        method: 'GET',
      }
    );
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

    delete userProfile.data.delegationPitches;

    return { ...userProfile.data, delegationPitch: synthetixPitch };
  }
  if (Array.isArray(walletAddress)) {
    const randomNumber = Math.random();
    let userDetailsResponse = await Promise.all(
      walletAddress.map(
        async (address) =>
          await fetch(GET_USER_DETAILS_API_URL(address), {
            method: 'POST',
          })
      )
    );
    let userProfile = await Promise.all(
      userDetailsResponse.map(async (responses) => await responses.json())
    );
    let userPitchesResponse = await Promise.all(
      walletAddress.map(
        async (address) =>
          await fetch(GET_PITCHES_FOR_USER_API_URL(address, randomNumber), {
            method: 'GET',
          })
      )
    );
    let userPitches = await Promise.all(
      userPitchesResponse.map(async (responses) => await responses.json())
    );
    let foundPitch: any[];
    if (userPitches.some((pitches) => !!pitches.data.delegationPitches.length)) {
      foundPitch = userPitches.map(({ data }) => {
        return data.delegationPitches?.filter((e: UserPitch) => e.protocol === 'synthetix');
      });
    }

    return userProfile.map(({ data }) => ({
      ...data,
      delegationPitch: foundPitch?.find(
        (pitch) => pitch[0].address.toLowerCase() === data.address.toLowerCase()
      )[0]?.delegationPitch,
    })) as any;
  }
}

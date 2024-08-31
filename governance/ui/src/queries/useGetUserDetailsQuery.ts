import { GET_PITCHES_FOR_USER_API_URL, GET_USER_DETAILS_API_URL } from '../utils/boardroom';
import { useQuery } from '@tanstack/react-query';
import { motherShipProvider } from '../utils/providers';
import { profileContract } from '../utils/contracts';

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

export function useGetUserDetailsQuery<T extends string | string[]>(walletAddress?: T) {
  return useQuery({
    queryKey: ['userDetails', walletAddress],
    queryFn: async () => {
      return await getUserDetails(walletAddress!);
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
    const isMultiSig = await motherShipProvider(2192).getCode(walletAddress);
    if (isMultiSig !== '0x') {
      const profile = await profileContract
        .connect(motherShipProvider(2192))
        .getProfile(walletAddress);

      return { ...profile, address: walletAddress } as T extends string
        ? GetUserDetails
        : GetUserDetails[];
    }
    const userDetailsResponse = await fetch(GET_USER_DETAILS_API_URL(walletAddress), {
      method: 'POST',
    });

    const userProfile = await userDetailsResponse.json();
    const userPitchesResponse = await fetch(
      GET_PITCHES_FOR_USER_API_URL(walletAddress, randomNumber),
      {
        method: 'GET',
      }
    );
    const userPitches = await userPitchesResponse.json();

    let synthetixPitch = '';
    if (userPitches.data.delegationPitches.length > 0) {
      const foundPitch = userPitches.data.delegationPitches.filter(
        (e: UserPitch) => e.protocol === 'synthetix'
      );
      if (foundPitch.length > 0) {
        synthetixPitch = foundPitch[0].delegationPitch;
      }
    }
    delete userProfile.data.delegationPitches;

    return { ...userProfile.data, delegationPitch: synthetixPitch } as T extends string
      ? GetUserDetails
      : GetUserDetails[];
  }
  if (Array.isArray(walletAddress)) {
    const randomNumber = Math.random();
    const userDetailsResponse = await Promise.all(
      walletAddress.map(
        async (address) =>
          await fetch(GET_USER_DETAILS_API_URL(address), {
            method: 'POST',
          })
      )
    );

    const multiSigQueries = await Promise.all(
      walletAddress.map(async (address) => await motherShipProvider(2192).getCode(address))
    );

    const multiSigs = multiSigQueries.filter((sig) => sig !== '0x');
    const multiSigsProfiles = await Promise.all(
      multiSigs.map(async (address) => ({
        ...(await profileContract.connect(motherShipProvider(2192)).getProfile(address)),
        address,
      }))
    );
    const userProfile = await Promise.all(
      userDetailsResponse.map(async (responses) => await responses.json())
    );
    const userPitchesResponse = await Promise.all(
      walletAddress.map(
        async (address) =>
          await fetch(GET_PITCHES_FOR_USER_API_URL(address, randomNumber), {
            method: 'GET',
          })
      )
    );
    const userPitches = await Promise.all(
      userPitchesResponse.map(async (responses) => await responses.json())
    );
    let foundPitch: string[] = [];
    if (userPitches.some((pitches) => !!pitches.data.delegationPitches.length)) {
      foundPitch = userPitches.map(({ data }) => {
        return data.delegationPitches?.filter((e: UserPitch) => e.protocol === 'synthetix');
      });
    }
    return userProfile
      .map(({ data }) => {
        try {
          delete data.delegationPitches;
          return {
            ...data,
            delegationPitch: foundPitch,
          };
        } catch (error) {
          console.error(error);
          return userProfile;
        }
      })
      .concat(multiSigsProfiles) as T extends string ? GetUserDetails : GetUserDetails[];
  }
}

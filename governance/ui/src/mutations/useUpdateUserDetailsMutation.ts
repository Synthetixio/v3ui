import {
  BOARDROOM_SIGNIN_API_URL,
  NONCE_API_URL,
  UPDATE_USER_DETAILS_API_URL,
  UPDATE_USER_PITCH_FOR_PROTOCOL,
} from '../utils/boardroom';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SiweMessage } from 'siwe';
import { useSigner, useWallet } from '@snx-v3/useBlockchain';
import useIsUUIDValidQuery from '../queries/useGetIsUUIDValidQuery';
import { utils } from 'ethers';
import { GetUserDetails } from '../queries/useGetUserDetailsQuery';

type UpdateUserDetailsResponse = {
  data: GetUserDetails & {
    uuid: string;
  };
};
type SIWEMessage = {
  message: {
    domain: string;
    address: string;
    chainId: number;
    uri: string;
    version: string;
    statement: string;
    nonce: string;
    issuedAt: string;
    signature: string;
  };
};

type NonceResponse = {
  data: {
    nonce: string;
  };
};

type SignInResponse = {
  data: {
    ens: string;
    address: string;
    uuid: string;
  };
};

function useUpdateUserDetailsMutation() {
  const wallet = useWallet();
  const signer = useSigner();

  const [uuid, setUuid] = useState<null | string>(null);
  const boardroomSignIn = async () => {
    const domain = 'governance.synthetix.io';
    const chainId = 10;

    if (signer && wallet?.address) {
      try {
        const body = {
          address: wallet.address,
        };
        let response = await fetch(NONCE_API_URL, {
          method: 'POST',
          body: JSON.stringify(body),
        });
        const nonceResponse: NonceResponse = await response.json();

        const signedMessage = new SiweMessage({
          domain: domain,
          address: utils.getAddress(wallet.address),
          chainId: chainId,
          uri: `https://${domain}`,
          version: '1',
          statement: 'Sign into Boardroom with this wallet',
          nonce: nonceResponse.data.nonce,
          issuedAt: new Date().toISOString(),
        });

        const signature = await signer.signMessage(signedMessage.prepareMessage());

        const message = {
          message: { ...signedMessage, signature },
        } as SIWEMessage;

        response = await fetch(BOARDROOM_SIGNIN_API_URL, {
          method: 'POST',
          body: JSON.stringify(message),
        });

        const signInResponse: SignInResponse = await response.json();
        setUuid(signInResponse.data.uuid);
        return signInResponse.data.uuid;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    }
  };

  const isUuidValidQuery = useIsUUIDValidQuery(uuid || '');
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['updateUserDetails'],
    mutationFn: async (userProfile: GetUserDetails) => {
      let signedInUuid = '';
      if (!isUuidValidQuery.data) {
        signedInUuid = (await boardroomSignIn()) || '';
      }
      if (wallet?.address) {
        const body = {
          ...userProfile,
          uuid: signedInUuid,
        };
        const updateUserDetailsResponse = await fetch(UPDATE_USER_DETAILS_API_URL(wallet.address), {
          method: 'POST',
          body: JSON.stringify(body),
        });

        const updateUserDetailsResult =
          (await updateUserDetailsResponse.json()) as UpdateUserDetailsResponse;

        let updateDelegationPitchResult = {
          data: {},
        };

        if (userProfile.delegationPitch) {
          const delegationPitchesBody = {
            protocol: 'synthetix',
            address: wallet.address,
            delegationPitch: userProfile.delegationPitch,
            uuid: signedInUuid,
          };
          const delegationUpdateReponse = await fetch(UPDATE_USER_PITCH_FOR_PROTOCOL, {
            method: 'POST',
            body: JSON.stringify(delegationPitchesBody),
          });
          updateDelegationPitchResult = await delegationUpdateReponse.json();
        }

        return { ...updateUserDetailsResult.data, ...updateDelegationPitchResult.data };
      } else {
        return new Error();
      }
    },

    onSuccess: async () => {
      await queryClient.resetQueries();
    },
  });
}

export default useUpdateUserDetailsMutation;

import {
  BOARDROOM_SIGNIN_API_URL,
  NONCE_API_URL,
  UPDATE_USER_DETAILS_API_URL,
  UPDATE_USER_PITCH_FOR_PROTOCOL,
} from '../utils/boardroom';
import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SiweMessage } from 'siwe';
import useIsUUIDValidQuery from '../queries/useGetIsUUIDValidQuery';
import { utils } from 'ethers';
import { GetUserDetails } from '../queries/useGetUserDetailsQuery';
import { useWallet, useSigner, useProvider } from '../queries/useWallet';
import { CustomToast } from '../components/CustomToast';
import { getSSX } from '../utils/ssx';

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
  const { activeWallet } = useWallet();
  const signer = useSigner();
  const provider = useProvider();
  const toast = useToast();

  const [uuid, setUuid] = useState<null | string>(null);

  const boardroomSignIn = async () => {
    const domain = window.location.host;
    const chainId = 10;

    if (signer && activeWallet?.address) {
      try {
        const isSafe = (await signer.provider.getCode(activeWallet.address)).length > 5;

        const body = {
          address: activeWallet.address,
        };
        let response = await fetch(NONCE_API_URL, {
          method: 'POST',
          body: JSON.stringify(body),
        });
        const nonceResponse: NonceResponse = await response.json();

        const messageObject = {
          message: {
            domain,
            address: utils.getAddress(activeWallet.address),
            chainId: chainId,
            uri: `https://${domain}`,
            version: '1',
            statement: 'Sign into Boardroom with this wallet',
            nonce: nonceResponse.data.nonce,
            issuedAt: new Date().toISOString(),
          } as SIWEMessage['message'],
        };
        if (isSafe && provider) {
          const ssxMessage = await getSSX(provider);
          messageObject.message = {
            ...messageObject.message,
            signature: ssxMessage.signature,
          };
        } else {
          const signedMessage = new SiweMessage({
            domain,
            address: utils.getAddress(activeWallet.address),
            chainId: chainId,
            uri: `https://${domain}`,
            version: '1',
            statement: 'Sign into Boardroom with this wallet',
            nonce: nonceResponse.data.nonce,
            issuedAt: new Date().toISOString(),
          });
          const signature = await signer.signMessage(signedMessage.prepareMessage());

          messageObject.message = { ...messageObject.message, signature };
        }
        response = await fetch(BOARDROOM_SIGNIN_API_URL, {
          method: 'POST',
          body: JSON.stringify(messageObject),
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
      if (activeWallet?.address) {
        const body = {
          ...userProfile,
          uuid: signedInUuid,
        };
        const updateUserDetailsResponse = await fetch(
          UPDATE_USER_DETAILS_API_URL(activeWallet.address),
          {
            method: 'POST',
            body: JSON.stringify(body),
          }
        );

        const updateUserDetailsResult =
          (await updateUserDetailsResponse.json()) as UpdateUserDetailsResponse;

        let updateDelegationPitchResult = {
          data: {},
        };

        if (userProfile.delegationPitch) {
          const delegationPitchesBody = {
            protocol: 'synthetix',
            address: activeWallet.address,
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

      toast({
        description: 'Your profile has been updated.',
        status: 'success',
        render: CustomToast,
      });
    },
  });
}

export default useUpdateUserDetailsMutation;

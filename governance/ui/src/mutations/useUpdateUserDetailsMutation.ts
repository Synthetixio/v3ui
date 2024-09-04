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
import { useGetIsUUIDValidQuery } from '../queries/';
import { utils } from 'ethers';
import { GetUserDetails } from '../queries/useGetUserDetailsQuery';
import { useWallet, useSigner, useNetwork } from '../queries/useWallet';
import { isMotherchain, profileContract } from '../utils/contracts';

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
  const toast = useToast();
  const { network } = useNetwork();

  const [uuid, setUuid] = useState<null | string>(null);

  const boardroomSignIn = async () => {
    const domain = 'governance.synthetix.io';
    const chainId = 2192;

    if (signer && activeWallet?.address) {
      try {
        const body = {
          address: activeWallet.address,
        };
        let response = await fetch(NONCE_API_URL, {
          method: 'POST',
          body: JSON.stringify(body),
        });
        const nonceResponse: NonceResponse = await response.json();

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

  const isUuidValidQuery = useGetIsUUIDValidQuery(uuid || '');
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateUserDetails'],
    mutationFn: async (userProfile: GetUserDetails) => {
      const address = await signer?.getAddress();
      const isContract = await signer?.provider.getCode(address || '');
      if (isContract !== '0x' && signer && isMotherchain(network?.id)) {
        await profileContract.connect(signer).updateProfile(
          {
            username: userProfile.username,
            about: userProfile.about,
            github: userProfile.github,
            twitter: userProfile.twitter,
            discord: userProfile.discord,
            delegationPitch: userProfile.delegationPitch,
          },
          {
            maxPriorityFeePerGas: utils.parseUnits('1', 'gwei'),
            maxFeePerGas: utils.parseUnits('2', 'gwei'),
          }
        );
      } else {
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
      }
    },

    onSuccess: async () => {
      await queryClient.resetQueries();

      toast({
        description: 'Your profile has been updated.',
        status: 'success',
        isClosable: true,
      });
    },
  });
}

export default useUpdateUserDetailsMutation;

import { CloseIcon, CopyIcon } from '@chakra-ui/icons';
import { Button, Flex, IconButton, Image, Input, Spinner, Text, Textarea } from '@chakra-ui/react';
import { prettyString } from '@snx-v3/format';
import { useForm } from 'react-hook-form';
import { ipfs } from '../../utils/ipfs';
import { useNavigate } from 'react-router-dom';
import Blockies from 'react-blockies';
import useUpdateUserDetailsMutation from '../../mutations/useUpdateUserDetailsMutation';
import '../UserProfileCard/UserProfileCard.css';
import useGetUserDetailsQuery from '../../queries/useGetUserDetailsQuery';
import { useWallet } from '@snx-v3/useBlockchain';
import { useEffect } from 'react';

interface User {
  address: string;
  username: string;
  discord: string;
  twitter: string;
  about: string;
  github: string;
  pfpUrl: string;
  delegationPitch: string;
}

export function UserProfileForm({ activeCouncil }: { activeCouncil: string }) {
  const wallet = useWallet();
  const mutation = useUpdateUserDetailsMutation();
  const navigate = useNavigate();
  const { data: user, isLoading } = useGetUserDetailsQuery(wallet?.address);
  const { register, getValues, resetField, setValue } = useForm({
    defaultValues: {
      address: user?.about,
      username: user?.username,
      discord: user?.discord,
      twitter: user?.twitter,
      about: user?.about,
      github: user?.github,
      pfpUrl: user?.pfpUrl,
      delegationPitch: user?.delegationPitch,
      file: '',
    },
  });

  useEffect(() => {
    if (user) {
      setValue('username', user.username);
      setValue('discord', user.discord);
      setValue('twitter', user.twitter);
      setValue('about', user.about);
      setValue('github', user.github);
      setValue('pfpUrl', user.pfpUrl);
      setValue('delegationPitch', user.delegationPitch);
    }
  }, [user]);

  if (isLoading)
    return (
      <Flex flexDir="column" gap="4" px="6" py="4" w="100%">
        <Spinner colorScheme="cyan" />
      </Flex>
    );

  return (
    <Flex flexDir="column" gap="4" px="6" py="4" w="100%">
      <Flex w="100%" alignItems="center">
        {user?.pfpUrl ? (
          <Image src={user?.pfpUrl} w="56px" h="56px" mb="2" />
        ) : (
          <Blockies size={14} seed={user?.address!} className="fully-rounded" />
        )}
        <Flex w="100%" flexDirection="column" position="relative" ml="2" gap="2">
          <Text size="xs" color="gray.500">
            Avatar
          </Text>
          <Input
            {...register('pfpUrl', {
              pattern: {
                value: /^Qm/,
                message: 'invalid ipfs link',
              },
            })}
            placeholder="QmSHZw..."
          />
          <IconButton
            position="absolute"
            top="0px"
            right="0px"
            onClick={() => navigate('/councils' + `?active=${activeCouncil}`)}
            size="xs"
            aria-label="close button"
            icon={<CloseIcon />}
            variant="ghost"
            colorScheme="whiteAlpha"
            color="white"
          />
          <Flex alignItems="center">
            <Input
              {...register('file')}
              type="file"
              accept="image/png, image/gif, image/jpeg"
              mb="1"
            />

            <Button
              variant="ghost"
              onClick={async () => {
                let file: any = getValues('file');
                if (typeof file === 'object') {
                  file = file.item(0);
                  const result = await ipfs.add(file);
                  setValue('pfpUrl', result.path);
                  resetField('file');
                }
              }}
            >
              Upload
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <Flex flexDir="column" w="100%">
        <Text color="gray.500">Username</Text>
        <Input {...register('username')} mb="1" placeholder="John Doe" />
        <Text color="gray.500">About</Text>
        <Input {...register('about')} placeholder="OG DeFi Member" />
      </Flex>
      <div>
        <Text color="gray.500">Discord</Text>
        <Input {...register('discord')} placeholder="John Doe" />
      </div>
      <div>
        <Text color="gray.500">Twitter</Text>
        <Input {...register('twitter')} placeholder="John_Doe" />
      </div>
      <div>
        <Text color="gray.500">Github</Text>
        <Input {...register('github')} placeholder="John Doe" />
      </div>
      <Flex flexDirection="column" alignItems="flex-start">
        <Text fontSize="14px" fontWeight="400" color="gray.500">
          Wallet Address
        </Text>
        <Button
          size="xs"
          display="flex"
          variant="unstyled"
          onClick={() => {
            try {
              navigator.clipboard.writeText(user?.address!);
            } catch (error) {
              console.error(error);
            }
          }}
        >
          <Text mr="1" fontSize="md" fontWeight="700">
            {prettyString(user?.address || '')}
          </Text>
          <CopyIcon
            w="12px"
            h="12px"
            onClick={() => navigator.clipboard.writeText(user?.address!)}
          />
        </Button>
      </Flex>
      <div>
        <Text color="gray.500">Governance Pitch</Text>
        <Textarea {...register('delegationPitch')} placeholder="I will pump SNX" />
      </div>

      <Button
        colorScheme="gray"
        variant="outline"
        onClick={() => {
          mutation.mutate({
            about: getValues('about')!,
            address: user?.address!,
            email: '',
            associatedAddresses: '',
            bannerImageId: '',
            bannerUrl: '',
            delegationPitch: getValues('delegationPitch')!,
            discord: getValues('discord')!,
            ens: '',
            github: getValues('github')!,
            bannerThumbnailUrl: '',
            pfpUrl: getValues('pfpUrl')!,
            website: '',
            pfpImageId: '',
            twitter: getValues('twitter')!,
            pfpThumbnailUrl: '',
            notificationPreferences: '',
            type: '',
            username: getValues('username')!,
          });
        }}
      >
        Save Profile
      </Button>
    </Flex>
  );
}

import { CloseIcon, CopyIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  IconButton,
  Input,
  Spinner,
  Text,
  Textarea,
  Tooltip,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useUpdateUserDetailsMutation from '../../mutations/useUpdateUserDetailsMutation';
import { useGetUserDetailsQuery } from '../../queries/';
import { useEffect } from 'react';
import { useWallet } from '../../queries/useWallet';
import { ProfilePicture } from '../UserProfileCard/ProfilePicture';

export function UserProfileForm({ activeCouncil }: { activeCouncil: string }) {
  const navigate = useNavigate();
  const { activeWallet } = useWallet();

  const { data: user, isLoading } = useGetUserDetailsQuery(activeWallet?.address);
  const mutation = useUpdateUserDetailsMutation();

  const { register, getValues, setValue } = useForm({
    defaultValues: {
      address: user?.about,
      username: user?.username,
      discord: user?.discord,
      twitter: user?.twitter,
      about: user?.about,
      github: user?.github,
      pfpUrl: user?.pfpUrl,
      delegationPitch: user?.delegationPitch,
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
  }, [user, setValue]);

  if (isLoading)
    return (
      <Flex flexDir="column" gap="4" px="6" py="4" w="100%">
        <Spinner colorScheme="cyan" />
      </Flex>
    );

  return (
    <Flex flexDir="column" gap="4" px="6" py="4" w="100%" position="relative">
      <IconButton
        onClick={() => navigate(`/councils/${activeCouncil}`)}
        size="xs"
        aria-label="close button"
        icon={<CloseIcon />}
        variant="ghost"
        colorScheme="whiteAlpha"
        color="white"
        position="absolute"
        top="5px"
        right="5px"
      />
      <Flex w="100%" alignItems="center">
        <ProfilePicture imageSrc={user?.pfpUrl} address={user?.address} />
        <Flex w="100%" flexDirection="column" ml="2" gap="2">
          <Text fontSize="12px" color="gray.500">
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
        </Flex>
      </Flex>
      <Flex flexDir="column" w="100%" gap="2">
        <Text color="gray.500" fontSize="12px" lineHeight="16px">
          Username
        </Text>
        <Input {...register('username')} mb="1" placeholder="eg: DeFiLoard" />
        <Text color="gray.500" fontSize="12px" lineHeight="16px">
          About
        </Text>
        <Input {...register('about')} placeholder="eq: OG DeFi Member" />
      </Flex>
      <div>
        <Text color="gray.500" fontSize="12px" lineHeight="16px">
          Discord
        </Text>
        <Input {...register('discord')} placeholder="eg: https://discord.com/username" />
      </div>
      <div>
        <Text color="gray.500" fontSize="12px" lineHeight="16px">
          Twitter
        </Text>
        <Input {...register('twitter')} placeholder="eg: https://twitter.com/username" />
      </div>
      <div>
        <Text color="gray.500" fontSize="12px" lineHeight="16px">
          Github
        </Text>
        <Input {...register('github')} placeholder="eg: https://github.com/username" />
      </div>
      <Flex flexDirection="column" alignItems="flex-start">
        <Text fontSize="12px" fontWeight="400" color="gray.500">
          Wallet Address
        </Text>
        <Tooltip label="The wallet address cannot be edited, connect with a different wallet to change the address">
          <Button
            bg="rgba(255,255,255,0.12)"
            size="xs"
            display="flex"
            justifyContent="space-between"
            px="2"
            variant="unstyled"
            color="gray.500"
            w="100%"
            onClick={() => {
              try {
                navigator.clipboard.writeText(user!.address);
              } catch (error) {
                console.error(error);
              }
            }}
          >
            <Text mr="1" fontSize="14px" fontWeight="400">
              {user?.address}
            </Text>
            <CopyIcon
              w="12px"
              h="12px"
              onClick={() => navigator.clipboard.writeText(user!.address)}
            />
          </Button>
        </Tooltip>
      </Flex>
      <div>
        <Text color="gray.500" fontSize="12px">
          Governance Pitch
        </Text>
        <Textarea
          {...register('delegationPitch')}
          placeholder="eg: How am I going to make a difference at Synthetix"
        />
      </div>
      {mutation.isPending ? (
        <Flex w="100%" justifyContent="center">
          loading&nbsp;
          <Spinner />
        </Flex>
      ) : (
        <Button
          colorScheme="gray"
          variant="outline"
          color="white"
          onClick={() => {
            mutation
              .mutateAsync({
                about: getValues('about')!,
                address: user!.address,
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
              })
              .then(() => {
                navigate(`/councils/${activeCouncil}?view=${activeWallet?.address}`);
              });
          }}
        >
          Save Profile
        </Button>
      )}
    </Flex>
  );
}

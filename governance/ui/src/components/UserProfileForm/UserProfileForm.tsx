import { CloseIcon, CopyIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  Show,
  Spinner,
  Text,
  Textarea,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import useUpdateUserDetailsMutation from '../../mutations/useUpdateUserDetailsMutation';
import { GetUserDetails, useGetUserDetailsQuery } from '../../queries/';
import { useEffect } from 'react';
import { useWallet } from '../../queries/useWallet';
import { ProfilePicture } from '../UserProfileCard/ProfilePicture';
import UserProfileEditPreview from './UserProfileEditPreview';

export function UserProfileForm() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { activeWallet } = useWallet();
  const { data: user, isLoading } = useGetUserDetailsQuery(activeWallet?.address);
  const mutation = useUpdateUserDetailsMutation();

  const { register, getValues, setValue, watch } = useForm({
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

  const userData = watch() as GetUserDetails;

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

  const handleOnFormSave = () => {
    mutation.mutateAsync({
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
    });
  };

  if (isLoading)
    return (
      <Flex flexDir="column" gap="4" px="6" py="4" w="100%">
        <Spinner colorScheme="cyan" />
      </Flex>
    );

  return (
    <Flex gap="4" justifyContent="center">
      <Flex
        flexDir="column"
        gap="4"
        px="6"
        py="4"
        w="100%"
        bg="navy.700"
        rounded="base"
        border="1px solid"
        borderColor="gray.900"
      >
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
          <Input
            {...register('username')}
            mb="1"
            placeholder="eg: DeFiLoard"
            data-cy="username-input"
          />
          <Text color="gray.500" fontSize="12px" lineHeight="16px">
            About
          </Text>
          <Input {...register('about')} placeholder="eq: OG DeFi Member" data-cy="about-input" />
        </Flex>
        <div>
          <Text color="gray.500" fontSize="12px" lineHeight="16px">
            Discord
          </Text>
          <Input {...register('discord')} placeholder="JohnDoe" data-cy="discord-input" />
        </div>
        <div>
          <Text color="gray.500" fontSize="12px" lineHeight="16px">
            Twitter
          </Text>
          <Input {...register('twitter')} placeholder="JohnDoe" data-cy="twitter-input" />
        </div>
        <div>
          <Text color="gray.500" fontSize="12px" lineHeight="16px">
            Github
          </Text>
          <Input {...register('github')} placeholder="JohnDoe" data-cy="github-input" />
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
        <Text color="gray.500" fontSize="12px">
          Governance Pitch
        </Text>
        <Textarea
          {...register('delegationPitch')}
          placeholder="eg: How am I going to make a difference at Synthetix"
          data-cy="governance-pitch-input"
        />
        <Show below="xl">
          <Button
            isLoading={mutation.isPending}
            w="100%"
            onClick={() => {
              handleOnFormSave();
            }}
          >
            Save Changes
          </Button>
          <Button variant="outline" colorScheme="gray" color="white" onClick={() => onOpen()}>
            Preview
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent mx="4" minW="95%">
              <Flex
                flexDirection="column"
                bg="navy.700"
                minW="100%"
                borderColor="cyan.500"
                borderWidth="1px"
                borderStyle="solid"
                rounded="base"
                p="6"
                position="relative"
              >
                <IconButton
                  onClick={() => onClose()}
                  size="xs"
                  aria-label="close button"
                  icon={<CloseIcon />}
                  variant="ghost"
                  colorScheme="whiteAlpha"
                  color="white"
                  position="absolute"
                  top="10px"
                  right="10px"
                />
                <UserProfileEditPreview
                  activeWallet={activeWallet?.address}
                  isPending={mutation.isPending}
                  userData={userData}
                  onSave={() => {
                    handleOnFormSave();
                  }}
                />
              </Flex>
            </ModalContent>
          </Modal>
        </Show>
      </Flex>
      <Show above="xl">
        <Flex flexDir="column" minW="551px" gap="3">
          <Heading fontSize="20px">Preview</Heading>
          <UserProfileEditPreview
            activeWallet={activeWallet?.address}
            isPending={mutation.isPending}
            userData={userData}
            onSave={() => {
              handleOnFormSave();
            }}
          />
        </Flex>
      </Show>
    </Flex>
  );
}

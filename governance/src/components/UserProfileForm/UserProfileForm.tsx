import { CopyIcon } from '@chakra-ui/icons';
import { Button, Flex, Image, Input, Text, Textarea } from '@chakra-ui/react';
import { prettyString } from '@snx-v3/format';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ipfs } from '../../utils/ipfs';

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

export function UserProfileForm({ user }: { user: Partial<User> }) {
  const [showImageForm, setShowImageForm] = useState(false);
  const { register, getValues, resetField, setValue } = useForm({
    defaultValues: {
      address: user.about,
      username: user.username,
      discord: user.discord,
      twitter: user.twitter,
      about: user.about,
      github: user.github,
      pfpUrl: user.pfpUrl,
      delegationPitch: user.delegationPitch,
      file: '',
    },
  });

  return (
    <Flex flexDir="column" gap="4">
      <Flex w="100%">
        <Flex flexDir="column" w="56px" mr="4" justifyContent="center">
          <Image src={user.pfpUrl} w="56px" h="56px" mb="2" />
          <Button
            colorScheme="gray"
            variant="outline"
            onClick={() => setShowImageForm(!showImageForm)}
          >
            Edit
          </Button>
        </Flex>
        <Flex flexDir="column" w="100%">
          <Text color="gray.500">Username</Text>
          <Input {...register('username')} mb="1" placeholder="John Doe" />
          <Text color="gray.500">About</Text>
          <Input {...register('about')} placeholder="OG DeFi Member" />
        </Flex>
      </Flex>
      {showImageForm && (
        <Flex flexDir="column">
          <Text color="gray.500">Upload to IPFS</Text>
          <Input
            {...register('file')}
            type="file"
            accept="image/png, image/gif, image/jpeg"
            mb="1"
          />
          <Button
            variant="outline"
            onClick={async () => {
              const file = (getValues('file') as FileList).item(0);
              if (file) {
                const result = await ipfs.add(file);
                setValue('pfpUrl', result.path);
                resetField('file');
              }
            }}
          >
            Upload
          </Button>
          <Text color="gray.500">Or paste in the path</Text>
          <Input {...register('pfpUrl')} placeholder="QmSHZw..." />
        </Flex>
      )}
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
      <div>
        <Text color="gray.500">Wallet Address</Text>
        <Input disabled={true} placeholder={user.address} />
      </div>
      <Flex flexDirection="column" alignItems="flex-start" mb="6">
        {/* @TODO what gray is that? */}
        <Text fontSize="14px" fontWeight="400" color="#828295">
          Wallet Address
        </Text>
        <Button
          size="xs"
          display="flex"
          variant="unstyled"
          onClick={() => {
            try {
              navigator.clipboard.writeText(user.address!);
            } catch (error) {
              console.error(error);
            }
          }}
        >
          <Text mr="1" fontSize="12px" fontWeight="700">
            {prettyString(user.address || '')}
          </Text>
          <CopyIcon w="12px" h="12px" />
        </Button>
      </Flex>
      <div>
        <Text color="gray.500">Governance Pitch</Text>
        <Textarea placeholder="I will pump SNX" />
      </div>

      <Button colorScheme="gray" variant="outline">
        Save Profile
      </Button>
    </Flex>
  );
}

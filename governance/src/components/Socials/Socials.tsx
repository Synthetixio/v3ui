import { Flex, Image, Link } from '@chakra-ui/react';
import { FC } from 'react';

interface Props {
  discord?: string;
  twitter?: string;
  github?: string;
}

export const Socials: FC<Props> = ({ discord, github, twitter }) => {
  return (
    <Flex gap={3} alignItems="center">
      {discord && (
        <Link href={'https://discord.com/invite/' + discord} target="_blank">
          <Image src="/icons/discord.svg" />
        </Link>
      )}
      {twitter && (
        <Link href={'https://twitter.com/' + twitter} target="_blank">
          <Image src="/icons/twitter.svg" />
        </Link>
      )}
      {github && (
        <Link href={'https://github.com/' + github} target="_blank">
          <Image src="/icons/github.svg" />
        </Link>
      )}
    </Flex>
  );
};

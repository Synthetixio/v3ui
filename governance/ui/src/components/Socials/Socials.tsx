import { Flex, Image, Link } from '@chakra-ui/react';
import { FC } from 'react';
import discordSvg from './discord.svg';
import twitterSvg from './twitter.svg';
import githubSvg from './github.svg';

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
          <Image src={discordSvg} />
        </Link>
      )}
      {twitter && (
        <Link href={'https://twitter.com/' + twitter} target="_blank">
          <Image src={twitterSvg} />
        </Link>
      )}
      {github && (
        <Link href={'https://github.com/' + github} target="_blank">
          <Image src={githubSvg} />
        </Link>
      )}
    </Flex>
  );
};

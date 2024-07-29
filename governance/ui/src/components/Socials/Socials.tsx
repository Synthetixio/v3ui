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
  const nothingIsDefined = !discord && !github! && !twitter;
  if (nothingIsDefined) return null;
  return (
    <Flex gap={3} alignItems="center">
      {discord && (
        <Link
          href={'https://discord.com/user/' + discord}
          target="_blank"
          data-cy="discord-social-link"
        >
          <Image src={discordSvg} />
        </Link>
      )}
      {twitter && (
        <Link href={'https://x.com/' + twitter} target="_blank" data-cy="twitter-social-link">
          <Image src={twitterSvg} />
        </Link>
      )}
      {github && (
        <Link href={'https://github.com/' + github} target="_blank" data-cy="github-social-link">
          <Image src={githubSvg} />
        </Link>
      )}
    </Flex>
  );
};

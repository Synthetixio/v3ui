import { Flex, Link } from '@chakra-ui/react';
import { SNXFooterSVG } from '../Icons';
import { DiscordIcon, GithubIcon, WarpcastIcon, XIcon, YoutubeIcon } from '@snx-v3/icons';

export default function Footer() {
  return (
    <Flex
      as="footer"
      w="100%"
      p="6"
      justifyContent="space-between"
      borderTop="1px solid"
      borderTopColor="gray.900"
      mt="auto"
    >
      <SNXFooterSVG />
      <Flex gap="4">
        <Link target="_blank" href="https://discord.com/invite/synthetix" rel="noopener noreferrer">
          <DiscordIcon />
        </Link>
        <Link target="_blank" href="https://x.com/synthetix_io" rel="noopener noreferrer">
          <XIcon />
        </Link>
        <Link target="_blank" href="https://github.com/Synthetixio" rel="noopener noreferrer">
          <GithubIcon />
        </Link>
        <Link
          target="_blank"
          href="https://warpcast.com/~/channel/synthetix"
          rel="noopener noreferrer"
        >
          <WarpcastIcon />
        </Link>
        <Link
          target="_blank"
          href="https://www.youtube.com/@synthetix.v3"
          rel="noopener noreferrer"
        >
          <YoutubeIcon />
        </Link>
      </Flex>
    </Flex>
  );
}

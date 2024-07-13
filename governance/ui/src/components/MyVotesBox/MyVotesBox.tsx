import { Button, Fade, Flex, Heading } from '@chakra-ui/react';
import councils from '../../utils/councils';
import { useNavigate } from 'react-router-dom';
import MyVoteRow from '../MyVoteRow/MyVoteRow';
import { useCastVotes } from '../../queries';

export default function MyVotesBox({
  closeCart,
  votes,
  isMouseOnDropdown,
}: {
  closeCart: () => void;
  votes?: Record<string, string | undefined>;
  isMouseOnDropdown: (val: boolean) => void;
}) {
  const navigate = useNavigate();

  const {} = useCastVotes();

  return (
    <Fade in={true}>
      <Flex
        w="324px"
        h="310px"
        position="absolute"
        bottom="-320px"
        right="0px"
        border="1px solid"
        borderColor="gray.900"
        rounded="base"
        bg="navy.700"
        onMouseLeave={() => {
          isMouseOnDropdown(false);
          closeCart();
        }}
        pt="4"
        pb="6"
        flexDir="column"
        onMouseEnter={() => isMouseOnDropdown(true)}
      >
        <Flex justifyContent="space-between" px="6" pb="4">
          <Heading fontSize="large">My Votes</Heading>
          <Heading fontSize="large">
            {Object.values(!!votes ? votes : {}).filter((vote) => !!vote).length}/{councils.length}
          </Heading>
        </Flex>
        {councils.map((council) => (
          <MyVoteRow key={council.slug.concat('my-vote-row')} councilSlug={council.slug} />
        ))}
        <Button
          onClick={(e) => {
            e.stopPropagation();
            navigate('/my-votes');
          }}
          mx="6"
          mt="4"
        >
          Cast Votes
        </Button>
      </Flex>
    </Fade>
  );
}

import { Button, Fade, Flex, Heading } from '@chakra-ui/react';
import councils from '../../utils/councils';
import { useNavigate } from 'react-router-dom';
import MyVoteRow from '../MyVoteRow/MyVoteRow';
import { useMulticall } from '../../hooks/useMulticall';

export default function MyVotesBox({
  closeCart,
  votes,
}: {
  closeCart: () => void;
  votes?: Record<string, string | undefined>;
}) {
  const navigate = useNavigate();

  const { makeMulticall } = useMulticall();

  return (
    <Fade in={true}>
      <Flex
        w="324px"
        h="370px"
        position="absolute"
        bottom="-380px"
        right="0px"
        border="1px solid"
        borderColor="gray.900"
        rounded="base"
        bg="navy.700"
        onMouseLeave={() => closeCart()}
        pt="4"
        pb="6"
        flexDir="column"
      >
        <Flex justifyContent="space-between" px="6" pb="4">
          <Heading fontSize="large">My Votes</Heading>
          <Heading fontSize="large">
            {Object.values(!!votes ? votes : {}).filter((vote) => !!vote).length}/4
          </Heading>
        </Flex>
        {councils.map((council) => (
          <MyVoteRow key={council.slug} councilSlug={council.slug} />
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

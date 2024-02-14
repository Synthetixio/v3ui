import { Flex, IconButton } from '@chakra-ui/react';
import councils, { CouncilSlugs } from '../../utils/councils';
import { AddIcon, ChevronRightIcon, CloseIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useGetUserCurrentVotes } from '../../queries';
import { useGetUserSelectedVotes } from '../../hooks/useGetUserSelectedVotes';
import CouncilUser from '../CouncilUser/CouncilUser';
import { useVoteContext } from '../../context/VoteContext';

export default function MyVoteRow({ councilSlug }: { councilSlug: CouncilSlugs }) {
  const navigate = useNavigate();
  const selectedVotes = useGetUserSelectedVotes();

  const council = councils.find((council) => council.slug === councilSlug);
  const { data: currentVotes } = useGetUserCurrentVotes();
  const { dispatch } = useVoteContext();

  if (!council) {
    return null;
  }

  return (
    <Flex
      key={`vote-${council.slug}-cart`}
      w="100%"
      padding="2"
      alignItems="center"
      justifyContent="space-between"
      border="1px solid"
      borderColor="gray.900"
    >
      <Flex alignItems="center">
        <CouncilUser
          councilSlug={councilSlug}
          address={currentVotes[councilSlug]}
          hideName={!selectedVotes[councilSlug]}
        />
        {!selectedVotes[councilSlug] && (
          <>
            <ChevronRightIcon />
            <CouncilUser councilSlug={councilSlug} address={selectedVotes[councilSlug]} />
          </>
        )}
      </Flex>
      {currentVotes && !currentVotes[council.slug] ? (
        <IconButton
          aria-label="action-button"
          icon={<AddIcon />}
          variant="outlined"
          onClick={() => navigate(`/councils/${council.slug}`)}
        />
      ) : (
        <IconButton
          aria-label="action-button"
          icon={<CloseIcon />}
          variant="outlined"
          onClick={(e) => {
            e.stopPropagation();

            dispatch({
              type: councilSlug.toUpperCase(),
              payload: undefined,
            });

            const selection = localStorage.getItem('voteSelection');
            if (!selection) localStorage.setItem('voteSelection', '');
            const parsedSelection = JSON.parse(selection ? selection : '{}');
            delete parsedSelection[council.slug];
            localStorage.setItem('voteSelection', JSON.stringify(parsedSelection));
          }}
        />
      )}
    </Flex>
  );
}

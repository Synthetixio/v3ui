import { Flex, IconButton } from '@chakra-ui/react';
import councils, { CouncilSlugs } from '../../utils/councils';
import { AddIcon, ChevronRightIcon, CloseIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useGetUserCurrentVotes } from '../../queries/useGetUserCurrentVotes';
import { useGetUserSelectedVotes } from '../../hooks/useGetUserSelectedVotes';
import CouncilUser from './components/CouncilUser/CouncilUser';

export default function MyVoteRow({ councilSlug }: { councilSlug: CouncilSlugs }) {
  const navigate = useNavigate();
  const selectedVotes = useGetUserSelectedVotes();
  const council = councils.find((council) => council.slug === councilSlug);
  const { data: currentVotes } = useGetUserCurrentVotes();
  const queryClient = useQueryClient();

  if (!council) {
    return null;
  }

  return (
    <Flex
      key={`vote-${council.slug}-cart`}
      w="100%"
      padding="2"
      alignItems="center"
      justifyContent='space-between'
      border="1px solid"
      borderColor="gray.900"
    >
      <Flex alignItems="center">
        <CouncilUser
          councilSlug={councilSlug}
          address={currentVotes[councilSlug]}
          hideName={selectedVotes[councilSlug] !== undefined}
        />

        {selectedVotes[councilSlug] !== undefined && (
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
          onClick={() => {
            const selection = localStorage.getItem('voteSelection');
            if (!selection) localStorage.setItem('voteSelection', '');
            const parsedSelection = JSON.parse(selection ? selection : '{}');
            delete parsedSelection[council.slug];
            localStorage.setItem('voteSelection', JSON.stringify(parsedSelection));
            queryClient.refetchQueries({ queryKey: ['voting-candidates'] });
          }}
        />
      )}
    </Flex>
  );
}

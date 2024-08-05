import { Flex, IconButton } from '@chakra-ui/react';
import { CouncilSlugs } from '../../utils/councils';
import { AddIcon, ArrowForwardIcon, CloseIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useGetUserCurrentVotes } from '../../queries';
import { useGetUserSelectedVotes } from '../../hooks/useGetUserSelectedVotes';
import CouncilUser from '../CouncilUser/CouncilUser';
import { useVoteContext } from '../../context/VoteContext';

export default function MyVoteRow({
  councilSlug,
  period,
}: {
  councilSlug: CouncilSlugs;
  period?: string;
}) {
  const navigate = useNavigate();
  const selectedVotes = useGetUserSelectedVotes();
  const { data: currentVotes } = useGetUserCurrentVotes();
  const { dispatch } = useVoteContext();

  return (
    <Flex
      key={`vote-${councilSlug}-cart`}
      w="100%"
      padding="2"
      alignItems="center"
      justifyContent="space-between"
      border="1px solid"
      borderColor="gray.900"
      opacity={period !== '2' ? '0.4' : '1'}
    >
      <Flex alignItems="center">
        <CouncilUser
          councilSlug={councilSlug}
          address={currentVotes[councilSlug] || selectedVotes[councilSlug]}
        />
        {!!selectedVotes[councilSlug] &&
          !!currentVotes[councilSlug] &&
          (selectedVotes[councilSlug] !== currentVotes[councilSlug] ||
            selectedVotes[councilSlug] === 'remove') && (
            <>
              <ArrowForwardIcon mx="2" />
              <CouncilUser councilSlug={councilSlug} address={selectedVotes[councilSlug]} />
            </>
          )}
      </Flex>
      {!selectedVotes[councilSlug] && !currentVotes[councilSlug] ? (
        <IconButton
          aria-label="action-button"
          icon={<AddIcon />}
          variant="outlined"
          isDisabled={period !== '2'}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/councils/${councilSlug}`);
          }}
        />
      ) : (
        <IconButton
          aria-label="action-button"
          icon={<CloseIcon />}
          data-cy="remove-vote-button"
          variant="outlined"
          isDisabled={period !== '2'}
          onClick={(e) => {
            e.stopPropagation();

            dispatch({
              type: councilSlug.toUpperCase(),
              payload: selectedVotes[councilSlug] === 'remove' ? undefined : 'remove',
            });

            const selection = localStorage.getItem('voteSelection');
            if (!selection) localStorage.setItem('voteSelection', '');
            const parsedSelection = JSON.parse(selection ? selection : '{}');
            if (!selectedVotes[councilSlug] && !currentVotes[councilSlug]) {
              parsedSelection[councilSlug] = currentVotes[councilSlug];
            } else if (!selectedVotes[councilSlug]) {
              parsedSelection[councilSlug] = 'remove';
            } else {
              delete parsedSelection[councilSlug];
            }
            localStorage.setItem('voteSelection', JSON.stringify(parsedSelection));
          }}
        />
      )}
    </Flex>
  );
}

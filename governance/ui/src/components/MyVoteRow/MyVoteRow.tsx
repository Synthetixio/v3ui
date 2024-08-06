import { Flex, IconButton } from '@chakra-ui/react';
import { CouncilSlugs } from '../../utils/councils';
import { AddIcon, ArrowForwardIcon, CloseIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import CouncilUser from '../CouncilUser/CouncilUser';
import { useVoteContext } from '../../context/VoteContext';
import { useGetUserBallot } from '../../queries';

export default function MyVoteRow({
  councilSlug,
  period,
}: {
  councilSlug: CouncilSlugs;
  period?: string;
}) {
  const navigate = useNavigate();
  const { data: ballot } = useGetUserBallot(councilSlug);
  const { dispatch, state } = useVoteContext();

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
          address={ballot?.votedCandidates[0] || state[councilSlug]}
        />

        {ballot?.votedCandidates[0] && state[councilSlug] === 'remove' && (
          <>
            <ArrowForwardIcon mx="2" />
            <CouncilUser councilSlug={councilSlug} address={state[councilSlug]} />
          </>
        )}
      </Flex>
      {!state[councilSlug] && !ballot?.votedCandidates[0] ? (
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
              payload: state[councilSlug] === 'remove' ? undefined : 'remove',
            });
          }}
        />
      )}
    </Flex>
  );
}

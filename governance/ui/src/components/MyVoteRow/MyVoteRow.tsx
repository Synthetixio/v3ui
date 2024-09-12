import { Flex, IconButton } from '@chakra-ui/react';
import { CouncilSlugs } from '../../utils/councils';
import { AddIcon, ArrowForwardIcon, CloseIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import CouncilUser from '../CouncilUser/CouncilUser';
import { useVoteContext } from '../../context/VoteContext';
import { useGetEpochIndex, useGetUserBallot, useNetwork, useWallet } from '../../queries';
import { getVoteSelectionState } from '../../utils/localstorage';
import { Badge } from '../Badge';
import { utils } from 'ethers';

export default function MyVoteRow({
  councilSlug,
  period,
  isLast,
}: {
  councilSlug: CouncilSlugs;
  period?: string;
  isLast: boolean;
}) {
  const navigate = useNavigate();
  const { activeWallet } = useWallet();
  const { data: ballot } = useGetUserBallot(councilSlug);
  const { data: epochId } = useGetEpochIndex(councilSlug);
  const { dispatch, state } = useVoteContext();
  const { network } = useNetwork();

  const votedCandidate = ballot?.votedCandidates[0] || '';
  const voteSelection = getVoteSelectionState(
    state,
    activeWallet?.address,
    epochId?.toString(),
    network?.id.toString(),
    councilSlug
  );
  const voteAddressState = typeof voteSelection === 'string' ? voteSelection : '';

  const hasVoted =
    utils.isAddress(votedCandidate) &&
    utils.isAddress(voteAddressState) &&
    votedCandidate.toLowerCase() === voteAddressState.toLowerCase();
  const isDisabled = period !== '2';

  const handleAddVote = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/councils/${councilSlug}`);
  };

  const handleRemoveVote = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (
      utils.isAddress(votedCandidate) &&
      utils.isAddress(voteAddressState) &&
      votedCandidate.toLowerCase() !== voteAddressState.toLowerCase()
    ) {
      dispatch({
        type: councilSlug.toUpperCase(),
        payload: {
          action: votedCandidate,
          network: network?.id.toString(),
          epochId: epochId?.toString(),
          wallet: activeWallet?.address,
        },
      });
    } else {
      dispatch({
        type: councilSlug.toUpperCase(),
        payload: {
          action: votedCandidate
            ? voteAddressState === 'remove'
              ? votedCandidate
              : 'remove'
            : voteAddressState === 'remove'
              ? 'remove'
              : undefined,
          network: network?.id.toString(),
          epochId: epochId?.toString(),
          wallet: activeWallet?.address,
        },
      });
    }
  };

  return (
    <Flex
      key={`vote-${councilSlug}-cart`}
      w="100%"
      padding="2"
      alignItems="center"
      justifyContent="space-between"
      borderTop="1px solid"
      borderBottom={isLast ? '1px solid' : ''}
      borderColor="gray.900"
      opacity={isDisabled ? '0.2' : '1'}
    >
      <Flex
        ml="4"
        alignItems="center"
        mr="auto"
        overflowX="scroll"
        sx={{
          '::-webkit-scrollbar': {
            display: 'none',
          },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        }}
      >
        <CouncilUser councilSlug={councilSlug} address={votedCandidate || voteAddressState} />
        {!hasVoted && votedCandidate && voteAddressState && (
          <>
            <ArrowForwardIcon mx="2" />
            <CouncilUser councilSlug={councilSlug} address={voteAddressState} />
          </>
        )}
      </Flex>

      {hasVoted ? (
        <Badge mr="2">Your Vote</Badge>
      ) : voteAddressState ? (
        <Badge color="gray" mr="2" data-cy="selected-badge-my-row">
          Selected
        </Badge>
      ) : null}

      {!voteAddressState && !votedCandidate ? (
        <IconButton
          aria-label="action-button"
          icon={<AddIcon />}
          variant="outlined"
          mr="4"
          isDisabled={isDisabled}
          onClick={handleAddVote}
        />
      ) : (
        <IconButton
          aria-label="action-button"
          icon={<CloseIcon />}
          colorScheme="gray"
          data-cy={`remove-vote-button-${councilSlug}`}
          variant="outline"
          mr="4"
          isDisabled={isDisabled}
          onClick={handleRemoveVote}
        />
      )}
    </Flex>
  );
}

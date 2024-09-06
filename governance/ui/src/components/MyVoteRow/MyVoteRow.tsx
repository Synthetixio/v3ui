import { Flex, IconButton } from '@chakra-ui/react';
import { CouncilSlugs } from '../../utils/councils';
import { AddIcon, ArrowForwardIcon, CloseIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import CouncilUser from '../CouncilUser/CouncilUser';
import { useVoteContext } from '../../context/VoteContext';
import { useGetEpochIndex, useGetUserBallot, useNetwork, useWallet } from '../../queries';
import { getVoteSelectionState } from '../../utils/localstorage';
import { Badge } from '../Badge';

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

  const networkForState = getVoteSelectionState(
    state,
    activeWallet?.address,
    epochId?.toString(),
    network?.id.toString(),
    councilSlug
  );

  const voteAddressState = typeof networkForState === 'string' ? networkForState : '';

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
      opacity={period !== '2' ? '0.2' : '1'}
    >
      <Flex ml="4" alignItems="center" mr="auto">
        <CouncilUser
          councilSlug={councilSlug}
          address={ballot?.votedCandidates[0] ? ballot?.votedCandidates[0] : ''}
          hideName={!!(ballot?.votedCandidates[0] && voteAddressState)}
        />
        {ballot?.votedCandidates[0] &&
          voteAddressState &&
          ballot.votedCandidates[0].toLowerCase() !== voteAddressState.toLowerCase() && (
            <>
              <ArrowForwardIcon mx="2" />
              <CouncilUser councilSlug={councilSlug} address={voteAddressState} hideName />
            </>
          )}
      </Flex>
      {ballot?.votedCandidates.includes(voteAddressState) ? (
        <Badge mr="2">Your Vote</Badge>
      ) : voteAddressState ? (
        <Badge color="gray" mr="2" data-cy="selected-badge-my-row">
          Selected
        </Badge>
      ) : null}
      {!networkForState && !ballot?.votedCandidates[0] ? (
        <IconButton
          aria-label="action-button"
          icon={<AddIcon />}
          variant="outlined"
          mr="4"
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
          colorScheme="gray"
          data-cy={`remove-vote-button-${councilSlug}`}
          variant="outline"
          mr="4"
          isDisabled={period !== '2'}
          onClick={(e) => {
            e.stopPropagation();

            if (network?.id) {
              if (!!ballot?.votedCandidates[0]) {
                dispatch({
                  type: councilSlug.toUpperCase(),
                  payload: {
                    action: 'remove',
                    network: network.id.toString(),
                    epochId: epochId?.toString(),
                    wallet: activeWallet?.address,
                  },
                });
              } else {
                dispatch({
                  type: councilSlug.toUpperCase(),
                  payload: {
                    action: networkForState === 'remove' ? 'remove' : undefined,
                    network: network.id.toString(),
                    epochId: epochId?.toString(),
                    wallet: activeWallet?.address,
                  },
                });
              }
            }
          }}
        />
      )}
    </Flex>
  );
}

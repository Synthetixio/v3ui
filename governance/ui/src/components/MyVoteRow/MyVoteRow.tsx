import { Flex, IconButton } from '@chakra-ui/react';
import { CouncilSlugs } from '../../utils/councils';
import { AddIcon, ArrowForwardIcon, CloseIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import CouncilUser from '../CouncilUser/CouncilUser';
import { useVoteContext } from '../../context/VoteContext';
import { useGetCurrentPeriod, useGetUserBallot, useNetwork } from '../../queries';
import { getVoteSelectionState } from '../../utils/localstorage';

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
  const { data: ballot } = useGetUserBallot(councilSlug);
  const { data: epochId } = useGetCurrentPeriod(councilSlug);
  const { dispatch, state } = useVoteContext();
  const { network } = useNetwork();
  const networkForState = getVoteSelectionState(
    state,
    epochId,
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
      <Flex ml="4" alignItems="center">
        <CouncilUser
          councilSlug={councilSlug}
          address={ballot?.votedCandidates[0] || voteAddressState}
          hideName={!!(ballot?.votedCandidates[0] && networkForState === 'remove')}
        />
        {ballot?.votedCandidates[0] && networkForState === 'remove' && (
          <>
            <ArrowForwardIcon mx="2" />
            <CouncilUser councilSlug={councilSlug} address={networkForState} />
          </>
        )}
      </Flex>
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
                    epochId,
                  },
                });
              } else {
                dispatch({
                  type: councilSlug.toUpperCase(),
                  payload: {
                    action: networkForState === 'remove' ? 'remove' : undefined,
                    network: network.id.toString(),
                    epochId,
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

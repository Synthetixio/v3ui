import { Flex, IconButton } from '@chakra-ui/react';
import { CouncilSlugs } from '../../utils/councils';
import { AddIcon, ArrowForwardIcon, CloseIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import CouncilUser from '../CouncilUser/CouncilUser';
import { useVoteContext } from '../../context/VoteContext';
import { useGetUserBallot, useNetwork } from '../../queries';

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
  const { network } = useNetwork();
  const networkForState = network?.id.toString() || '2192';
  const { dispatch, state } = useVoteContext();
  const stateForNetwork =
    !!state && !!state[networkForState] ? state[networkForState][councilSlug] : undefined;

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
      <Flex alignItems="center">
        <CouncilUser
          councilSlug={councilSlug}
          address={ballot?.votedCandidates[0] || stateForNetwork}
          hideName={!!(ballot?.votedCandidates[0] && stateForNetwork === 'remove')}
        />
        {ballot?.votedCandidates[0] && stateForNetwork === 'remove' && (
          <>
            <ArrowForwardIcon mx="2" />
            <CouncilUser councilSlug={councilSlug} address={stateForNetwork} />
          </>
        )}
      </Flex>
      {!stateForNetwork && !ballot?.votedCandidates[0] ? (
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
          data-cy={`remove-vote-button-${councilSlug}`}
          variant="outlined"
          isDisabled={period !== '2'}
          onClick={(e) => {
            e.stopPropagation();
            if (!!ballot?.votedCandidates[0]) {
              dispatch({
                type: councilSlug.toUpperCase(),
                payload: {
                  action: 'remove',
                  network: networkForState,
                },
              });
            } else {
              dispatch({
                type: councilSlug.toUpperCase(),
                payload: {
                  action: stateForNetwork === 'remove' ? 'remove' : undefined,
                  network: networkForState,
                },
              });
            }
          }}
        />
      )}
    </Flex>
  );
}

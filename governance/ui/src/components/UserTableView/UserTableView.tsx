import { Button, Flex, Text, Td, Tr } from '@chakra-ui/react';
import { GetUserDetails } from '../../queries/useGetUserDetailsQuery';
import { Badge } from '../Badge';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetCurrentPeriod } from '../../queries/useGetCurrentPeriod';
import { CouncilSlugs } from '../../utils/councils';
import { ProfilePicture } from '../UserProfileCard/ProfilePicture';
import { prettyString } from '@snx-v3/format';
import { useGetUserBallot } from '../../queries';
import { BigNumber, utils } from 'ethers';
import { formatNumber } from '@snx-v3/formatters';
import { renderCorrectBorder } from '../../utils/table-border';
import { CrownIcon } from '../Icons';

export default function UserTableView({
  user,
  activeCouncil,
  place,
  isSelectedForVoting,
  totalVotingPower,
}: {
  isSelectedForVoting?: boolean;
  place?: number;
  user: GetUserDetails;
  activeCouncil: CouncilSlugs;
  isNomination?: boolean;
  totalVotingPower?: BigNumber;
}) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data: ballot } = useGetUserBallot(activeCouncil);
  const { data: councilPeriod } = useGetCurrentPeriod(activeCouncil);
  const isSelected = searchParams.get('view') === user.address;
  const councilIsInAdminOrVotinOrEval =
    councilPeriod === '2' || councilPeriod === '0' || councilPeriod === '3';
  const totalVotingPowerPercentage =
    totalVotingPower && user.voteResult
      ? formatNumber(user.voteResult?.votePower.mul(10000).div(totalVotingPower).toNumber() / 100)
      : 'N/A';

  return (
    <Tr
      data-cy={`user-table-row-${place}`}
      cursor="pointer"
      onClick={() => navigate(`/councils/${activeCouncil}?view=${user.address}`)}
      _hover={{ background: 'rgba(255,255,255,0.12)' }}
    >
      {councilIsInAdminOrVotinOrEval && (
        <Td
          borderTop="1px solid"
          borderLeft={renderCorrectBorder('place', 'left', councilPeriod, isSelected)}
          borderBottom={renderCorrectBorder('place', 'bottom', councilPeriod, isSelected)}
          borderColor={isSelected ? 'cyan.500' : 'gray.900'}
          borderLeftRadius={isSelected ? 'base' : ''}
        >
          <Text color="white" fontSize="sm" fontWeight={700}>
            {place === undefined ? (
              '-'
            ) : place <
              (activeCouncil === 'spartan' ? 9 : activeCouncil === 'ambassador' ? 6 : 5) ? (
              <Flex gap="1" alignItems="center">
                {place}
                <CrownIcon />
              </Flex>
            ) : (
              '-'
            )}
          </Text>
        </Td>
      )}
      <Td
        color="white"
        textTransform="unset"
        px="3"
        borderTop="1px solid"
        borderBottom={renderCorrectBorder('name', 'bottom', councilPeriod, isSelected)}
        borderLeft={renderCorrectBorder('name', 'left', councilPeriod, isSelected)}
        borderLeftRadius={isSelected && councilPeriod === '1' ? 'base' : ''}
        borderColor={isSelected ? 'cyan.500' : 'gray.900'}
      >
        <Flex gap="2" alignItems="center">
          <ProfilePicture
            address={user?.address}
            size={9}
            mr="0"
            ImageProps={{ w: '32px', h: '32px' }}
          />{' '}
          <Text
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            maxW="170px"
            data-cy={`user-table-view-${user.address}`}
            fontSize="sm"
            fontWeight={700}
          >
            {user.username ? user.username : prettyString(user.address)}
          </Text>
        </Flex>
      </Td>
      {councilIsInAdminOrVotinOrEval && (
        <Td
          borderTop="1px solid"
          borderBottom={renderCorrectBorder('votes', 'bottom', councilPeriod, isSelected)}
          borderColor={isSelected ? 'cyan.500' : 'gray.900'}
          color="white"
          fontSize="sm"
          fontWeight={700}
        >
          {user.voteResult?.votesReceived || 0}
        </Td>
      )}
      {councilIsInAdminOrVotinOrEval && (
        <Td
          borderTop="1px solid"
          borderBottom={renderCorrectBorder('power', 'bottom', councilPeriod, isSelected)}
          borderColor={isSelected ? 'cyan.500' : 'gray.900'}
          color="white"
          fontSize="sm"
          fontWeight={700}
        >
          {totalVotingPowerPercentage ? totalVotingPowerPercentage + '%' : 'N/A'}
          <Text color="gray.500" fontSize="x-small">
            {totalVotingPowerPercentage && user.voteResult
              ? activeCouncil === 'ambassador'
                ? formatNumber(utils.formatUnits(user.voteResult.votePower || '0', 'gwei'))
                : formatNumber(utils.formatEther(user.voteResult.votePower || '0'))
              : '—'}
          </Text>
        </Td>
      )}
      {councilPeriod === '2' && (
        <Td
          borderTop="1px solid"
          borderBottom={renderCorrectBorder('badge', 'bottom', councilPeriod, isSelected)}
          borderRight={renderCorrectBorder('badge', 'right', councilPeriod, isSelected)}
          borderRightRadius="base"
          borderColor={isSelected ? 'cyan.500' : 'gray.900'}
          color="white"
          fontSize="sm"
          fontWeight={700}
        >
          {ballot?.votedCandidates.includes(user.address) ? (
            <Badge w="fit-content" data-cy="your-vote-badge-table">
              Your Vote
            </Badge>
          ) : isSelectedForVoting ? (
            <Badge color="gray" w="fit-content" data-cy="selected-badge-table">
              Selected
            </Badge>
          ) : null}
        </Td>
      )}
      {councilPeriod !== '2' && councilPeriod !== '0' && (
        <Td
          textAlign="end"
          borderTop="1px solid"
          borderBottom={isSelected ? '1px solid' : ''}
          borderRight={isSelected ? '1px solid' : ''}
          borderRightRadius={isSelected ? 'base' : ''}
          borderColor={isSelected ? 'cyan.500' : 'gray.900'}
          fontSize="sm"
          fontWeight={700}
        >
          <Button
            size="xs"
            colorScheme="gray"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/councils/${activeCouncil}?view=${user.address}`);
            }}
            color="white"
            rounded="base"
            data-cy={`user-table-view-button-${user.address}`}
          >
            View
          </Button>
        </Td>
      )}
    </Tr>
  );
}

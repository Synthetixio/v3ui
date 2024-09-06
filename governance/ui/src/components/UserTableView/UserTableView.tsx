import { Button, Flex, Icon, Text, Td, Tr } from '@chakra-ui/react';
import { GetUserDetails } from '../../queries/useGetUserDetailsQuery';
import { Badge } from '../Badge';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetCurrentPeriod } from '../../queries/useGetCurrentPeriod';
import { CouncilSlugs } from '../../utils/councils';
import { ProfilePicture } from '../UserProfileCard/ProfilePicture';
import { prettyString } from '@snx-v3/format';
import { useGetEpochIndex, useGetUserBallot, useNetwork } from '../../queries';
import { getVoteSelectionState } from '../../utils/localstorage';
import { useVoteContext } from '../../context/VoteContext';
import { BigNumber } from 'ethers';
import { renderCorrectBorder } from '../../utils/table-border';

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
  const { network } = useNetwork();
  const { data: epochId } = useGetEpochIndex(activeCouncil);
  const { state } = useVoteContext();
  const councilIsInAdminOrVoting = councilPeriod === '2' || councilPeriod === '0';
  const networkForState = getVoteSelectionState(
    state,
    epochId,
    network?.id.toString(),
    activeCouncil
  );
  const voteAddressState = typeof networkForState === 'string' ? networkForState : '';
  const totalVotingPowerPercentage = totalVotingPower
    ? user.voteResult?.votePower.mul(100).div(totalVotingPower).toNumber().toFixed(2)
    : 'N/A';

  return (
    <Tr
      data-cy={`user-table-row-${place}`}
      cursor="pointer"
      onClick={() => navigate(`/councils/${activeCouncil}?view=${user.address}`)}
      _hover={{ background: 'rgba(255,255,255,0.12)' }}
    >
      {councilIsInAdminOrVoting && (
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
              (activeCouncil === 'spartan' ? 8 : activeCouncil === 'ambassador' ? 5 : 4) ? (
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
      {councilIsInAdminOrVoting && (
        <Td
          borderTop="1px solid"
          borderBottom={renderCorrectBorder('votes', 'bottom', councilPeriod, isSelected)}
          borderColor={isSelected ? 'cyan.500' : 'gray.900'}
          color="white"
          fontSize="sm"
          fontWeight={700}
        >
          {user.voteResult?.votesReceived}
        </Td>
      )}
      {councilIsInAdminOrVoting && (
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
            {totalVotingPowerPercentage ? user.voteResult?.votePower.toString() : '—'}
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
          {ballot?.votedCandidates.includes(voteAddressState) ? (
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

const CrownIcon = () => (
  <Icon width="20px" height="20px" viewBox="0 0 20 20" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.99494 5.06177L11.7901 8.25218L11.7932 8.25742C11.8613 8.37306 11.952 8.47394 12.06 8.55392C12.168 8.63391 12.2911 8.69133 12.422 8.72262C12.5528 8.75392 12.6887 8.75842 12.8214 8.73584C12.954 8.71327 13.0807 8.6641 13.1938 8.59139L13.2005 8.58708L15.7626 6.84578L15.075 12.2182H4.90652L4.22002 6.85415L6.79371 8.58436L6.80228 8.59002C6.91521 8.66327 7.04193 8.71278 7.17476 8.73541C7.30759 8.75804 7.44363 8.7533 7.57456 8.72149C7.70548 8.68968 7.82843 8.63149 7.93597 8.55061C8.04351 8.46973 8.13336 8.36786 8.20019 8.25133L9.99494 5.06177ZM3.64638 12.2186L2.90365 6.4152C2.88283 6.23071 2.91459 6.04397 2.9953 5.87661C3.07602 5.70923 3.20256 5.56789 3.36057 5.46931C3.51861 5.37071 3.70152 5.31903 3.88801 5.32053C4.0745 5.32203 4.25654 5.37666 4.41297 5.47778L4.42241 5.48388L7.2525 7.38658L9.1385 4.0348C9.22548 3.88514 9.35024 3.76068 9.50051 3.67403C9.65079 3.58736 9.82127 3.54166 9.99494 3.54166C10.1686 3.54166 10.3391 3.58736 10.4894 3.67403C10.6396 3.76068 10.7643 3.88517 10.8513 4.03483L10.8557 4.04237L12.739 7.38939L15.5464 5.48138C15.7026 5.37798 15.8851 5.321 16.0727 5.31724C16.2603 5.31347 16.4449 5.36312 16.6053 5.4602C16.7655 5.55726 16.8948 5.69766 16.9785 5.86486C17.0621 6.03204 17.0969 6.21939 17.0789 6.40531L17.0779 6.41489L16.3316 12.2466C16.3786 12.2583 16.4248 12.2735 16.4697 12.2922C16.5871 12.341 16.6936 12.4125 16.7832 12.5025C16.8727 12.5925 16.9436 12.6991 16.992 12.8163C17.0403 12.9335 17.0651 13.059 17.0651 13.1856V15.4909C17.0651 15.6176 17.0403 15.7431 16.992 15.8602C16.9436 15.9774 16.8727 16.0841 16.7832 16.174C16.6936 16.264 16.5871 16.3355 16.4697 16.3843C16.3523 16.4332 16.2264 16.4583 16.0992 16.4583H3.67447C3.41741 16.4583 3.17142 16.3557 2.99047 16.174C2.80962 15.9924 2.7085 15.7466 2.7085 15.4909V13.1856C2.7085 12.9299 2.80962 12.6841 2.99047 12.5025C3.16481 12.3274 3.39954 12.2258 3.64638 12.2186ZM15.8151 13.4682H3.9585V15.2083H15.8151V13.4682Z"
      fill="white"
    />
  </Icon>
);

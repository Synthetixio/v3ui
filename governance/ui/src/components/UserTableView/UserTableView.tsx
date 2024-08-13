import { Button, Flex, Icon, Text, Th, Tr } from '@chakra-ui/react';
import { GetUserDetails } from '../../queries/useGetUserDetailsQuery';
import { Badge } from '../Badge';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetCurrentPeriod } from '../../queries/useGetCurrentPeriod';
import { CouncilSlugs } from '../../utils/councils';
import { ProfilePicture } from '../UserProfileCard/ProfilePicture';
import { prettyString } from '@snx-v3/format';

export default function UserTableView({
  user,
  activeCouncil,
  isNomination,
  place,
}: {
  place: number;
  user: GetUserDetails;
  activeCouncil: CouncilSlugs;
  isNomination?: boolean;
}) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data: councilPeriod } = useGetCurrentPeriod(activeCouncil);

  const isSelected = searchParams.get('view') === user.address;
  const councilIsInAdminOrVoting = councilPeriod === '2' || councilPeriod === '0';

  return (
    <Tr
      data-cy={`user-table-row-${place}`}
      cursor="pointer"
      onClick={() => navigate(`/councils/${activeCouncil}?view=${user.address}`)}
      _hover={{ background: 'rgba(255,255,255,0.12)' }}
    >
      {councilIsInAdminOrVoting && (
        <Th
          borderTop="1px solid"
          borderLeft={isSelected ? '1px solid' : ''}
          borderBottom={isSelected ? '1px solid' : ''}
          borderColor={isSelected ? 'cyan.500' : 'gray.900'}
        >
          <Text color="white">
            {place < 10 ? (
              <Flex gap="1">
                {place + 1}
                <CrownIcon />
              </Flex>
            ) : (
              '-'
            )}
          </Text>
        </Th>
      )}
      <Th
        color="white"
        textTransform="unset"
        px="3"
        borderTop={councilIsInAdminOrVoting ? '' : '1px solid'}
        borderBottom={!councilIsInAdminOrVoting && !isSelected ? '' : '1px solid'}
        borderLeft={councilIsInAdminOrVoting ? '' : '1px solid'}
        borderColor={isSelected ? 'cyan.500' : 'gray.900'}
      >
        <Flex gap="2" alignItems="center">
          <ProfilePicture
            imageSrc={user?.pfpUrl}
            address={user?.address}
            size={8}
            mr="0"
            ImageProps={{ w: '32px', h: '32px' }}
          />{' '}
          <Text
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            maxW="170px"
            data-cy={`user-table-view-${user.address}`}
          >
            {user.username ? user.username : prettyString(user.address)}
          </Text>
        </Flex>
      </Th>
      {councilIsInAdminOrVoting && (
        <Th
          borderTop="1px solid"
          borderBottom={isSelected ? '1px solid' : ''}
          borderColor={isSelected ? 'cyan.500' : 'gray.900'}
          color="white"
        >
          TODO
        </Th>
      )}
      {councilIsInAdminOrVoting && (
        <Th
          borderTop="1px solid"
          borderBottom={isSelected ? '1px solid' : ''}
          borderRight={isSelected ? '1px solid' : ''}
          borderColor={isSelected ? 'cyan.500' : 'gray.900'}
          color="white"
        >
          TODO
        </Th>
      )}
      {councilPeriod !== '2' && councilPeriod !== '0' && (
        <Th
          textAlign="end"
          borderTop="1px solid"
          borderBottom="1px solid"
          borderRight={isSelected ? '1px solid' : ''}
          borderColor={isSelected ? 'cyan.500' : 'gray.900'}
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
            {isNomination && 'View'}
          </Button>
        </Th>
      )}
      {councilPeriod === '0' && (
        <Th
          textAlign="end"
          borderTop="1px solid"
          borderBottom={isSelected ? '1px solid' : ''}
          borderRight={isSelected ? '1px solid' : ''}
          borderColor={isSelected ? 'cyan.500' : 'gray.900'}
        >
          <Badge w="fit-content">Your Vote TODO</Badge>
        </Th>
      )}
    </Tr>
  );
}

const CrownIcon = () => (
  <Icon width="14px" height="14px" viewBox="0 0 14 14" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.99626 3.54455L8.2529 5.77783L8.25506 5.7815C8.3027 5.86245 8.36618 5.93307 8.44179 5.98906C8.5174 6.04505 8.60357 6.08524 8.69518 6.10715C8.78679 6.12905 8.88189 6.1322 8.97477 6.1164C9.06764 6.10059 9.15629 6.06618 9.23545 6.01528L9.24015 6.01226L11.0336 4.79335L10.5523 8.55405H3.43437L2.95382 4.79922L4.7554 6.01036L4.7614 6.01432C4.84045 6.0656 4.92916 6.10025 5.02214 6.1161C5.11512 6.13194 5.21035 6.12862 5.30199 6.10635C5.39364 6.08408 5.47971 6.04335 5.55498 5.98673C5.63026 5.93012 5.69315 5.85881 5.73994 5.77724L6.99626 3.54455ZM2.55227 8.55433L2.03236 4.49195C2.01778 4.36281 2.04002 4.23209 2.09652 4.11494C2.15302 3.99777 2.2416 3.89883 2.35221 3.82983C2.46283 3.76081 2.59087 3.72463 2.72141 3.72568C2.85196 3.72673 2.97938 3.76497 3.08888 3.83575L3.09549 3.84003L5.07655 5.17191L6.39675 2.82567C6.45764 2.72091 6.54497 2.63379 6.65016 2.57313C6.75536 2.51246 6.8747 2.48047 6.99626 2.48047C7.11782 2.48047 7.23716 2.51246 7.34236 2.57313C7.44755 2.63379 7.53484 2.72093 7.59573 2.82569L7.5988 2.83097L8.91707 5.17388L10.8823 3.83827C10.9916 3.7659 11.1194 3.72601 11.2507 3.72338C11.382 3.72074 11.5113 3.7555 11.6235 3.82345C11.7357 3.89139 11.8262 3.98967 11.8847 4.10671C11.9433 4.22374 11.9676 4.35488 11.955 4.48502L11.9544 4.49173L11.4319 8.57394C11.4648 8.58211 11.4972 8.59277 11.5286 8.60585C11.6108 8.64003 11.6853 8.69009 11.748 8.75306C11.8107 8.81603 11.8604 8.89068 11.8942 8.97271C11.928 9.05474 11.9454 9.14259 11.9454 9.23126V10.8449C11.9454 10.9336 11.928 11.0214 11.8942 11.1035C11.8604 11.1855 11.8107 11.2602 11.748 11.3231C11.6853 11.3861 11.6108 11.4361 11.5286 11.4703C11.4464 11.5045 11.3583 11.5221 11.2692 11.5221H2.57193C2.39199 11.5221 2.2198 11.4503 2.09314 11.3231C1.96654 11.196 1.89575 11.0239 1.89575 10.8449V9.23126C1.89575 9.05226 1.96654 8.88021 2.09314 8.75306C2.21517 8.6305 2.37948 8.55936 2.55227 8.55433ZM11.0704 9.42905H2.77075V10.6471H11.0704V9.42905Z"
      fill="white"
    />
  </Icon>
);

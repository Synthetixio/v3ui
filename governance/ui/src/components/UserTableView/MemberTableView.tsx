import { Button, Flex, Text, Td, Tr, Image, ImageProps } from '@chakra-ui/react';
import { GetUserDetails } from '../../queries/useGetUserDetailsQuery';
import { Badge } from '../Badge';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetCurrentPeriod } from '../../queries/useGetCurrentPeriod';
import { CouncilSlugs } from '../../utils/councils';
import { ProfilePicture } from '../UserProfileCard/ProfilePicture';
import { prettyString } from '@snx-v3/format';
import { useGetEpochIndex, useGetUserBallot } from '../../queries';
import { BigNumber, utils } from 'ethers';
import { formatNumber } from '@snx-v3/formatters';
import { renderCorrectBorder } from '../../utils/table-border';
import { CrownIcon } from '../Icons';
import { Members } from '../../Test';

export default function MemberTableView({
  name,
  activeCouncil,
  place,
  address,
  image, //   totalVotingPower,
} //   isSelectedForVoting,
: {
  //   isSelectedForVoting?: boolean;
  place?: string;
  name: string;
  activeCouncil: CouncilSlugs;
  address: string;
  image: string;
  //   isNomination?: boolean;
  //   totalVotingPower?: BigNumber;
}) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // const { data: epochIndex } = useGetEpochIndex(activeCouncil);
  // const { data: ballot } = useGetUserBallot(activeCouncil, (epochIndex?.toNumber() || 1) - 1);
  // const { data: councilPeriod } = useGetCurrentPeriod(activeCouncil);
  const isSelected = searchParams.get('view') === address;

  return (
    <Tr
      //   data-cy={`user-table-row-${place}`}
      cursor="pointer"
      onClick={() => navigate(`/councils/${activeCouncil}?view=${address}`)}
      _hover={{ background: 'rgba(255,255,255,0.12)' }}
    >
      <Td
        borderTop="1px solid"
        borderLeft={renderCorrectBorder('place', 'left', isSelected)}
        borderBottom={renderCorrectBorder('place', 'bottom', isSelected)}
        borderColor={isSelected ? 'cyan.500' : 'gray.900'}
        borderLeftRadius={isSelected ? 'base' : ''}
      >
        <Text color="white" fontSize="sm" fontWeight={700}>
          {/* {place === undefined ? (
            '-'
          ) : place < (activeCouncil === 'spartan' ? 9 : activeCouncil === 'ambassador' ? 6 : 5) ? (
            <Flex gap="1" alignItems="center">
              {place}
              <CrownIcon />
            </Flex>
          ) : (
            '-'
          )} */}
          {place}
        </Text>
      </Td>
      <Td
        color="white"
        textTransform="unset"
        px="3"
        borderTop="1px solid"
        borderBottom={renderCorrectBorder('name', 'bottom', isSelected)}
        borderColor={isSelected ? 'cyan.500' : 'gray.900'}
      >
        <Flex gap="2" alignItems="center">
          {image ? (
            <Image src={image} w="9" h="9" />
          ) : (
            <ProfilePicture
              address={address}
              size={9}
              mr="0"
              ImageProps={{ w: '32px', h: '32px' }}
            />
          )}

          <Text
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            maxW="200px"
            data-cy={`user-table-view-${address}`}
            fontSize="sm"
            fontWeight={700}
          >
            {name ? name : prettyString(address)}
          </Text>
        </Flex>
      </Td>
      <Td
        borderTop="1px solid"
        borderBottom={renderCorrectBorder('votes', 'bottom', isSelected)}
        borderColor={isSelected ? 'cyan.500' : 'gray.900'}
        color="white"
        fontSize="sm"
        fontWeight={700}
      >
        <Text>N/A</Text>
      </Td>
      <Td
        borderTop="1px solid"
        borderBottom={renderCorrectBorder('power', 'bottom', isSelected)}
        borderColor={isSelected ? 'cyan.500' : 'gray.900'}
        color="white"
        fontSize="sm"
        fontWeight={700}
      >
        <Text>N/A</Text>
      </Td>
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
            navigate(`/councils/${activeCouncil}?view=${address}`);
          }}
          color="white"
          rounded="base"
          data-cy={`user-table-view-button-${address}`}
        >
          View
        </Button>
      </Td>
    </Tr>
  );
}
